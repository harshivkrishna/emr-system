import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Calendar,
  User,
  Phone,
  Eye,
  FileText,
} from 'lucide-react';
import { Patient, SearchFilters } from '../types';

const SearchPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    name: '',
    phone: '',
    dateFrom: '',
    dateTo: '',
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<{ patients: Patient[] }>('https://medcare-backend-api.onrender.com/api/patients');
      setPatients(response.data.patients);
      setFilteredPatients(response.data.patients);
    } catch (err) {
      setError('Failed to load patient data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = patients;

    if (filters.name) {
      filtered = filtered.filter((patient) =>
        patient.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    
    if (filters.phone) {
      filtered = filtered.filter((patient) =>
        patient.phone.includes(filters.phone)
      );
    }
    

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (patient) => new Date(patient.created_at) >= new Date(filters.dateFrom!)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(
        (patient) => new Date(patient.created_at) <= new Date(filters.dateTo!)
      );
    }

    setFilteredPatients(filtered);
  }, [patients, filters]);

  const handleFilterChange = (field: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      phone: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <Search className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Advanced Search</h1>
            <p className="text-gray-600">Search and filter patient records</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter patient name..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.phone}
                  onChange={(e) => handleFilterChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter phone number..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>{showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters</span>
            </button>

            {(filters.name || filters.phone || filters.dateFrom || filters.dateTo) && (
              <button
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registered From
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registered To
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Search Results</h2>
            <span className="text-sm text-gray-600">
              {filteredPatients.length} of {patients.length} patients
            </span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading patients...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600">
              {patients.length === 0
                ? 'No patients have been registered yet.'
                : 'Try adjusting your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <div key={patient._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{patient.phone}</span>
                        </span>
                        <span>
                          {patient.age} years, {patient.gender}
                        </span>
                        {patient.blood_group && <span>Blood Group: {patient.blood_group}</span>}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Registered: {formatDate(patient.created_at)}
                      </p>
                      {patient.address && (
                        <p className="text-sm text-gray-600 mt-1">{patient.address}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/patient/${patient._id}`}
                      className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </Link>
                    <Link
                      to={`/patient/${patient._id}/prescribe`}
                      className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Prescribe</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Tips */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Search Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Use partial names to find patients (e.g., "John" will find "John Smith")</li>
          <li>• Phone search works with partial numbers</li>
          <li>• Use date filters to find patients registered within specific periods</li>
          <li>• Combine multiple filters for more precise results</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
