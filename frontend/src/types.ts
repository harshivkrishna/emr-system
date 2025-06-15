export interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email?: string;
  address: string;
  medical_history: string;
  emergency_contact?: string;
  blood_group?: string;
  allergies?: string;
  created_at: string;
  updated_at: string;
}

export interface Prescription {
  _id: string;
  patient_id: string;
  doctor_name: string;
  symptoms: string;
  diagnosis: string;
  medications: Medication[];
  advice: string;
  follow_up_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface FollowUp {
  _id: string;
  patient_id: string;
  patient_name: string;
  reason: string;
  scheduled_date: string;
  status: 'pending' | 'completed' | 'rescheduled';
  notes?: string;
  created_at: string;
}

export interface SearchFilters {
  name?: string;
  phone?: string;
  email?: string;
  dateFrom?: string;
  dateTo?: string;
  bloodGroup?: string;
  gender?: string;
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  totalPages?: number;
  currentPage?: number;
}