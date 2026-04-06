import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBloodBank } from '../context/BloodBankContext';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const DonorRegistration = () => {
  const { addDonor } = useBloodBank();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    contact: '',
    location: ''
  });

  const bloodGroups = [
    { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.age < 18) {
      alert("You must be at least 18 years old to donate blood.");
      return;
    }
    addDonor(formData);
    alert('Registration successful! Thank you for becoming a donor.');
    navigate('/search');
  };

  return (
    <div className="animate-fade-in section" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container">
        <h1 className="section-title">Register as a Donor</h1>
        <Card className="form-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <Input 
              label="Full Name" 
              id="name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            
            <div className="grid grid-cols-2">
              <Input 
                label="Age" 
                id="age" 
                type="number" 
                min="18" 
                max="65"
                required 
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
              <Input 
                label="Blood Group" 
                id="bloodGroup" 
                type="select"
                options={bloodGroups}
                required 
                value={formData.bloodGroup}
                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
              />
            </div>

            <Input 
              label="Contact Number" 
              id="contact" 
              type="tel"
              required 
              value={formData.contact}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
            />

            <Input 
              label="Location (City)" 
              id="location" 
              required 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />

            <Button type="submit" fullWidth size="lg" className="mt-4">
              Register Now
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default DonorRegistration;
