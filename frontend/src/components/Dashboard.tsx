import React from 'react';
import { Square as TreeSquare, Users, Trophy, Thermometer } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Trees Planted</p>
              <p className="text-2xl font-bold text-green-600">127</p>
            </div>
            <TreeSquare className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your Rank</p>
              <p className="text-2xl font-bold text-green-600">#42</p>
            </div>
            <Trophy className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Community Members</p>
              <p className="text-2xl font-bold text-green-600">1,234</p>
            </div>
            <Users className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Local Temperature</p>
              <p className="text-2xl font-bold text-green-600">24°C</p>
            </div>
            <Thermometer className="h-10 w-10 text-green-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 border-b pb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <TreeSquare className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">New tree planted at Central Park</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Environmental Impact</h2>
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">CO2 Absorbed</p>
              <p className="text-2xl font-bold text-green-600">1,234 kg</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Area Covered</p>
              <p className="text-2xl font-bold text-green-600">2.5 hectares</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;