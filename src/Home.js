import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import homeImage from './Home.jpeg';
const HomePage = () => {
  return (
    <div>
      {/* ---------- Header ---------- */}
      <header className="index-header">
        <h1 className="index_h1">FarmAssist</h1>
        <p>Your Companion for Smarter Farming</p>
      </header>

      {/* ---------- Navigation ---------- */}
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/knowledge">Knowledge</Link>
        <Link to="/services">Services</Link>
        <Link to="/login" className="button">Login</Link>
      </nav>

      {/* ---------- Banner Section ---------- */}
      <section className="banner-section">
        <img src={homeImage} alt="Farming scene" className="index-banner" />
      </section>

      {/* ---------- Footer ---------- */}
      <footer>
        <p>&copy; 2025 <strong>FarmAssist</strong>. Empowering Farmers Across India.</p>
      </footer>
    </div>
  );
};

export default HomePage;


