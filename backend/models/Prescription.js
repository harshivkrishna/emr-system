import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  dosage: {
    type: String,
    required: true,
    trim: true
  },
  frequency: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  instructions: {
    type: String,
    trim: true
  }
});

const prescriptionSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor_name: {
    type: String,
    required: true,
    trim: true
  },
  symptoms: {
    type: String,
    required: true,
    trim: true
  },
  diagnosis: {
    type: String,
    required: true,
    trim: true
  },
  medications: [medicationSchema],
  advice: {
    type: String,
    trim: true
  },
  follow_up_date: {
    type: Date
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('Prescription', prescriptionSchema);