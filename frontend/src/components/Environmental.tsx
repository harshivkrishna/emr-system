import React from 'react';
import { ThermometerSun, Droplets, Wind, CloudRain, Sprout, TreesIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Environmental: React.FC = () => {
  const environmentalData = {
    current: {
      temperature: 24,
      humidity: 65,
      airQuality: 82,
      rainfall: 120,
      greenCoverage: 35,
      carbonOffset: 1250
    },
    historical: [
      { month: 'Jan', temperature: 22, humidity: 60, airQuality: 85 },
      { month: 'Feb', temperature: 23, humidity: 62, airQuality: 83 },
      { month: 'Mar', temperature: 24, humidity: 65, airQuality: 82 },
      { month: 'Apr', temperature: 25, humidity: 68, airQuality: 80 }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-8 flex items-center gap-2">
        <ThermometerSun className="h-8 w-8" />
        Environmental Monitoring
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-2xl font-bold text-green-600">{environmentalData.current.temperature}°C</p>
            </div>
            <ThermometerSun className="h-10 w-10 text-green-500" />
          </div>
          <p className="text-sm text-gray-500">Optimal range: 20-26°C</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-2xl font-bold text-green-600">{environmentalData.current.humidity}%</p>
            </div>
            <Droplets className="h-10 w-10 text-green-500" />
          </div>
          <p className="text-sm text-gray-500">Optimal range: 40-70%</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Air Quality Index</p>
              <p className="text-2xl font-bold text-green-600">{environmentalData.current.airQuality}</p>
            </div>
            <Wind className="h-10 w-10 text-green-500" />
          </div>
          <p className="text-sm text-gray-500">Good air quality (80)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-6">Environmental Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={environmentalData.historical}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#16a34a" name="Temperature (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="#2563eb" name="Humidity (%)" />
                <Line type="monotone" dataKey="airQuality" stroke="#7c3aed" name="Air Quality" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-6">Impact Metrics</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 flex items-center gap-2">
                  <CloudRain className="h-5 w-5" />
                  Annual Rainfall
                </span>
                <span className="font-semibold">{environmentalData.current.rainfall} mm</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 rounded-full h-2" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 flex items-center gap-2">
                  <Sprout className="h-5 w-5" />
                  Green Coverage
                </span>
                <span className="font-semibold">{environmentalData.current.greenCoverage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 rounded-full h-2" style={{ width: '35%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 flex items-center gap-2">
                  <TreesIcon className="h-5 w-5" />
                  Carbon Offset
                </span>
                <span className="font-semibold">{environmentalData.current.carbonOffset} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 rounded-full h-2" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Environmental;