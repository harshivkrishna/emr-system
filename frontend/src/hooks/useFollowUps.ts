import { useState, useEffect } from 'react';
import { followUpService } from '../services/followUpService';
import { FollowUp } from '../types';

export const useFollowUps = (status?: string) => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFollowUps = async () => {
    try {
      setLoading(true);
      const params = status ? { status } : undefined;
      const response = await followUpService.getAll(params);
      setFollowUps(response.followUps);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch follow-ups');
    } finally {
      setLoading(false);
    }
  };

  const createFollowUp = async (followUpData: Omit<FollowUp, 'id' | 'patient_name' | 'created_at'>) => {
    try {
      const newFollowUp = await followUpService.create(followUpData);
      setFollowUps(prev => [newFollowUp, ...prev]);
      return newFollowUp;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to create follow-up');
    }
  };

  const updateFollowUp = async (id: string, followUpData: Partial<FollowUp>) => {
    try {
      const updatedFollowUp = await followUpService.update(id, followUpData);
      setFollowUps(prev => prev.map(f => f.id === id ? updatedFollowUp : f));
      return updatedFollowUp;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to update follow-up');
    }
  };

  const deleteFollowUp = async (id: string) => {
    try {
      await followUpService.delete(id);
      setFollowUps(prev => prev.filter(f => f.id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to delete follow-up');
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, [status]);

  return {
    followUps,
    loading,
    error,
    fetchFollowUps,
    createFollowUp,
    updateFollowUp,
    deleteFollowUp
  };
};