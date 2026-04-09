import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Droplet, Heart, Shield, Search, UserPlus,
  Activity, Phone, Clock, ChevronRight
} from 'lucide-react';
import Button from '../components/UI/Button';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const steps = [
  { icon: '📝', num: '01', title: 'Register as Donor', desc: 'Fill in your details including blood group, address, and medical history in seconds.' },
  { icon: '🔍', num: '02', title: 'Search & Match', desc: 'Hospitals and patients can search for available donors in their area by blood group.' },
  { icon: '💉', num: '03', title: 'Save a Life', desc: 'Connect with the hospital and donate blood to help save precious human lives.' },
];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="home-page animate-fade-in">

      {/* ──── HERO ──── */}
      <section className="hero">
        <div className="container hero-container">

          {/* Left Content */}
          <div className="hero-content">
            <div className="hero-tag">
              <Heart size={13} fill="currentColor" /> Blood Donation Network
            </div>
            <h1 className="hero-title">
              Donate Blood.
              <span className="highlight">Save Lives.</span>
            </h1>
            <p className="hero-subtitle">
              Every 2 seconds someone needs blood. Register as a donor, or find a donor near you through our secure, bilingual platform available in English and Tamil.
            </p>
            <div className="hero-actions">
              <Button size="lg" onClick={() => navigate('/register')}>
                <UserPlus size={18} /> {t('register')} Now
              </Button>
              <Button size="lg" variant="outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }} onClick={() => navigate('/search')}>
                <Search size={18} /> {t('search')}
              </Button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat-item">
                <div className="hero-stat-num">50K+</div>
                <div className="hero-stat-label">Donors Registered</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-num">120+</div>
                <div className="hero-stat-label">Partner Hospitals</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-num">10K+</div>
                <div className="hero-stat-label">Lives Saved</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hero-visual">
            <div className="hero-circle">
              <div className="hero-circle-inner">
                <Droplet size={110} className="hero-blood-icon animate-heartbeat" fill="rgba(201,24,74,0.6)" color="#C9184A" />
              </div>
            </div>
            <div className="hero-badge hero-badge-top">
              <div className="hero-badge-icon" style={{ background: 'rgba(201,24,74,0.3)' }}>
                <Activity size={18} color="#ff6b8a" />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Real-time</div>
                <div>Donor Tracking</div>
              </div>
            </div>
            <div className="hero-badge hero-badge-bottom">
              <div className="hero-badge-icon" style={{ background: 'rgba(13,148,136,0.3)' }}>
                <Shield size={18} color="#2dd4bf" />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>100% Secure</div>
                <div>Hospital Verified</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ──── BLOOD GROUPS ──── */}
      <section className="blood-groups-section">
        <div className="container">
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            We support all blood types
          </p>
          <div className="blood-groups-grid">
            {bloodGroups.map((bg) => (
              <Link to="/search" key={bg} className="blood-group-pill">
                <span className="blood-group-type">{bg}</span>
                <span className="blood-group-label">Find Donors</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──── HOW IT WORKS ──── */}
      <section className="how-it-works section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Simple steps to save a life or find the blood you need</p>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{step.num}</div>
                <div className="step-icon">{step.icon}</div>
                <div className="step-title">{step.title}</div>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── QUICK SEARCH ──── */}
      <section className="quick-search-section">
        <div className="container">
          <div className="quick-search-inner">
            <div className="quick-search-title">
              <Search size={20} color="var(--primary)" />
              Quick Donor Search
            </div>
            <div style={{ flex: 1 }}>
              <select
                className="input-field"
                style={{ marginBottom: 0 }}
                defaultValue=""
                onChange={(e) => {}}
              >
                <option value="" disabled>Select Blood Group</option>
                {bloodGroups.map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                className="input-field"
                placeholder="Enter city or area..."
                style={{ marginBottom: 0 }}
              />
            </div>
            <Button size="md" onClick={() => navigate('/search')} style={{ height: '47px', flexShrink: 0 }}>
              <Search size={16} /> Search
            </Button>
          </div>
        </div>
      </section>

      {/* ──── CTA ──── */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Every Drop Counts. Be a Hero Today.</h2>
          <p className="cta-subtitle">
            Join thousands of registered donors and make a difference in someone's life. Registration takes under 2 minutes.
          </p>
          <div className="cta-actions">
            <Button
              size="lg"
              style={{ background: '#fff', color: 'var(--primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
              onClick={() => navigate('/register')}
            >
              <UserPlus size={18} /> Register as Donor
            </Button>
            <Button
              size="lg"
              style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.5)', border: '2px solid' }}
              onClick={() => navigate('/hospital-login')}
            >
              <Shield size={18} /> Hospital Login
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
