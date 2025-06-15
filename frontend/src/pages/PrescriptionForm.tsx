import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Save, 
  Download,
  ArrowLeft,
  User,
  Calendar
} from 'lucide-react';
import { Patient, Prescription, Medication } from '../types';
import axios from 'axios';

const PrescriptionForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    doctor_name: '',
    symptoms: '',
    diagnosis: '',
    advice: '',
    follow_up_date: ''
  });
  const [medications, setMedications] = useState<Medication[]>([
    { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingTimeoutReached, setLoadingTimeoutReached] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const commonMedications = [
    'Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Azithromycin', 'Omeprazole',
    'Metformin', 'Amlodipine', 'Atorvastatin', 'Levothyroxine', 'Aspirin'
  ];

  const frequencies = [
    'Once daily', 'Twice daily', 'Three times daily', 'Four times daily',
    'Every 4 hours', 'Every 6 hours', 'Every 8 hours', 'As needed'
  ];

  useEffect(() => {
    const getPatient = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
          setPatient(response.data);
        } catch (err) {
          console.error('Error fetching patient:', err);
          setError('Failed to load patient data');
          setLoadingTimeoutReached(true);
        }
      }
    };
    getPatient();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value
    };
    setMedications(updatedMedications);
  };

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
  };

  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const newPrescription = {
        patient_id: patient._id,
        doctor_name: formData.doctor_name,
        symptoms: formData.symptoms,
        diagnosis: formData.diagnosis,
        medications: medications.filter(med => med.name.trim() !== ''),
        advice: formData.advice,
        follow_up_date: formData.follow_up_date || undefined
      };
      const text=`🩺 Prescription Details

      Patient ID: ${patient._id}  
      Doctor Name: ${formData.doctor_name}  

      Symptoms:  
      ${formData.symptoms}  

      Diagnosis:  
      ${formData.diagnosis}  

      Medications:  
      ${medications.filter(med => med.name.trim() !== '').map(med => `- ${med.name} (${med.dosage}) - ${med.duration}`).join('\n')}

      Advice:  
      ${formData.advice}  

      ${formData.follow_up_date ? `Follow-up Date: ${formData.follow_up_date}` : ''}

      Please follow the instructions carefully. Contact your doctor if you have any questions.`


      // Send prescription to backend
      const response1 = await axios.post('http://localhost:5000/api/prescriptions', newPrescription);

      const response2 = await axios.post('http://localhost:5002/send-message', {
        number: `91${patient.phone}`,
        message: text
      });
      
      // Navigate back to patient details with success message
      navigate(`/patient/${patient._id}`, { 
        state: { message: 'Prescription created successfully!' } 
      });
    } catch (err) {
      console.error('Error creating prescription:', err);
      setError(err as string|| 'Failed to create prescription');
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportToPDF = () => {
    // In a real app, this would generate a proper PDF
    alert('PDF export functionality would be implemented here');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTimeoutReached(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timeout);
  }, []);

  if (!patient && !loadingTimeoutReached) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!patient && loadingTimeoutReached) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        {error || 'No patient found'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">New Prescription</h1>
                <p className="text-green-100">Create prescription for {patient?.name}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Patient Info */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex items-center space-x-4">
            <User className="h-6 w-6 text-gray-400" />
            <div>
              <h3 className="font-semibold text-gray-900">{patient?.name}</h3>
              <p className="text-sm text-gray-600">
                {patient?.age} years, {patient?.gender} • Phone: {patient?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {/* Prescription Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Doctor and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctor Name *
            </label>
            <input
              type="text"
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Follow-up Date
            </label>
            <input
              type="date"
              name="follow_up_date"
              value={formData.follow_up_date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Symptoms and Diagnosis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symptoms *
            </label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe the patient's symptoms..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnosis *
            </label>
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your diagnosis..."
            />
          </div>
        </div>

        {/* Medications */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Medications</h3>
            <button
              type="button"
              onClick={addMedication}
              className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Medication</span>
            </button>
          </div>

          <div className="space-y-4">
            {medications.map((medication, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Medication {index + 1}</h4>
                  {medications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Medicine Name *
                    </label>
                    <input
                      type="text"
                      value={medication.name}
                      onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                      list={`medications-${index}`}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter medicine name"
                    />
                    <datalist id={`medications-${index}`}>
                      {commonMedications.map((med) => (
                        <option key={med} value={med} />
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dosage *
                    </label>
                    <input
                      type="text"
                      value={medication.dosage}
                      onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 500mg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Frequency *
                    </label>
                    <select
                      value={medication.frequency}
                      onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select frequency</option>
                      {frequencies.map((freq) => (
                        <option key={freq} value={freq}>{freq}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration *
                    </label>
                    <input
                      type="text"
                      value={medication.duration}
                      onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 7 days"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <input
                    type="text"
                    value={medication.instructions}
                    onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Take after meals"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advice */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Doctor's Advice
          </label>
          <textarea
            name="advice"
            value={formData.advice}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter any additional advice for the patient..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={exportToPDF}
            className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>{isSubmitting ? 'Saving...' : 'Save Prescription'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrescriptionForm;