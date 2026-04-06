import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplet } from 'lucide-react';
import { useBloodBank } from '../../context/BloodBankContext';
import Button from '../UI/Button';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, loginMode } = useBloodBank();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search Blood', path: '/search' },
    { name: 'Donate', path: '/register' },
    { name: 'Request Blood', path: '/request' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (currentUser?.role === 'admin') {
    navLinks.push({ name: 'Admin Panel', path: '/admin' });
  } else if (currentUser?.role === 'user') {
    navLinks.push({ name: 'Dashboard', path: '/dashboard' });
  }

  const handleAuthToggle = () => {
    if (currentUser) {
      loginMode(null);
    } else {
      // Mock login toggle for demo purposes
      const mode = window.confirm('Login as Admin? (Cancel for Normal User)') ? 'admin' : 'user';
      loginMode(mode);
    }
  };

  return (
    <header className="header glass">
      <div className="container header-container">
        <Link to="/" className="logo">
          <Droplet size={28} color="var(--primary)" fill="var(--primary)" />
          <span>BloodConnect</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <Button 
            variant={currentUser ? "outline" : "primary"} 
            size="sm" 
            onClick={handleAuthToggle}
          >
            {currentUser ? 'Logout' : 'Login / Register'}
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Button 
              variant={currentUser ? "outline" : "primary"} 
              fullWidth 
              onClick={() => {
                handleAuthToggle();
                setIsMenuOpen(false);
              }}
            >
              {currentUser ? 'Logout' : 'Login / Register'}
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
