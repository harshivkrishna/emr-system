import { useState, useEffect } from 'react';
import { prescriptionService } from '../services/prescriptionService';
import { Prescription } from '../types';

export const usePrescriptions = (patientId?: string) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const params = patientId ? { patient_id: patientId } : undefined;
      const response = await prescriptionService.getAll(params);
      setPrescriptions(response.prescriptions);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch prescriptions');
    } finally {
      setLoading(false);
    }
  };

  const createPrescription = async (prescriptionData: Omit<Prescription, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newPrescription = await prescriptionService.create(prescriptionData);
      setPrescriptions(prev => [newPrescription, ...prev]);
      return newPrescription;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to create prescription');
    }
  };

  const updatePrescription = async (id: string, prescriptionData: Partial<Prescription>) => {
    try {
      const updatedPrescription = await prescriptionService.update(id, prescriptionData);
      setPrescriptions(prev => prev.map(p => p.id === id ? updatedPrescription : p));
      return updatedPrescription;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to update prescription');
    }
  };

  const deletePrescription = async (id: string) => {
    try {
      await prescriptionService.delete(id);
      setPrescriptions(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to delete prescription');
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [patientId]);

  return {
    prescriptions,
    loading,
    error,
    fetchPrescriptions,
    createPrescription,
    updatePrescription,
    deletePrescription
  };
};