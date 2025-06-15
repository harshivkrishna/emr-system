import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

import connectToDatabase from './db.js';

import patientRoutes from './routes/patients.js';
import prescriptionRoutes from './routes/prescriptions.js';
import followUpRoutes from './routes/followups.js';
import searchRoutes from './routes/search.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (with caching for serverless)
await connectToDatabase();

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
