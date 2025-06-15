import { useState, useEffect } from 'react';
import { patientService } from '../services/patientService';
import { Patient } from '../types';

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientService.getAll();
      setPatients(response.patients);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const createPatient = async (patientData: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newPatient = await patientService.create(patientData);
      setPatients(prev => [...prev, newPatient]);
      return newPatient;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to create patient');
    }
  };

  const updatePatient = async (_id: string, patientData: Partial<Patient>) => {
    try {
      const updatedPatient = await patientService.update(_id, patientData);
      setPatients(prev => prev.map(p => p._id === _id ? updatedPatient : p));
      return updatedPatient;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to update patient');
    }
  };

  const deletePatient = async (_id: string) => {
    try {
      await patientService.delete(_id);
      setPatients(prev => prev.filter(p => p._id !== _id));
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to delete patient');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    fetchPatients,
    createPatient,
    updatePatient,
    deletePatient
  };
};