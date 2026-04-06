import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBloodBank } from '../context/BloodBankContext';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const RequestBlood = () => {
  const { addRequest } = useBloodBank();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    hospital: '',
    contact: '',
    location: '',
    urgency: 'Medium'
  });

  const bloodGroups = [
    { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
  ];

  const urgencyOptions = [
    { value: 'Low', label: 'Low - Needed in next few days' },
    { value: 'Medium', label: 'Medium - Needed tomorrow' },
    { value: 'High', label: 'High - Emergency (Immediate)' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addRequest(formData);
    alert('Blood Request Submitted Successfully. We will notify nearby donors.');
    navigate('/');
  };

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <h1 className="section-title" style={{ color: 'var(--danger)' }}>Emergency Blood Request</h1>
        <Card className="form-card" style={{ maxWidth: '700px', margin: '0 auto', borderTop: '4px solid var(--danger)' }}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2">
              <Input 
                label="Patient Name" 
                id="patientName" 
                required 
                value={formData.patientName}
                onChange={(e) => setFormData({...formData, patientName: e.target.value})}
              />
              <Input 
                label="Required Blood Group" 
                id="bloodGroup" 
                type="select"
                options={bloodGroups}
                required 
                value={formData.bloodGroup}
                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
              />
            </div>

            <Input 
              label="Urgency Level" 
              id="urgency" 
              type="select"
              options={urgencyOptions}
              required 
              value={formData.urgency}
              onChange={(e) => setFormData({...formData, urgency: e.target.value})}
            />

            <Input 
              label="Hospital Name & Address" 
              id="hospital" 
              required 
              value={formData.hospital}
              onChange={(e) => setFormData({...formData, hospital: e.target.value})}
            />

            <div className="grid grid-cols-2">
              <Input 
                label="Contact Number" 
                id="contact" 
                type="tel"
                required 
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
              />
              <Input 
                label="City/Area" 
                id="location" 
                required 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <Button type="submit" variant="danger" fullWidth size="lg" style={{ marginTop: '1rem' }}>
              Submit Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RequestBlood;
