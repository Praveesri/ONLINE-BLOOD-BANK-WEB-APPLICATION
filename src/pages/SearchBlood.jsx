import React, { useState } from 'react';
import { Search, MapPin, Phone, Droplet } from 'lucide-react';
import { useBloodBank } from '../context/BloodBankContext';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const SearchBlood = () => {
  const { donors } = useBloodBank();
  const [filterGroup, setFilterGroup] = useState('');
  const [filterCity, setFilterCity] = useState('');

  const bloodGroups = [
    { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
  ];

  const filteredDonors = donors.filter(donor => {
    const matchGroup = filterGroup ? donor.bloodGroup === filterGroup : true;
    const matchCity = filterCity ? donor.location.toLowerCase().includes(filterCity.toLowerCase()) : true;
    const matchStatus = donor.status === 'Available';
    return matchGroup && matchCity && matchStatus;
  });

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <h1 className="section-title">Find Blood Donors</h1>
        
        {/* Search Filters */}
        <Card style={{ marginBottom: '3rem', background: 'var(--primary-light)', border: 'none' }}>
          <div className="grid grid-cols-3" style={{ alignItems: 'flex-end', gap: '1rem' }}>
            <Input 
              label="Blood Group" 
              id="filterGroup" 
              type="select"
              options={bloodGroups}
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              style={{ marginBottom: 0 }}
            />
            <Input 
              label="City" 
              id="filterCity" 
              placeholder="e.g. New York"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              style={{ marginBottom: 0 }}
            />
            <Button size="lg" style={{ marginBottom: '1.25rem', height: '50px' }} fullWidth onClick={() => {}}>
              <Search size={20} /> Search Mentions
            </Button>
          </div>
        </Card>

        {/* Results list */}
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--secondary)' }}>
          {filteredDonors.length} Donor(s) Available
        </h3>

        {filteredDonors.length > 0 ? (
          <div className="grid grid-cols-2">
            {filteredDonors.map(donor => (
              <Card key={donor.id} hoverable>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--primary)', color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {donor.bloodGroup}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--secondary)' }}>{donor.name}</h3>
                    <span style={{ fontSize: '0.85rem', padding: '0.2rem 0.5rem', background: '#d1fae5', color: '#065f46', borderRadius: '4px' }}>
                      {donor.status}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} /> {donor.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Droplet size={16} color="var(--primary)" /> Age: {donor.age} yrs
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                   <Button fullWidth variant="outline">
                     <Phone size={16} /> Contact: {donor.contact}
                   </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--radius-lg)' }}>
            <Droplet size={48} color="var(--border)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--text-muted)' }}>No available donors found matching your criteria.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchBlood;
