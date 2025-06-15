import mongoose from 'mongoose';

const followUpSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  patient_name: {
    type: String,
    required: true,
    trim: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  scheduled_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'rescheduled'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Index for efficient querying
followUpSchema.index({ patient_id: 1, scheduled_date: 1 });
followUpSchema.index({ status: 1, scheduled_date: 1 });

export default mongoose.model('FollowUp', followUpSchema);