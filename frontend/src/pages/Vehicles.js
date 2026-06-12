import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Vehicles.css';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehicles');
      setVehicles(response.data);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vehicles-container">
      <h1>Vehicles</h1>
      <button className="add-btn">+ Add Vehicle</button>
      {loading ? (
        <p>Loading...</p>
      ) : vehicles.length === 0 ? (
        <p>No vehicles found</p>
      ) : (
        <div className="vehicles-grid">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="vehicle-card">
              <h3>{vehicle.make} {vehicle.model}</h3>
              <p>Registration: {vehicle.registrationNumber}</p>
              <p>Status: {vehicle.status}</p>
              <p>Mileage: {vehicle.mileage} km</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Vehicles;
