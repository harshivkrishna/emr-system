import api from './api';
import { FollowUp } from '../types';

export const followUpService = {
  // Get all follow-ups
  getAll: async (params?: { status?: string; patient_id?: string; page?: number; limit?: number }) => {
    const response = await api.get('/followups', { params });
    return response.data;
  },

  // Get follow-up by ID
  getById: async (id: string) => {
    const response = await api.get(`/followups/${id}`);
    return response.data;
  },

  // Create new follow-up
  create: async (followUpData: Omit<FollowUp, 'id' | 'patient_name' | 'created_at'>) => {
    const response = await api.post('/followups', followUpData);
    return response.data;
  },

  // Update follow-up
  update: async (id: string, followUpData: Partial<FollowUp>) => {
    const response = await api.put(`/followups/${id}`, followUpData);
    return response.data;
  },

  // Delete follow-up
  delete: async (id: string) => {
    const response = await api.delete(`/followups/${id}`);
    return response.data;
  },

  // Get overdue follow-ups
  getOverdue: async () => {
    const response = await api.get('/followups/status/overdue');
    return response.data;
  },

  // Get follow-ups by status
  getByStatus: async (status: 'pending' | 'completed' | 'rescheduled') => {
    const response = await api.get('/followups', { params: { status } });
    return response.data;
  }
};