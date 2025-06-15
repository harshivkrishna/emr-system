import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Plus
} from 'lucide-react';
import axios from 'axios';
import { FollowUp, Patient } from '../types';
import { useLocation, useParams } from 'react-router-dom';

const FollowUpManager: React.FC = () => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFollowUp, setNewFollowUp] = useState({
    patient_id: '',
    reason: '',
    scheduled_date: '',
    notes: ''
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    const patientId = query.get('patientId');
    fetchFollowUps();
    fetchPatients();
    
    // If patientId exists in query params, open the form and set the patient_id
    if (patientId) {
      setShowAddForm(true);
      setNewFollowUp(prev => ({
        ...prev,
        patient_id: patientId
      }));
    }
  }, [location.search]); // Add location.search to dependency array

  const fetchFollowUps = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/followups');
      setFollowUps(response.data.followUps);
    } catch (error) {
      console.error('Error fetching follow-ups:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data.patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const addFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/followups', newFollowUp);
      setFollowUps([...followUps, response.data]);
      setNewFollowUp({ patient_id: '', reason: '', scheduled_date: '', notes: '' });
      setShowAddForm(false);
      
      // Remove patientId from URL after successful submission
      if (query.get('patientId')) {
        query.delete('patientId');
        window.history.replaceState({}, '', `${location.pathname}?${query.toString()}`);
      }
    } catch (error) {
      console.error('Error adding follow-up:', error);
    }
  };

  const updateFollowUpStatus = async (id: string, status: 'completed' | 'rescheduled') => {
    try {
      const response = await axios.put(`http://localhost:5000/api/followups/${id}`, { status });
      const updatedFollowUp = response.data;
      setFollowUps((prev) => prev.map(f => f._id === updatedFollowUp._id ? updatedFollowUp : f));
    } catch (error) {
      console.error('Error updating follow-up:', error);
    }
  };

  const getFilteredFollowUps = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return followUps.filter(followUp => {
      const scheduledDate = new Date(followUp.scheduled_date);
      scheduledDate.setHours(0, 0, 0, 0);
      switch (filter) {
        case 'pending': return followUp.status === 'pending';
        case 'completed': return followUp.status === 'completed';
        case 'overdue': return followUp.status === 'pending' && scheduledDate < today;
        default: return true;
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const scheduledDate = new Date(dateString);
    scheduledDate.setHours(0, 0, 0, 0);
    return scheduledDate < today;
  };

  const filteredFollowUps = getFilteredFollowUps();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Calendar className="h-8 w-8 text-orange-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Follow-up Manager</h1>
            <p className="text-gray-600">Schedule and track patient follow-ups</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule Follow-up</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Schedule New Follow-up</h2>
          <form onSubmit={addFollowUp} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Patient *</label>
                <select
                  value={newFollowUp.patient_id}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, patient_id:e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Choose a patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name} - {patient.phone}
                    </option>
                  )
                  )
                  }
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Scheduled Date *</label>
                <input
                  type="date"
                  value={newFollowUp.scheduled_date}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, scheduled_date: e.target.value })}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reason for Follow-up *</label>
              <input
                type="text"
                value={newFollowUp.reason}
                onChange={(e) => setNewFollowUp({ ...newFollowUp, reason: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Review test results"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                value={newFollowUp.notes}
                onChange={(e) => setNewFollowUp({ ...newFollowUp, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Additional notes or instructions"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Schedule Follow-up
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All', count: followUps.length },
          { key: 'pending', label: 'Pending', count: followUps.filter(f => f.status === 'pending').length },
          { key: 'overdue', label: 'Overdue', count: followUps.filter(f => f.status === 'pending' && isOverdue(f.scheduled_date)).length },
          { key: 'completed', label: 'Completed', count: followUps.filter(f => f.status === 'completed').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 rounded-lg ${
              filter === tab.key ? 'bg-orange-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredFollowUps.length === 0 ? (
          <div className="text-center py-12 text-gray-600">No follow-ups found.</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredFollowUps.map((followUp) => (
              <div key={followUp._id} className="p-6 flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{followUp.patient_name}</h3>
                  <p className="text-gray-600">{followUp.reason}</p>
                  <p className="text-sm text-gray-500">Scheduled: {formatDate(followUp.scheduled_date)}</p>
                  {followUp.notes && <p className="italic text-gray-500">{followUp.notes}</p>}
                </div>
                {followUp.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateFollowUpStatus(followUp._id, 'completed')}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Mark Completed
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUpManager;
