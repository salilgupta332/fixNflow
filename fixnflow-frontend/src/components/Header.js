import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';
const Header = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
  <div>
    <Link to="/" className="header-logo">FixNFlow</Link>
  </div>
  <nav className="header-nav">
    <Link to="/about" className="header-link">About Us</Link>
    <Link to="/features" className="header-link">Features</Link>
    <Link to="/contact" className="header-link">Contact</Link>
  </nav>
  <div className="header-auth">
    {!token && (
      <>
        <Link to="/login" className="header-link-button" style={{marginRight: 8}}>Login</Link>
        <Link to="/register" className="header-link-button">Register</Link>
      </>
    )}
    {token && (
      <button onClick={handleLogout} className="header-button">
        Logout
      </button>
    )}
  </div>
</header>

  );
};

export default Header;
