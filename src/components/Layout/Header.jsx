import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Droplet, Building2 } from 'lucide-react';
import { useBloodBank } from '../../context/BloodBankContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../UI/Button';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, loginMode } = useBloodBank();
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('search'), path: '/search' },
    { name: t('register'), path: '/register' },
    { name: 'Request Blood', path: '/request' },
    { name: t('about'), path: '/about' },
    { name: t('contact'), path: '/contact' },
  ];

  if (currentUser?.role === 'admin') {
    navLinks.push({ name: t('admin'), path: '/admin' });
  } else if (currentUser?.role === 'user') {
    navLinks.push({ name: t('dashboard'), path: '/dashboard' });
  } else if (currentUser?.role === 'hospital') {
    navLinks.push({ name: 'Hospital Dashboard', path: '/hospital-dashboard' });
  }

  const handleLogout = () => {
    loginMode(null);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">
            <Droplet size={22} color="#fff" fill="#fff" />
          </span>
          <span>Blood<span style={{ color: 'var(--primary)' }}>Connect</span></span>
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

          {/* Hospital Login Link */}
          {!currentUser && (
            <Link to="/hospital-login" className="nav-link-hospital">
              <Building2 size={14} />
              {t('hospitalLogin')}
            </Link>
          )}

          {/* Language Switcher */}
          <div className="lang-switcher">
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button
              className={`lang-btn ${language === 'ta' ? 'active' : ''}`}
              onClick={() => setLanguage('ta')}
            >
              தமிழ்
            </button>
          </div>

          {/* Auth Button */}
          {currentUser ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              {t('logout')} ({currentUser.name})
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
              {t('register')}
            </Button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
          {!currentUser && (
            <li>
              <Link
                to="/hospital-login"
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
                style={{ color: 'var(--primary)', fontWeight: 600 }}
              >
                🏥 {t('hospitalLogin')}
              </Link>
            </li>
          )}
          <li style={{ marginTop: '0.5rem' }}>
            {currentUser ? (
              <Button variant="outline" fullWidth onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                {t('logout')}
              </Button>
            ) : (
              <Button variant="primary" fullWidth onClick={() => { navigate('/register'); setIsMenuOpen(false); }}>
                {t('register')}
              </Button>
            )}
          </li>
        </ul>
        {/* Mobile Language Switcher */}
        <div className="mobile-lang-switcher">
          <Button
            variant={language === 'en' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setLanguage('en')}
          >EN</Button>
          <Button
            variant={language === 'ta' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setLanguage('ta')}
          >தமிழ்</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
