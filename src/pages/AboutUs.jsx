import React from 'react';
import { Target, Eye, Users, Droplet, Shield, Volume2, Globe } from 'lucide-react';
import Card from '../components/UI/Card';
import './AboutUs.css';

const stats = [
  { num: '50K+', label: 'Donors Registered' },
  { num: '120+', label: 'Partner Hospitals' },
  { num: '10K+', label: 'Lives Saved' },
  { num: '2', label: 'Languages Supported' },
];

const pillars = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To create a reliable, accessible, bilingual network of voluntary blood donors ensuring timely and safe blood transfusion for everyone in need — from urban hospitals to rural communities.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    desc: 'A community where blood donation is a celebrated habit, and no life is lost due to blood shortage. We envision a Tamil Nadu and India free from preventable blood-shortage fatalities.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'We protect donor data rigorously. Personal contact details and medical history are visible only to verified hospital authorities, never to the general public.',
  },
  {
    icon: Volume2,
    title: 'Voice Accessible',
    desc: 'Every input field has voice guidance in English and Tamil, helping illiterate users and rural communities register and navigate the platform independently.',
  },
  {
    icon: Globe,
    title: 'Bilingual Support',
    desc: 'The platform supports both English and Tamil, removing language barriers and making our life-saving service accessible to all communities across Tamil Nadu.',
  },
  {
    icon: Users,
    title: 'Our Values',
    desc: 'Humanity, Commitment, and Safety drive everything we do. We treat every donor and patient with dignity and care, working tirelessly to connect hearts.',
  },
];

const AboutUs = () => {
  return (
    <div className="about-page animate-fade-in">

      {/* Hero Banner */}
      <div className="about-hero">
        <div className="container about-hero-inner">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,24,74,0.18)', color: '#ff9fb3', borderRadius: 'var(--radius-full)', padding: '0.4rem 1.2rem', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Droplet size={13} fill="currentColor" /> About BloodConnect
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#f0f4f8', lineHeight: 1.1, marginBottom: '1rem' }}>
            Connecting Hearts,<br />
            <span style={{ color: 'var(--primary)' }}>Saving Lives.</span>
          </h1>
          <p style={{ color: 'rgba(240,244,248,0.65)', fontSize: '1.05rem', maxWidth: 560, lineHeight: 1.75 }}>
            BloodConnect is a non-profit initiative dedicated to solving the critical shortage of blood in emergencies. Our secure, bilingual platform bridges the gap between generous donors and patients in need.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="about-stats-row">
            {stats.map((s, i) => (
              <div key={i} className="about-stat-item">
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <section className="section" style={{ background: 'var(--background)' }}>
        <div className="container">
          <h2 className="section-title">What Drives Us</h2>
          <span className="section-title-line" />
          <p className="section-subtitle" style={{ marginTop: '1.5rem' }}>
            Six pillars that define our approach to making blood donation accessible, safe, and impactful.
          </p>
          <div className="grid grid-cols-3" style={{ marginTop: '3rem' }}>
            {pillars.map(({ icon: Icon, title, desc }, i) => (
              <Card key={i} hoverable style={{ textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--primary-light)', border: '2px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <Icon size={26} color="var(--primary)" />
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.65rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
