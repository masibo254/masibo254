import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Maintenance.css';

function Maintenance() {
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaintenance();
  }, []);

  const fetchMaintenance = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/maintenance');
      setMaintenance(response.data);
    } catch (err) {
      console.error('Error fetching maintenance records:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="maintenance-container">
      <h1>Maintenance Management</h1>
      <button className="add-btn">+ Schedule Maintenance</button>
      {loading ? (
        <p>Loading...</p>
      ) : maintenance.length === 0 ? (
        <p>No maintenance records found</p>
      ) : (
        <div className="maintenance-list">
          {maintenance.map((record) => (
            <div key={record._id} className="maintenance-card">
              <h3>{record.maintenanceType}</h3>
              <p>Status: {record.status}</p>
              <p>Scheduled: {new Date(record.scheduledDate).toLocaleDateString()}</p>
              <p>Cost: ${record.estimatedCost}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Maintenance;
