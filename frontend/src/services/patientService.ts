import api from './api';
import { Patient } from '../types';

export const patientService = {
  // Get all patients
  getAll: async (params?: { page?: number; limit?: number; sortBy?: string; sortOrder?: string }) => {
    const response = await api.get('/patients', { params });
    return response.data;
  },

  // Get patient by ID
  getById: async (id: string) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },

  // Create new patient
  create: async (patientData: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) => {
    const response = await api.post('/patients', patientData);
    return response.data;
  },

  // Update patient
  update: async (id: string, patientData: Partial<Patient>) => {
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
  },

  // Delete patient
  delete: async (id: string) => {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
  },

  // Search patients
  search: async (searchParams: {
    name?: string;
    phone?: string;
    email?: string;
    dateFrom?: string;
    dateTo?: string;
    bloodGroup?: string;
    gender?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/search/patients', { params: searchParams });
    return response.data;
  },

  // Full text search
  textSearch: async (query: string, params?: { page?: number; limit?: number }) => {
    const response = await api.get('/search/patients/text', { 
      params: { q: query, ...params } 
    });
    return response.data;
  }
};