import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Activity } from 'lucide-react';
import Button from '../components/UI/Button';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.regenext();
    // In a real app we would pass search params
    navigate('/search');
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Donate Blood, <br/> <span className="text-primary">Save Lives</span></h1>
            <p className="hero-subtitle">
              Every drop counts. Join our community of lifesavers today. Your donation can bring hope to those in need.
            </p>
            <div className="hero-actions">
              <Button size="lg" onClick={() => navigate('/register')}>Donate Blood</Button>
              <Button size="lg" variant="secondary" onClick={() => navigate('/request')}>Request Blood</Button>
            </div>
          </div>
          
          <div className="hero-image-wrapper">
             <div className="floating-card glass top-right">
               <Heart color="var(--primary)" fill="var(--primary)" size={24} />
               <span>10K+ Donors</span>
             </div>
             <div className="hero-shape"></div>
             <img 
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800" 
              alt="Blood Donation" 
              className="hero-image"
             />
             <div className="floating-card glass bottom-left">
               <Activity color="var(--success)" size={24} />
               <span>5K+ Lives Saved</span>
             </div>
          </div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="search-section section">
        <div className="container">
          <div className="search-box glass">
            <h2>Find Blood Donors Quickly</h2>
            <form className="search-form" onSubmit={(e) => { e.preventDefault(); navigate('/search'); }}>
              <select className="search-input" required defaultValue="">
                <option value="" disabled>Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              <input type="text" placeholder="Enter City or Location" className="search-input" required />
              <Button type="submit" size="lg">
                <Search size={20} /> Search
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
