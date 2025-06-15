import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database,
  Download,
  Upload,
  Trash2,
  Save
} from 'lucide-react';

const Settings: React.FC = () => {
  const [clinicSettings, setClinicSettings] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    logo: ''
  });

  const [doctorSettings, setDoctorSettings] = useState({
    name: '',
    specialization: '',
    license: '',
    signature: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    followUpReminders: true,
    appointmentAlerts: true,
    systemUpdates: false,
    reminderTime: '09:00'
  });

  const handleClinicSettingsChange = (field: string, value: string) => {
    setClinicSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDoctorSettingsChange = (field: string, value: string) => {
    setDoctorSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationSettingsChange = (field: string, value: boolean | string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const exportData = () => {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    const followUps = JSON.parse(localStorage.getItem('followUps') || '[]');
    
    const data = {
      patients,
      prescriptions,
      followUps,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medcare-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('patients');
      localStorage.removeItem('prescriptions');
      localStorage.removeItem('followUps');
      alert('All data has been cleared.');
    }
  };

  const saveSettings = () => {
    localStorage.setItem('clinicSettings', JSON.stringify(clinicSettings));
    localStorage.setItem('doctorSettings', JSON.stringify(doctorSettings));
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <SettingsIcon className="h-8 w-8 text-gray-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Configure your EMR system preferences</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clinic Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Clinic Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic Name
              </label>
              <input
                type="text"
                value={clinicSettings.name}
                onChange={(e) => handleClinicSettingsChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={clinicSettings.address}
                onChange={(e) => handleClinicSettingsChange('address', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={clinicSettings.phone}
                onChange={(e) => handleClinicSettingsChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={clinicSettings.email}
                onChange={(e) => handleClinicSettingsChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Doctor Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor Name
              </label>
              <input
                type="text"
                value={doctorSettings.name}
                onChange={(e) => handleDoctorSettingsChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>
              <input
                type="text"
                value={doctorSettings.specialization}
                onChange={(e) => handleDoctorSettingsChange('specialization', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical License Number
              </label>
              <input
                type="text"
                value={doctorSettings.license}
                onChange={(e) => handleDoctorSettingsChange('license', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Digital Signature
              </label>
              <textarea
                value={doctorSettings.signature}
                onChange={(e) => handleDoctorSettingsChange('signature', e.target.value)}
                rows={3}
                placeholder="Enter your digital signature text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="h-6 w-6 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Follow-up Reminders</h3>
                <p className="text-sm text-gray-600">Get notified about upcoming follow-ups</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.followUpReminders}
                  onChange={(e) => handleNotificationSettingsChange('followUpReminders', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Appointment Alerts</h3>
                <p className="text-sm text-gray-600">Receive alerts for scheduled appointments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.appointmentAlerts}
                  onChange={(e) => handleNotificationSettingsChange('appointmentAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">System Updates</h3>
                <p className="text-sm text-gray-600">Get notified about system updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.systemUpdates}
                  onChange={(e) => handleNotificationSettingsChange('systemUpdates', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Reminder Time
              </label>
              <input
                type="time"
                value={notificationSettings.reminderTime}
                onChange={(e) => handleNotificationSettingsChange('reminderTime', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Database className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Backup & Export</h3>
              <p className="text-sm text-gray-600 mb-4">
                Export all your data for backup or migration purposes
              </p>
              <button
                onClick={exportData}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-2">Import Data</h3>
              <p className="text-sm text-gray-600 mb-4">
                Import data from a previous backup
              </p>
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Upload className="h-4 w-4" />
                <span>Import Data</span>
              </button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-2 text-red-700">Danger Zone</h3>
              <p className="text-sm text-gray-600 mb-4">
                Permanently delete all data from the system
              </p>
              <button
                onClick={clearAllData}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-end">
          <button
            onClick={saveSettings}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="h-5 w-5" />
            <span>Save All Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;