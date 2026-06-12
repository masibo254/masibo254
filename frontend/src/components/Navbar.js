import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>🚗 Fleet Management</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/vehicles">Vehicles</Link></li>
        <li><Link to="/drivers">Drivers</Link></li>
        <li><Link to="/maintenance">Maintenance</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
