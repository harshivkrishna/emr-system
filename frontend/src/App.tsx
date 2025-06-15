import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegisterPatient from './pages/RegisterPatient';
import PatientList from './pages/PatientList';
import PatientDetails from './pages/PatientDetails';
import PrescriptionForm from './pages/PrescriptionForm';
import FollowUpManager from './pages/FollowUpManager';
import SearchPage from './pages/SearchPage';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPatient />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patient/:id" element={<PatientDetails />} />
            <Route path="/patient/:id/prescribe" element={<PrescriptionForm />} />
            <Route path="/followups" element={<FollowUpManager />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;