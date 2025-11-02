import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
const Services = () => {
  return (
    <div className="services-container">
      <h2 className="services-title">🌾 Our Services</h2>
      <div className="services-grid">

        {/* Crop Timelines */}
        <div className="service-card">
          <h3>📅 Crop Timelines</h3>
          <p>Get detailed weekly action plans for each crop, from sowing to harvest.</p>
          <Link to="/track" className="service-button">View Crop Timeline</Link>
        </div>

        {/* Personal Dashboard */}
        <div className="service-card">
          <h3>👨‍🌾 Personal Dashboard</h3>
          <p>
            View your selected crop details, activities, weather, reminders, and expenses — 
            all in one place.
          </p>
          <Link to="/dashboard" className="service-button">Open Dashboard</Link>
        </div>

        {/* Knowledge Base */}
        <div className="service-card">
          <h3>📚 Farming Knowledge Base</h3>
          <p>
            Access curated guides on fertilizers, irrigation, pesticides, and government schemes.
          </p>
          <span className="service-button disabled">Coming Soon</span>
        </div>

        {/* Smart Alerts / Unexpected Situations */}
        <div className="service-card">
          <h3>⚠️ Smart Farming Alerts</h3>
          <p>
            Heavy rainfall or pest attack? Our system will recommend adaptive steps and solutions.
          </p>
          <span className="service-button disabled">Coming Soon</span>
        </div>

      </div>
    </div>
  );
};

export default Services;
