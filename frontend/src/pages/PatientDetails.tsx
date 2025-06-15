import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Edit,
  ArrowLeft,
  Heart,
  AlertTriangle,
  Clock,
  Pill
} from 'lucide-react';
import { Patient, Prescription } from '../types';

const PatientDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching *single* patient - adjust the API URL or add filters here
        const patientRes = await axios.get<Patient>(`https://emr-system-api.vercel.app/api/patients/${id}`); // Modify endpoint as needed
        const patientData = patientRes.data;

        if (patientData && patientData._id) {
          setPatient(patientData);
          const prescriptionsRes = await axios.get<Prescription[]>(
            `https://emr-system-api.vercel.app/api/prescriptions/${patientData._id}`
          );
          setPrescriptions(prescriptionsRes.data);

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Patient not found</h3>
        <p className="text-gray-600 mb-4">The patient you're looking for doesn't exist.</p>
        <Link
          to="/patients"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Patients</span>
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-700 rounded-full p-3">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{patient.name}</h1>
                <p className="text-blue-100">Patient ID: {patient._id}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {/* <button className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button> */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/patient/${patient._id}/prescribe`}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span>New Prescription</span>
            </Link>
            <button className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            onClick={() => navigate(`/followups?patientId=${patient._id}`)}>
              <Calendar className="h-4 w-4" />
              <span>Schedule Follow-up</span>
            </button>
            <button
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              onClick={() => {
                const phone = patient.phone.replace(/\D/g, ''); // Remove non-digits if any
                window.open(`https://wa.me/${phone}`, '_blank');
              }}
            >
              <Phone className="h-4 w-4" />
              <span>Call Patient</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Age & Gender</p>
                  <p className="font-medium">{patient.age} years, {patient.gender}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{patient.phone}</p>
                </div>
              </div>

              {patient.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{patient.email}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{patient.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Registered</p>
                  <p className="font-medium">{formatDate(patient.created_at)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h2>
            <div className="space-y-4">
              {patient.blood_group && (
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-600">Blood Group</p>
                    <p className="font-medium">{patient.blood_group}</p>
                  </div>
                </div>
              )}

              {patient.emergency_contact && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">Emergency Contact</p>
                    <p className="font-medium">{patient.emergency_contact}</p>
                  </div>
                </div>
              )}

              {patient.allergies && (
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Allergies</p>
                    <p className="font-medium text-red-700">{patient.allergies}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {patient.medical_history && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h2>
              <p className="text-gray-700 leading-relaxed">{patient.medical_history}</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Prescription History
              </h2>
              <Link
                to={`/patient/${patient._id}/prescribe`}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>New Prescription</span>
              </Link>
            </div>

            {prescriptions.length === 0 ? (
              <div className="text-center py-8">
                <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions yet</h3>
                <p className="text-gray-600 mb-4">This patient doesn't have any prescriptions on record.</p>
                <Link
                  to={`/patient/${patient._id}/prescribe`}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Create First Prescription</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div key={prescription._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{formatDate(prescription.created_at)}</span>
                      </div>
                      <span className="text-sm font-medium text-blue-600">Dr. {prescription.doctor_name}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Symptoms</h4>
                        <p className="text-sm text-gray-600">{prescription.symptoms}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Diagnosis</h4>
                        <p className="text-sm text-gray-600">{prescription.diagnosis}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Medications</h4>
                      <div className="space-y-2">
                        {prescription.medications.map((med, index) => (
                          <div key={index} className="bg-gray-50 rounded p-3">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{med.name}</span>
                              <span className="text-sm text-gray-600">{med.dosage}</span>
                            </div>
                            <p className="text-sm text-gray-600">{med.frequency} for {med.duration}</p>
                            {med.instructions && (
                              <p className="text-sm text-gray-500 italic">{med.instructions}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {prescription.advice && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-1">Advice</h4>
                        <p className="text-sm text-gray-600">{prescription.advice}</p>
                      </div>
                    )}

                    {prescription.follow_up_date && (
                      <div className="mt-4 flex items-center space-x-2 text-sm text-orange-600">
                        <Calendar className="h-4 w-4" />
                        <span>Follow-up scheduled for {formatDate(prescription.follow_up_date)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
