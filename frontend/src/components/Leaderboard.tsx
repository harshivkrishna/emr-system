import React, { useState } from 'react';
import { Trophy, TreesIcon, Calendar, Star } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');
  
  const leaderboardData = {
    monthly: [
      { rank: 1, name: "Thalapathy Vijay", trees: 45, league: "Diamond", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
      { rank: 2, name: "Christiano Ronaldo", trees: 42, league: "Diamond", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
      { rank: 3, name: "Virat Kholi", trees: 38, league: "Gold", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" }
    ],
    yearly: [
      { rank: 1, name: "Jachsparrow", trees: 523, league: "Diamond", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
      { rank: 2, name: "Thalapathy Vijay", trees: 487, league: "Diamond", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
      { rank: 3, name: "Sergio Marquina", trees: 452, league: "Diamond", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150" }
    ]
  };

  const leagueInfo = [
    { name: "Diamond", minTrees: 400, color: "text-blue-500" },
    { name: "Platinum", minTrees: 300, color: "text-gray-400" },
    { name: "Gold", minTrees: 200, color: "text-yellow-500" },
    { name: "Silver", minTrees: 100, color: "text-gray-300" },
    { name: "Bronze", minTrees: 0, color: "text-orange-500" }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
          <Trophy className="h-8 w-8" />
          Leaderboard
        </h1>
        
        <div className="flex gap-2">
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-4 py-2 rounded-lg ${
              timeframe === 'monthly'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeframe('yearly')}
            className={`px-4 py-2 rounded-lg ${
              timeframe === 'yearly'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboardData[timeframe].slice(0, 3).map((user, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16">
              <div className={`absolute transform rotate-45 bg-green-${600 - index * 100} text-white text-xs font-bold py-1 right-[-35px] top-[32px] w-[170px] text-center`}>
                Rank #{user.rank}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              <p className="text-green-600 font-medium flex items-center gap-1 mt-2">
                <TreesIcon className="h-4 w-4" />
                {user.trees} trees
              </p>
              <p className="text-sm text-gray-500 mt-1">{user.league} League</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-green-50 border-b">
          <h2 className="text-xl font-semibold text-green-800">League Rankings</h2>
        </div>
        
        <div className="divide-y">
          {leagueInfo.map((league, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className={`h-5 w-5 ${league.color}`} />
                <span className="font-medium">{league.name} League</span>
              </div>
              <span className="text-sm text-gray-500">
                Min. {league.minTrees} trees
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;