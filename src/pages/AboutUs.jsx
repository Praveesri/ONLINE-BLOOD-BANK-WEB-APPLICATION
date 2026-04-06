import React from 'react';
import './AboutUs.css';
import { Target, Eye, Users } from 'lucide-react';
import Card from '../components/UI/Card';

const AboutUs = () => {
  return (
    <div className="about-page animate-fade-in section">
      <div className="container">
        <h1 className="section-title">About BloodConnect</h1>
        
        <div className="about-intro">
          <p>
            BloodConnect is a non-profit initiative dedicated to solving the critical shortage of blood in emergencies.
            Our platform bridges the gap between generous blood donors and patients in need, ensuring that no one suffers due to a lack of timely volunteers.
          </p>
        </div>

        <div className="about-grid grid grid-cols-3">
          <Card className="about-card" hoverable>
            <div className="about-icon-wrapper">
               <Target size={32} color="var(--primary)" />
            </div>
            <h3>Our Mission</h3>
            <p>
              To create a reliable, accessible, and vast network of voluntary blood donors ensuring timely and safe blood transfusion for everyone in need.
            </p>
          </Card>

          <Card className="about-card" hoverable>
             <div className="about-icon-wrapper">
               <Eye size={32} color="var(--primary)" />
            </div>
            <h3>Our Vision</h3>
            <p>
              A community where blood donation is a celebrated habit and fatalities due to blood shortage are completely eliminated.
            </p>
          </Card>

          <Card className="about-card" hoverable>
             <div className="about-icon-wrapper">
               <Users size={32} color="var(--primary)" />
            </div>
            <h3>Our Values</h3>
            <p>
              We believe in Humanity, Commitment, and Safety. We value privacy and maintain strict confidentiality standards for all our users.
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
