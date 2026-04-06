import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out. We will get back to you soon!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page animate-fade-in section">
      <div className="container">
        <h1 className="section-title">Contact Us</h1>
        
        <div className="contact-container">
          <Card className="contact-info-card">
            <h2>Get In Touch</h2>
            <p className="contact-desc">
              Have questions about donating blood or need help with our platform? Our support team is here to help!
            </p>
            
            <ul className="contact-list">
              <li>
                <div className="icon-box"><Phone size={20} color="var(--primary)" /></div>
                <div>
                  <strong>Phone</strong>
                  <p>+1 (555) 123-4567</p>
                </div>
              </li>
              <li>
                <div className="icon-box"><Mail size={20} color="var(--primary)" /></div>
                <div>
                  <strong>Email</strong>
                  <p>support@bloodconnect.org</p>
                </div>
              </li>
              <li>
                <div className="icon-box"><MapPin size={20} color="var(--primary)" /></div>
                <div>
                  <strong>Location</strong>
                  <p>123 Health Ave, Medical City, NY</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="contact-form-card">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <Input 
                label="Full Name" 
                id="name"
                required 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <Input 
                label="Email Address" 
                id="email"
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <Input 
                label="Your Message" 
                id="message"
                type="textarea" 
                required 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              <Button type="submit" fullWidth size="lg">Send Message</Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
