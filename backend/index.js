import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

import patientRoutes from './routes/patients.js';
import prescriptionRoutes from './routes/prescriptions.js';
import followUpRoutes from './routes/followups.js';
import searchRoutes from './routes/search.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'your-default-uri-here';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/followups', followUpRoutes);
app.use('/api/search', searchRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'MedCare EMR API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 Route
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default serverless(app);
