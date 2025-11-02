import React from 'react';
import { Link } from 'react-router-dom';
import './PersonalDashboard.css'; 
const PersonalPage = () => {
  return (
    <div>
      {/* ---------- Header ---------- */}
      <header className="index-header">
        
      </header>

      {/* ---------- Navigation ---------- */}
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/remainder">ReminderManager</Link>
        <Link to="/activity">ActivityPlanner</Link>
        <Link to="/expenses" className="button">ExpenseTracker</Link>
        <Link to="/crop" className="button">CropProcess</Link>
      </nav>

      {/* ---------- Footer ---------- */}
      <footer>
        <p>&copy; 2025 <strong>FarmAssist</strong>. Empowering Farmers Across India.</p>
      </footer>
    </div>
  );
};

export default PersonalPage;


