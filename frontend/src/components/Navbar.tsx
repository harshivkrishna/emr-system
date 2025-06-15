import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Stethoscope, 
  Home, 
  UserPlus, 
  Users, 
  Calendar, 
  Search, 
  Settings,
  FileText
} from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Stethoscope className="h-8 w-8 text-blue-300" />
            <div>
              <span className="text-xl font-bold">MedCare EMR</span>
              <p className="text-xs text-blue-300">Electronic Medical Records</p>
            </div>
          </Link>
          
          <div className="flex space-x-1">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/') ? 'bg-blue-800 text-white' : 'hover:bg-blue-800'
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">Home</span>
            </Link>
            
            <Link 
              to="/register" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/register') ? 'bg-blue-800 text-white' : 'hover:bg-blue-800'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden md:inline">Register</span>
            </Link>
            
            <Link 
              to="/patients" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/patients') ? 'bg-blue-800 text-white' : 'hover:bg-blue-800'
              }`}
            >
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Patients</span>
            </Link>
            
            <Link 
              to="/followups" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/followups') ? 'bg-blue-800 text-white' : 'hover:bg-blue-800'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Follow-ups</span>
            </Link>
            
            <Link 
              to="/search" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/search') ? 'bg-blue-800 text-white' : 'hover:bg-blue-800'
              }`}
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Search</span>
            </Link>
            
            <Link 
              to="/settings" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/settings') ? 'bg-blue-800 text-white' : 'hover:bg-blue-800'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;