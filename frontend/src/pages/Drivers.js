import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Drivers.css';

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/drivers');
      setDrivers(response.data);
    } catch (err) {
      console.error('Error fetching drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="drivers-container">
      <h1>Drivers</h1>
      <button className="add-btn">+ Add Driver</button>
      {loading ? (
        <p>Loading...</p>
      ) : drivers.length === 0 ? (
        <p>No drivers found</p>
      ) : (
        <div className="drivers-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>License Number</th>
                <th>Status</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver._id}>
                  <td>{driver.firstName} {driver.lastName}</td>
                  <td>{driver.email}</td>
                  <td>{driver.licenseNumber}</td>
                  <td>{driver.status}</td>
                  <td>{driver.safetyRating}/5</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Drivers;
