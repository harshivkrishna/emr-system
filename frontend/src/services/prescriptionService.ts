import api from './api';
import { Prescription } from '../types';

export const prescriptionService = {
  // Get all prescriptions
  getAll: async (params?: { patient_id?: string; page?: number; limit?: number }) => {
    const response = await api.get('/prescriptions', { params });
    return response.data;
  },

  // Get prescription by ID
  getById: async (id: string) => {
    const response = await api.get(`/prescriptions/${id}`);
    return response.data;
  },

  // Create new prescription
  create: async (prescriptionData: Omit<Prescription, 'id' | 'created_at' | 'updated_at'>) => {
    const response = await api.post('/prescriptions', prescriptionData);
    return response.data;
  },

  // Update prescription
  update: async (id: string, prescriptionData: Partial<Prescription>) => {
    const response = await api.put(`/prescriptions/${id}`, prescriptionData);
    return response.data;
  },

  // Delete prescription
  delete: async (id: string) => {
    const response = await api.delete(`/prescriptions/${id}`);
    return response.data;
  },

  // Get prescriptions by patient ID
  getByPatientId: async (patientId: string) => {
    const response = await api.get('/prescriptions', { 
      params: { patient_id: patientId } 
    });
    return response.data;
  }
};