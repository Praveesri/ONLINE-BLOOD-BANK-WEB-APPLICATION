import React, { useState } from 'react';
import { Search, MapPin, Droplet, Lock, Eye, EyeOff, Filter } from 'lucide-react';
import { useBloodBank } from '../context/BloodBankContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const bloodGroups = [
  { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
];

const statusColors = {
  'Available': { bg: '#d1fae5', text: '#065f46' },
  'Donated Recently': { bg: '#fef3c7', text: '#92400e' },
};

const SearchBlood = () => {
  const { donors, currentUser } = useBloodBank();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filterGroup, setFilterGroup] = useState('');
  const [filterCity, setFilterCity] = useState('');

  const isHospital = currentUser?.role === 'hospital' || currentUser?.role === 'admin';

  const filteredDonors = donors.filter((donor) => {
    const matchGroup = filterGroup ? donor.bloodGroup === filterGroup : true;
    const matchCity = filterCity ? donor.location.toLowerCase().includes(filterCity.toLowerCase()) : true;
    return matchGroup && matchCity;
  });

  return (
    <div className="animate-fade-in section" style={{ background: 'var(--background)' }}>
      <div className="container">

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', padding: '0.4rem 1.2rem', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Droplet size={13} fill="currentColor" /> Search Donors
          </div>
          <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>{t('findBlood')}</h1>
          <p className="section-subtitle">Search by blood group and location to find available donors near you.</p>
        </div>

        {/* Privacy Notice for public users */}
        {!isHospital && (
          <div style={{ background: 'rgba(59,130,246,0.07)', border: '1.5px solid rgba(59,130,246,0.2)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.88rem', color: '#1d4ed8' }}>
            <Lock size={18} style={{ flexShrink: 0 }} />
            <span>
              <strong>Public view:</strong> Donor names, contact numbers, addresses, and medical history are <strong>hidden</strong> for privacy.
              {' '}<button onClick={() => navigate('/hospital-login')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Hospital Login</button> to view full details.
            </span>
          </div>
        )}

        {/* Filter Card */}
        <Card style={{ marginBottom: '2.5rem', background: 'var(--surface)', border: '1.5px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--secondary)', fontWeight: 700 }}>
            <Filter size={18} color="var(--primary)" /> Filter Donors
          </div>
          <div className="grid grid-cols-3" style={{ alignItems: 'flex-end' }}>
            <Input
              label="Blood Group"
              id="filterGroup"
              type="select"
              options={bloodGroups}
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              voiceKey="bloodGroup"
              style={{ marginBottom: 0 }}
            />
            <Input
              label="City / Area"
              id="filterCity"
              placeholder="e.g. Chennai"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              voiceKey="liveLocation"
              style={{ marginBottom: 0 }}
            />
            <div style={{ marginBottom: '1.35rem' }}>
              <Button
                fullWidth
                size="md"
                style={{ height: '47px' }}
                onClick={() => {}}
              >
                <Search size={16} /> {t('searchDonors')}
              </Button>
            </div>
          </div>
        </Card>

        {/* Results header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--secondary)', fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 800, marginRight: '0.3rem' }}>{filteredDonors.length}</span>
            donor{filteredDonors.length !== 1 ? 's' : ''} found
          </h3>
          {isHospital && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--success-light)', color: 'var(--success)', borderRadius: 'var(--radius-full)', padding: '0.35rem 0.9rem', fontSize: '0.78rem', fontWeight: 600 }}>
              <Eye size={13} /> Full Details Visible
            </span>
          )}
        </div>

        {/* Donor cards */}
        {filteredDonors.length > 0 ? (
          <div className="grid grid-cols-2">
            {filteredDonors.map((donor) => {
              const statusStyle = statusColors[donor.status] || { bg: '#f3f4f6', text: '#374151' };
              return (
                <Card key={donor.id} hoverable>
                  {/* Card Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.1rem', boxShadow: '0 4px 12px var(--primary-glow)', flexShrink: 0 }}>
                      {donor.bloodGroup}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* PUBLIC: show anonymous name | HOSPITAL: show real name */}
                      <h3 style={{ fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.3rem' }}>
                        {isHospital ? donor.name : 'Anonymous Donor'}
                      </h3>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, background: statusStyle.bg, color: statusStyle.text }}>
                          {donor.status}
                        </span>
                        {donor.gender && (
                          <span style={{ padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(59,130,246,0.1)', color: '#1d4ed8' }}>
                            {donor.gender}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Public Info */}
                  <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={15} color="var(--primary)" />
                      <span>{donor.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Droplet size={15} color="var(--primary)" />
                      <span>Age: {donor.age} yrs</span>
                    </div>
                  </div>

                  {/* Hospital-only info */}
                  {isHospital ? (
                    <div style={{ background: 'var(--success-light)', borderRadius: 'var(--radius-md)', padding: '1rem', fontSize: '0.83rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div><strong style={{ color: 'var(--secondary)' }}>📞 Contact:</strong> {donor.contact}</div>
                      <div><strong style={{ color: 'var(--secondary)' }}>🏠 Address:</strong> {donor.address}</div>
                      <div><strong style={{ color: 'var(--secondary)' }}>💉 History:</strong> {donor.history || 'N/A'}</div>
                      <div><strong style={{ color: 'var(--secondary)' }}>🩺 Medical:</strong> {donor.medical || 'None'}</div>
                    </div>
                  ) : (
                    <div style={{ background: 'rgba(59,130,246,0.05)', border: '1px dashed rgba(59,130,246,0.25)', borderRadius: 'var(--radius-md)', padding: '0.9rem', fontSize: '0.82rem', color: '#3b82f6', textAlign: 'center' }}>
                      <Lock size={14} style={{ display: 'inline', marginRight: '0.35rem' }} />
                      Contact &amp; medical details visible to hospitals only.{' '}
                      <button onClick={() => navigate('/hospital-login')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Login →</button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1.5px dashed var(--border)' }}>
            <Droplet size={52} color="var(--border)" style={{ margin: '0 auto 1.25rem', display: 'block' }} />
            <h3 style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--secondary)', marginBottom: '0.5rem' }}>No Donors Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Try changing your filters or{' '}
              <button onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>register as a donor</button>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchBlood;
