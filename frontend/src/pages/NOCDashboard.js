import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './NOCDashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function NOCDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverReport, setDriverReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trackerData, setTrackerData] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/noc/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setDashboardData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      setLoading(false);
    }
  };

  const handleDriverSelect = async (driver) => {
    setSelectedDriver(driver);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/api/noc/daily-report/${driver._id}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setDriverReport(response.data);
    } catch (err) {
      console.error('Error fetching report:', err);
    }
  };

  if (loading) return <div className="noc-loading">Loading NOC Dashboard...</div>;

  return (
    <div className="noc-dashboard">
      <h1>🚨 Fleet NOC - Operations Center</h1>
      
      {/* Dashboard Summary */}
      <div className="noc-summary">
        <div className="summary-card">
          <h3>Drivers Monitored</h3>
          <p className="big-number">{dashboardData?.summary?.totalDriversMonitored || 0}</p>
        </div>
        <div className="summary-card">
          <h3>Vehicles Active</h3>
          <p className="big-number">{dashboardData?.summary?.vehiclesMonitored || 0}</p>
        </div>
        <div className="summary-card">
          <h3>Reports Today</h3>
          <p className="big-number">{dashboardData?.summary?.reportsCompleted || 0}</p>
        </div>
        <div className="summary-card">
          <h3>Avg Safety Score</h3>
          <p className="big-number">{dashboardData?.summary?.averageSafetyScore || 0}/5</p>
        </div>
      </div>

      {/* Real-time Tracking */}
      <div className="noc-section">
        <h2>📍 Real-time Vehicle Tracking</h2>
        <div className="tracking-grid">
          {dashboardData?.trackerData?.map((tracker) => (
            <div key={tracker._id} className="tracker-card">
              <p><strong>Location:</strong> {tracker.location.latitude.toFixed(4)}, {tracker.location.longitude.toFixed(4)}</p>
              <p><strong>Speed:</strong> {tracker.speed.current} km/h</p>
              <p><strong>Fuel:</strong> {tracker.fuelLevel}%</p>
              <p style={{
                color: tracker.speedingDetected ? 'red' : 'green'
              }}>
                Status: {tracker.speedingDetected ? '⚠️ SPEEDING' : '✅ OK'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Drivers List */}
      <div className="noc-section">
        <h2>👥 Monitored Drivers</h2>
        <div className="drivers-list">
          {dashboardData?.todayReports?.map((report) => (
            <div
              key={report._id}
              className={`driver-item ${selectedDriver?._id === report.driver._id ? 'selected' : ''}`}
              onClick={() => handleDriverSelect(report.driver)}
            >
              <h4>{report.driver.firstName} {report.driver.lastName}</h4>
              <p>Rating: {report.dailyRating}/5</p>
              <p>Incidents: {report.incidents?.length || 0}</p>
              <p style={{
                color: report.reviewPriority === 'critical' ? 'red' : 'orange'
              }}>
                Priority: {report.reviewPriority}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Driver Report */}
      {driverReport && (
        <div className="noc-section driver-report">
          <h2>📋 Daily Report - {selectedDriver?.firstName} {selectedDriver?.lastName}</h2>
          
          <div className="report-grid">
            <div className="report-card">
              <h3>Tracker Metrics</h3>
              <p>Distance: {driverReport.trackerMetrics?.totalDistance} km</p>
              <p>Avg Speed: {driverReport.trackerMetrics?.averageSpeed} km/h</p>
              <p>Max Speed: {driverReport.trackerMetrics?.maxSpeed} km/h</p>
              <p>Speeding Incidents: {driverReport.trackerMetrics?.speedingIncidents?.count}</p>
              <p>Harsh Braking: {driverReport.trackerMetrics?.harshBraking}</p>
            </div>

            <div className="report-card">
              <h3>Compliance Score</h3>
              <p>Safety: {driverReport.complianceMetrics?.safetyScore}/100</p>
              <p>Speed Limit: {driverReport.complianceMetrics?.speedLimitCompliance}%</p>
              <p>Traffic Light: {driverReport.complianceMetrics?.trafficLightCompliance}%</p>
            </div>

            <div className="report-card">
              <h3>Dashcam Analysis</h3>
              <p>Video Duration: {driverReport.dashcamAnalysis?.videoDuration} min</p>
              <p>Incidents: {driverReport.dashcamAnalysis?.incidentsDetected?.length}</p>
              <p>Weather: {driverReport.dashcamAnalysis?.weather}</p>
            </div>
          </div>

          {/* Behaviors */}
          <div className="behaviors-section">
            <div className="positive-behaviors">
              <h4>✅ Positive Observations</h4>
              <ul>
                {driverReport.behaviors?.positive?.map((behavior, idx) => (
                  <li key={idx}>{behavior}</li>
                ))}
              </ul>
            </div>

            <div className="negative-behaviors">
              <h4>⚠️ Areas for Improvement</h4>
              <ul>
                {driverReport.behaviors?.negative?.map((behavior, idx) => (
                  <li key={idx}>{behavior}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* NOC Notes */}
          <div className="noc-notes">
            <h4>NOC Notes</h4>
            <p>{driverReport.nocNotes || 'No notes'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NOCDashboard;