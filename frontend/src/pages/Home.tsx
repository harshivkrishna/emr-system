import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  Users, 
  FileText, 
  Calendar,
  Activity,
  Clock,
  TrendingUp,
  Heart
} from 'lucide-react';

const Home: React.FC = () => {
  const stats = [
    { label: 'Total Patients', value: '1,247', icon: Users, color: 'bg-blue-500' },
    { label: 'Today\'s Appointments', value: '23', icon: Calendar, color: 'bg-green-500' },
    { label: 'Pending Follow-ups', value: '8', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Prescriptions Today', value: '15', icon: FileText, color: 'bg-purple-500' }
  ];

  const quickActions = [
    {
      title: 'Register New Patient',
      description: 'Add a new patient to the system',
      icon: UserPlus,
      link: '/register',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'View All Patients',
      description: 'Browse and manage patient records',
      icon: Users,
      link: '/patients',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Create Prescription',
      description: 'Write a new prescription',
      icon: FileText,
      link: '/patients',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Manage Follow-ups',
      description: 'Schedule and track patient follow-ups',
      icon: Calendar,
      link: '/followups',
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white">
        <div className="flex justify-center mb-4">
          <Heart className="h-16 w-16 text-blue-200" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Welcome to MedCare EMR</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Streamline your medical practice with our comprehensive Electronic Medical Records system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} text-white rounded-xl p-6 transition-all duration-200 transform hover:scale-105 shadow-lg`}
            >
              <action.icon className="h-8 w-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            Recent Activity
          </h2>
          <Link to="/patients" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </Link>
        </div>
        
        <div className="space-y-4">
          {[
            { action: 'New patient registered', patient: 'John Smith', time: '10 minutes ago' },
            { action: 'Prescription created', patient: 'Sarah Johnson', time: '25 minutes ago' },
            { action: 'Follow-up scheduled', patient: 'Michael Brown', time: '1 hour ago' },
            { action: 'Patient record updated', patient: 'Emily Davis', time: '2 hours ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">Patient: {activity.patient}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">System Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Patient Management</h3>
            <p className="text-sm text-gray-600">Complete patient records with medical history and contact information</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Digital Prescriptions</h3>
            <p className="text-sm text-gray-600">Create, manage, and export prescriptions with medication tracking</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Analytics & Reports</h3>
            <p className="text-sm text-gray-600">Track patient outcomes and practice performance metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;