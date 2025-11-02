import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // ✅ assuming you're using the same CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    acres: '',
    landType: '',
    location: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ✅ Added backend connection here
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://farmassist-backend-2.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Backend response:', data);

      if (res.ok) {
        alert('✅ Signup successful!');
      } else {
        alert(`❌ Signup failed: ${data.message || 'Server error'}`);
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      alert('⚠️ Unable to connect to server. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', color: '#689f38' }}>Sign Up</h2>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label htmlFor="acres">Land Area (in Acres):</label>
        <input
          type="number"
          name="acres"
          id="acres"
          value={formData.acres}
          onChange={handleChange}
          required
        />

        <label htmlFor="landType">Type of Land:</label>
        <select
          name="landType"
          id="landType"
          value={formData.landType}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="irrigated">Irrigated</option>
          <option value="non-irrigated">Non-Irrigated</option>
          <option value="dry">Dry</option>
          <option value="wet">Wet</option>
          <option value="organic">Organic</option>
        </select>

        <label htmlFor="location">Location (Village / District):</label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <div className="signup-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
