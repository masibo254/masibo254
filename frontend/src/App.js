import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import Maintenance from './pages/Maintenance';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize app
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/maintenance" element={<Maintenance />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
