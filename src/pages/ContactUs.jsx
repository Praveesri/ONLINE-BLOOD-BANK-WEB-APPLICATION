import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Building2 } from 'lucide-react';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import './ContactUs.css';

const contactItems = [
  { icon: Phone, title: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: Mail, title: 'Email', value: 'support@bloodconnect.org', href: 'mailto:support@bloodconnect.org' },
  { icon: MapPin, title: 'Location', value: '123 Health Avenue, Chennai, Tamil Nadu – 600001', href: null },
  { icon: Clock, title: 'Hours', value: '24/7 Emergency Support Available', href: null },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (f) => (e) => setFormData({ ...formData, [f]: e.target.value });

  if (submitted) {
    return (
      <div className="contact-page animate-fade-in section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle2 size={40} color="var(--success)" />
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', color: 'var(--secondary)', marginBottom: '0.75rem' }}>Message Sent!</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 400, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Thank you for reaching out, <strong>{formData.name}</strong>. Our team will respond to <strong>{formData.email}</strong> within 24 hours.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">Send Another Message</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page animate-fade-in">

      {/* Hero */}
      <div className="contact-hero">
        <div className="container contact-hero-inner">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,24,74,0.18)', color: '#ff9fb3', borderRadius: 'var(--radius-full)', padding: '0.4rem 1.2rem', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Mail size={13} /> Contact Us
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#f0f4f8', lineHeight: 1.1, marginBottom: '0.75rem' }}>
            We're Here to Help
          </h1>
          <p style={{ color: 'rgba(240,244,248,0.6)', fontSize: '1rem' }}>
            Questions, partnerships, or emergency support — reach out anytime.
          </p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--background)' }}>
        <div className="container">
          <div className="contact-layout">

            {/* Left: Info */}
            <div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>Get In Touch</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7, fontSize: '0.93rem' }}>
                Our support team is available 24/7 for blood-related emergencies. For general inquiries, we respond within 24 hours.
              </p>

              <div className="contact-info-list">
                {contactItems.map(({ icon: Icon, title, value, href }, i) => (
                  <div key={i} className="contact-info-item">
                    <div className="contact-info-icon">
                      <Icon size={20} color="var(--primary)" />
                    </div>
                    <div>
                      <div className="contact-info-title">{title}</div>
                      {href ? (
                        <a href={href} className="contact-info-value contact-info-link">{value}</a>
                      ) : (
                        <div className="contact-info-value">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hospital Contact */}
              <div className="contact-hospital-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
                  <Building2 size={16} /> For Hospitals
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  To get your hospital registered on our platform and access full donor records, please email us at <strong>hospitals@bloodconnect.org</strong> with your registration documents.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <Card>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.35rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.5rem' }}>
                Send a Message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2">
                  <Input
                    label="Full Name"
                    id="contact-name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={update('name')}
                  />
                  <Input
                    label="Email Address"
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={update('email')}
                  />
                </div>
                <Input
                  label="Subject"
                  id="contact-subject"
                  placeholder="e.g. Blood request, Hospital partnership"
                  required
                  value={formData.subject}
                  onChange={update('subject')}
                />
                <Input
                  label="Your Message"
                  id="contact-message"
                  type="textarea"
                  placeholder="Describe your query in detail..."
                  required
                  rows={5}
                  value={formData.message}
                  onChange={update('message')}
                />
                <Button type="submit" fullWidth size="lg">
                  <Send size={17} /> Send Message
                </Button>
              </form>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
