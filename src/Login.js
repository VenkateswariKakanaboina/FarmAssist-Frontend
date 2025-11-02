import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Optional auto-redirect if already logged in
  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      window.location.href = 'select-crop.html';
    }
  }, []);

  const validateForm = () => {
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError('Password must be at least 8 characters and include one special character');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // simulate login success
      sessionStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'select-crop.html'; // change to route if using react-router
    }
  };

  return (
    <div>
      <header className="index-header">
        <h1 className="index_h1">FarmAssist Login</h1>
      </header>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="error-msg">{emailError}</div>

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="error-msg">{passwordError}</div>

          <button type="submit">Login</button>
        </form>

        <p className="signup-prompt">
          Don’t have an account?{' '}
          <nav>
             <Link to="/signup" className="button">Signup</Link>
          </nav>
        </p>
      </div>
    </div>
  );
};
export default Login;

