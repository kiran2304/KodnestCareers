import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobDiscovery from './pages/JobDiscovery';
import ResumeBuilder from './pages/ResumeBuilder';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Companies from './pages/Companies';
import Roadmap from './pages/Roadmap';
import Assessment from './pages/Assessment';
import CoverLetter from './pages/CoverLetter';
import Inbox from './pages/Inbox';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobDiscovery />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/assessment" element={<Assessment />} />

            {/* Phase 4 Routes */}
            <Route path="/cover-letter" element={<CoverLetter />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/settings" element={<Settings />} />
            {/* Fallback for other routes */}
            <Route path="*" element={<div className="container"><h1>404 - Not Found</h1></div>} />
          </Routes>
        </main>
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          borderTop: '1px solid var(--border)',
          color: 'var(--text-secondary)',
          marginTop: 'auto'
        }}>
          &copy; {new Date().getFullYear()} Jobsy. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
