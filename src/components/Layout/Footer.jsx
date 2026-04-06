import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid grid grid-cols-3">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <Droplet size={24} color="#E63946" fill="#E63946" />
            <span>BloodConnect</span>
          </Link>
          <p className="footer-text">
            Connecting blood donors with those in need. Simple, fast, and secure. Your drop of blood can save a life.
          </p>
        </div>

        <div className="footer-links">
          <h3 className="footer-heading">Quick Links</h3>
          <ul>
            <li><Link to="/search">Find Blood</Link></li>
            <li><Link to="/register">Donate Blood</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3 className="footer-heading">Contact Us</h3>
          <ul>
            <li><MapPin size={18} /> 123 Health Ave, Medical City, NY</li>
            <li><Phone size={18} /> +1 (555) 123-4567</li>
            <li><Mail size={18} /> support@bloodconnect.org</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
