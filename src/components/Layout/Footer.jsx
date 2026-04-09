import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Phone, Mail, MapPin, Building2, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-grid grid grid-cols-3">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">
              <Droplet size={20} color="white" fill="white" />
            </span>
            Blood<span style={{ color: 'var(--primary)' }}>Connect</span>
          </Link>
          <p className="footer-text">
            Connecting blood donors with hospitals and patients in need. Simple, fast, bilingual, and secure. Your donation can save a life.
          </p>
          <Link to="/hospital-login" className="footer-hospital-link">
            <Building2 size={14} /> Hospital Portal
          </Link>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3 className="footer-heading">Quick Links</h3>
          <ul>
            <li><Link to="/search">Find Blood Donors</Link></li>
            <li><Link to="/register">Donate Blood</Link></li>
            <li><Link to="/request">Request Blood</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/hospital-login">Hospital Login</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3 className="footer-heading">Contact Us</h3>
          <ul>
            <li><MapPin size={16} /> 123 Health Ave, Chennai, Tamil Nadu</li>
            <li><Phone size={16} /> +91 98765 43210</li>
            <li><Mail size={16} /> support@bloodconnect.org</li>
          </ul>

          <div style={{ marginTop: '1.5rem' }}>
            <h3 className="footer-heading">Language</h3>
            <div className="footer-lang-pills">
              <button
                className={`footer-lang-pill ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >EN</button>
              <button
                className={`footer-lang-pill ${language === 'ta' ? 'active' : ''}`}
                onClick={() => setLanguage('ta')}
              >தமிழ்</button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Made with <Heart size={13} color="#C9184A" fill="#C9184A" /> to save lives
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
