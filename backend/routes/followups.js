import express from 'express';
import FollowUp from '../models/FollowUp.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// Get all follow-ups
router.get('/', async (req, res) => {
  try {
    const { status, patient_id, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (patient_id) filter.patient_id = patient_id;

    const followUps = await FollowUp.find(filter)
      .populate('patient_id', 'name phone')
      .sort({ scheduled_date: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await FollowUp.countDocuments(filter);

    res.json({
      followUps,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get overdue follow-ups (placed BEFORE '/:id')
router.get('/status/overdue', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdueFollowUps = await FollowUp.find({
      status: 'pending',
      scheduled_date: { $lt: today },
    }).populate('patient_id', 'name phone');

    res.json(overdueFollowUps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get follow-up by ID (placed AFTER specific routes)
router.get('/:id', async (req, res) => {
  try {
    const followUp = await FollowUp.findById(req.params.id).populate(
      'patient_id',
      'name phone age gender'
    );

    if (!followUp) {
      return res.status(404).json({ error: 'Follow-up not found' });
    }
    res.json(followUp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new follow-up
router.post('/', async (req, res) => {
  try {
    const patient = await Patient.findById(req.body.patient_id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const followUpData = {
      ...req.body,
      patient_name: patient.name,
    };

    const followUp = new FollowUp(followUpData);
    await followUp.save();

    const populatedFollowUp = await FollowUp.findById(followUp._id).populate(
      'patient_id',
      'name phone age gender'
    );

    res.status(201).json(populatedFollowUp);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update follow-up
router.put('/:id', async (req, res) => {
  try {
    const followUp = await FollowUp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('patient_id', 'name phone age gender');

    if (!followUp) {
      return res.status(404).json({ error: 'Follow-up not found' });
    }
    res.json(followUp);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete follow-up
router.delete('/:id', async (req, res) => {
  try {
    const followUp = await FollowUp.findByIdAndDelete(req.params.id);
    if (!followUp) {
      return res.status(404).json({ error: 'Follow-up not found' });
    }
    res.json({ message: 'Follow-up deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
