import express from 'express';
import Patient from '../models/Patient.js';

const router = express.Router();

// Advanced search for patients with multiple filters
router.get('/patients', async (req, res) => {
  try {
    const { 
      name, 
      phone, 
      email, 
      dateFrom, 
      dateTo, 
      bloodGroup, 
      gender,
      page = 1, 
      limit = 50 
    } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (phone) {
      filter.phone = { $regex: phone, $options: 'i' };
    }

    if (email) {
      filter.email = { $regex: email, $options: 'i' };
    }

    if (bloodGroup) {
      filter.blood_group = bloodGroup;
    }

    if (gender) {
      filter.gender = gender;
    }

    if (dateFrom || dateTo) {
      filter.created_at = {};
      if (dateFrom) filter.created_at.$gte = new Date(dateFrom);
      if (dateTo) filter.created_at.$lte = new Date(dateTo);
    }

    const patients = await Patient.find(filter)
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Patient.countDocuments(filter);

    res.json({
      patients,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total,
      filters: req.query
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Full text search for patients (requires MongoDB text index)
router.get('/patients/text', async (req, res) => {
  try {
    const { q, page = 1, limit = 50 } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query (q) is required' });
    }

    const patients = await Patient.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Patient.countDocuments({ $text: { $search: q } });

    res.json({
      patients,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total,
      query: q
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
