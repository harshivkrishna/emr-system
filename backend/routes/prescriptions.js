import express from 'express';
import Prescription from '../models/Prescription.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// Get all prescriptions
router.get('/', async (req, res) => {
  try {
    const { patient_id, page = 1, limit = 50 } = req.query;

    const filter = patient_id ? { patient_id } : {};

    const prescriptions = await Prescription.find(filter)
      .populate('patient_id', 'name phone')
      .sort({ created_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Prescription.countDocuments(filter);

    res.json({
      prescriptions,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ⚠️ Future static routes (e.g., /recent, /byStatus) can be added HERE

// Get prescription by ID
router.get('/:patient_id', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patient_id: req.params.patient_id })
      .populate('patient_id', 'name phone age gender');

    res.json(prescriptions); // could return an array of prescriptions
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Create new prescription
router.post('/', async (req, res) => {
  try {
    const patient = await Patient.findById(req.body.patient_id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const prescription = new Prescription(req.body);
    await prescription.save();

    const populatedPrescription = await Prescription.findById(prescription._id)
      .populate('patient_id', 'name phone age gender');

    res.status(201).json(populatedPrescription);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update prescription
router.put('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('patient_id', 'name phone age gender');

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete prescription
router.delete('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    res.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
