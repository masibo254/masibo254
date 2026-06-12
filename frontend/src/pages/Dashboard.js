import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeVehicles: 0,
    totalDrivers: 0,
    pendingMaintenance: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch statistics
      setStats({
        totalVehicles: 24,
        activeVehicles: 22,
        totalDrivers: 18,
        pendingMaintenance: 3
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Vehicles</h3>
          <p className="stat-number">{stats.totalVehicles}</p>
        </div>
        <div className="stat-card">
          <h3>Active Vehicles</h3>
          <p className="stat-number">{stats.activeVehicles}</p>
        </div>
        <div className="stat-card">
          <h3>Total Drivers</h3>
          <p className="stat-number">{stats.totalDrivers}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Maintenance</h3>
          <p className="stat-number">{stats.pendingMaintenance}</p>
        </div>
      </div>
      <div className="dashboard-section">
        <h2>Recent Activity</h2>
        <p>Coming soon...</p>
      </div>
    </div>
  );
}

export default Dashboard;
