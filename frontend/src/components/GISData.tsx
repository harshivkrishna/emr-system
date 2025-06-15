import React, { useState } from 'react';
import { Map, Layers, TreesIcon, Filter, Navigation2 } from 'lucide-react';

const GISData: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState('satellite');
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  const treeData = [
    { id: 1, species: 'Oak', count: 156, health: 'Good', age: '5-10 years' },
    { id: 2, species: 'Pine', count: 89, health: 'Excellent', age: '3-7 years' },
    { id: 3, species: 'Maple', count: 124, health: 'Good', age: '4-8 years' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2">
                <Map className="h-6 w-6" />
                Satellite View
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedLayer('satellite')}
                  className={`px-3 py-1 rounded ${
                    selectedLayer === 'satellite'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  Satellite
                </button>
                <button
                  onClick={() => setSelectedLayer('terrain')}
                  className={`px-3 py-1 rounded ${
                    selectedLayer === 'terrain'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  Terrain
                </button>
              </div>

            </div>
            
            {/* Placeholder for map - in production, this would be replaced with a real map component */}
            <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200"
                alt="Satellite View"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow p-2">
                <Navigation2 className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <Layers className="h-6 w-6" />
              Layer Controls
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Tree Density', 'Species Distribution', 'Age Groups', 'Health Status'].map((layer, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="checkbox" id={layer} className="rounded text-green-600" />
                  <label htmlFor={layer} className="text-sm text-gray-600">{layer}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <TreesIcon className="h-6 w-6" />
              Tree Statistics
            </h2>
            <div className="space-y-4">
              {treeData.map((tree) => (
                <div key={tree.id} className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-green-800">{tree.species}</span>
                    <span className="text-sm text-green-600">{tree.count} trees</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Health: {tree.health}</p>
                    <p>Age: {tree.age}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <Filter className="h-6 w-6" />
              Filters
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tree Species
                </label>
                <select
                  value={selectedSpecies}
                  onChange={(e) => setSelectedSpecies(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="all">All Species</option>
                  <option value="oak">Oak</option>
                  <option value="pine">Pine</option>
                  <option value="maple">Maple</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Health Status
                </label>
                <div className="space-y-2">
                  {['Excellent', 'Good', 'Fair', 'Poor'].map((status) => (
                    <div key={status} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={status}
                        className="rounded text-green-600"
                      />
                      <label htmlFor={status} className="text-sm text-gray-600">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GISData;