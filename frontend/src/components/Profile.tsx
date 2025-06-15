import React from 'react';
import { User, Mail, MapPin, Calendar, TreesIcon, Medal, Activity } from 'lucide-react';

const Profile: React.FC = () => {
  // This would normally come from your auth/user context
  const userProfile = {
    name: "Scarlett Johnson",
    email: "scarlett_johnson.j@example.com",
    location: "Malayambakkam, Chennai",
    joinDate: "March 2023",
    treesPlanted: 127,
    currentLeague: "Gold",
    carbonOffset: "2.5 tons"
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-800 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-green-700 rounded-full p-4">
              <User className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userProfile.name}</h1>
              <p className="text-green-200">{userProfile.currentLeague} League Member</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-800">Personal Information</h2>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span>{userProfile.email}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{userProfile.location}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span>Joined {userProfile.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-800">Impact Statistics</h2>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <TreesIcon className="h-5 w-5" />
                  <span>{userProfile.treesPlanted} Trees Planted</span>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-600">
                  <Medal className="h-5 w-5" />
                  <span>{userProfile.currentLeague} League Status</span>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-600">
                  <Activity className="h-5 w-5" />
                  <span>{userProfile.carbonOffset} CO2 Offset</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: "Planted 3 Oak trees", date: "2 days ago" },
                { action: "Reached Gold League", date: "1 week ago" },
                { action: "Completed Forest Guardian Challenge", date: "2 weeks ago" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-700">{activity.action}</span>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;