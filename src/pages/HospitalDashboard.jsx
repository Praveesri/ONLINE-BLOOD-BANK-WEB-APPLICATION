import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Droplet, Users, Heart, Activity, Search,
  Phone, MapPin, Shield, LogOut, Eye
} from 'lucide-react';
import { useBloodBank } from '../context/BloodBankContext';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const tabs = ['All Donors', 'Blood Requests', 'Statistics'];

const statColors = [
  { bg: 'rgba(201,24,74,0.08)', color: 'var(--primary)', icon: Droplet },
  { bg: 'rgba(13,148,136,0.08)', color: '#0D9488', icon: Users },
  { bg: 'rgba(245,158,11,0.08)', color: '#F59E0B', icon: Activity },
  { bg: 'rgba(59,130,246,0.08)', color: '#3B82F6', icon: Heart },
];

const statusBadge = (status) => {
  const colors = {
    'Available': { bg: '#d1fae5', color: '#065f46' },
    'Donated Recently': { bg: '#fef3c7', color: '#92400e' },
    'Pending': { bg: '#fef3c7', color: '#92400e' },
    'Fulfilled': { bg: '#d1fae5', color: '#065f46' },
    'Cancelled': { bg: '#fee2e2', color: '#991b1b' },
  };
  const s = colors[status] || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{ padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.73rem', fontWeight: 700, background: s.bg, color: s.color }}>
      {status}
    </span>
  );
};

const HospitalDashboard = () => {
  const { donors, requests, currentUser, loginMode, updateDonorStatus, updateRequestStatus } = useBloodBank();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQ, setSearchQ] = useState('');

  if (!currentUser || (currentUser.role !== 'hospital' && currentUser.role !== 'admin')) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', padding: '3rem' }}>
        <Shield size={56} color="var(--primary)" style={{ opacity: 0.3 }} />
        <h2 style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--secondary)' }}>Access Restricted</h2>
        <p style={{ color: 'var(--text-muted)' }}>Please login as a hospital to view this page.</p>
        <Button onClick={() => navigate('/hospital-login')}>Go to Hospital Login</Button>
      </div>
    );
  }

  const filteredDonors = donors.filter((d) =>
    !searchQ ||
    d.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    d.bloodGroup.toLowerCase().includes(searchQ.toLowerCase()) ||
    d.location.toLowerCase().includes(searchQ.toLowerCase())
  );

  const available = donors.filter(d => d.status === 'Available').length;
  const stats = [
    { label: 'Total Donors', value: donors.length },
    { label: 'Available Now', value: available },
    { label: 'Blood Requests', value: requests.length },
    { label: 'Pending Requests', value: requests.filter(r => r.status === 'Pending').length },
  ];

  return (
    <div className="animate-fade-in" style={{ background: 'var(--background)', minHeight: '100vh' }}>

      {/* Dashboard Header */}
      <div style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1b3352 100%)', padding: '2rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,24,74,0.15) 0%, transparent 70%)', top: -80, right: 50, pointerEvents: 'none' }} />
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(201,24,74,0.4)' }}>
                <Droplet size={24} color="white" fill="white" />
              </div>
              <div>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: '#f0f4f8', marginBottom: '0.15rem' }}>
                  Hospital Dashboard
                </h1>
                <p style={{ color: 'rgba(240,244,248,0.55)', fontSize: '0.85rem' }}>
                  Welcome, <strong style={{ color: '#ff9fb3' }}>{currentUser.name}</strong>
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(13,148,136,0.2)', color: '#2dd4bf', borderRadius: '999px', padding: '0.3rem 0.9rem', fontSize: '0.78rem', fontWeight: 600 }}>
                <Eye size={12} /> Full Access Mode
              </span>
              <Button variant="outline" size="sm" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(240,244,248,0.8)' }} onClick={() => { loginMode(null); navigate('/'); }}>
                <LogOut size={14} /> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>

        {/* Stats Grid */}
        <div className="grid grid-cols-4" style={{ marginBottom: '2rem' }}>
          {stats.map((stat, i) => {
            const { bg, color, icon: Icon } = statColors[i];
            return (
              <Card key={i} style={{ textAlign: 'center', background: bg, border: 'none', boxShadow: 'none', padding: '1.5rem 1rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                  <Icon size={22} color={color} />
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 800, color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem', fontWeight: 500 }}>{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '0.4rem', marginBottom: '1.75rem', width: 'fit-content' }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{ padding: '0.55rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', transition: 'var(--transition)', background: activeTab === i ? 'var(--primary)' : 'transparent', color: activeTab === i ? '#fff' : 'var(--text-muted)', boxShadow: activeTab === i ? '0 4px 12px var(--primary-glow)' : 'none' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── TAB 0: All Donors ── */}
        {activeTab === 0 && (
          <>
            {/* Search */}
            <div style={{ position: 'relative', marginBottom: '1.5rem', maxWidth: 400 }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search by name, blood group or city..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: 'var(--surface)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {['Blood Group', 'Name', 'Age / Gender', 'Contact', 'Area', 'Address', 'Medical', 'Status', 'Action'].map((h) => (
                      <th key={h} style={{ padding: '0.9rem 1rem', textAlign: 'left', borderBottom: '1.5px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredDonors.map((d, i) => (
                    <tr key={d.id} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)', fontSize: '0.88rem', transition: 'var(--transition)' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)'}
                    >
                      <td style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', color:'#fff', padding:'0.2rem 0.7rem', borderRadius:'var(--radius-full)', fontFamily:'Outfit,sans-serif', fontWeight:800, fontSize:'0.88rem' }}>{d.bloodGroup}</span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', borderBottom:'1px solid var(--border)', fontWeight:600, color:'var(--secondary)' }}>{d.name}</td>
                      <td style={{ padding: '0.85rem 1rem', borderBottom:'1px solid var(--border)', color:'var(--text-muted)' }}>{d.age} / {d.gender || '—'}</td>
                      <td style={{ padding: '0.85rem 1rem', borderBottom:'1px solid var(--border)' }}>
                        <a href={`tel:${d.contact}`} style={{ display:'flex', alignItems:'center', gap:'0.35rem', color:'var(--primary)', fontWeight:600, textDecoration:'none', fontSize:'0.85rem' }}>
                          <Phone size={13} />{d.contact}
                        </a>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', borderBottom:'1px solid var(--border)', color:'var(--text-muted)' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}><MapPin size={13} />{d.location}</div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', borderBottom:'1px solid var(--border)', color:'var(--text-muted)', maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.address || '—'}</td>
                      <td style={{ padding: '0.85rem 1rem', borderBottom:'1px solid var(--border)', color:'var(--text-muted)', maxWidth:130, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.medical || 'None'}</td>
                      <td style={{ padding: '0.85rem 1rem', borderBottom:'1px solid var(--border)' }}>{statusBadge(d.status)}</td>
                      <td style={{ padding: '0.85rem 1rem', borderBottom:'1px solid var(--border)' }}>
                        <select
                          value={d.status}
                          onChange={(e) => updateDonorStatus(d.id, e.target.value)}
                          style={{ fontSize:'0.8rem', padding:'0.3rem 0.6rem', border:'1.5px solid var(--border)', borderRadius:'var(--radius-sm)', background:'var(--surface)', cursor:'pointer' }}
                        >
                          <option>Available</option>
                          <option>Donated Recently</option>
                          <option>Unavailable</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredDonors.length === 0 && (
                <div style={{ textAlign:'center', padding:'2.5rem', color:'var(--text-muted)' }}>No matching donors found.</div>
              )}
            </div>
          </>
        )}

        {/* ── TAB 1: Blood Requests ── */}
        {activeTab === 1 && (
          <div>
            {requests.length === 0 ? (
              <div style={{ textAlign:'center', padding:'3rem', color:'var(--text-muted)' }}>No blood requests yet.</div>
            ) : (
              <div className="grid grid-cols-2">
                {requests.map((req) => (
                  <Card key={req.id} hoverable>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                      <div>
                        <h4 style={{ fontFamily:'Outfit,sans-serif', fontSize:'1.1rem', fontWeight:700, color:'var(--secondary)', marginBottom:'0.35rem' }}>{req.patientName}</h4>
                        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                          <span style={{ background:'linear-gradient(135deg,var(--primary),var(--primary-dark))', color:'#fff', padding:'0.2rem 0.7rem', borderRadius:'var(--radius-full)', fontFamily:'Outfit,sans-serif', fontWeight:800, fontSize:'0.88rem' }}>{req.bloodGroup}</span>
                          {statusBadge(req.status)}
                          {req.urgency && <span style={{ background:'rgba(245,158,11,0.1)', color:'#d97706', padding:'0.2rem 0.6rem', borderRadius:'var(--radius-full)', fontSize:'0.73rem', fontWeight:700 }}>🔥 {req.urgency}</span>}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize:'0.85rem', color:'var(--text-muted)', display:'flex', flexDirection:'column', gap:'0.3rem', marginBottom:'1rem' }}>
                      <div>🏥 {req.hospital}</div>
                      <div><MapPin size={13} style={{display:'inline', marginRight:'0.2rem'}} />{req.location}</div>
                      <div><Phone size={13} style={{display:'inline', marginRight:'0.2rem'}} />{req.contact}</div>
                    </div>
                    <div style={{ display:'flex', gap:'0.5rem' }}>
                      <button onClick={() => updateRequestStatus(req.id, 'Fulfilled')} style={{ flex:1, padding:'0.5rem', background:'var(--success-light)', color:'var(--success)', border:'none', borderRadius:'var(--radius-md)', fontWeight:600, cursor:'pointer', fontSize:'0.82rem' }}>✓ Fulfilled</button>
                      <button onClick={() => updateRequestStatus(req.id, 'Cancelled')} style={{ flex:1, padding:'0.5rem', background:'var(--primary-light)', color:'var(--primary)', border:'none', borderRadius:'var(--radius-md)', fontWeight:600, cursor:'pointer', fontSize:'0.82rem' }}>✗ Cancel</button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: Statistics ── */}
        {activeTab === 2 && (
          <Card>
            <h3 style={{ fontFamily:'Outfit,sans-serif', fontSize:'1.2rem', fontWeight:700, color:'var(--secondary)', marginBottom:'1.5rem' }}>Blood Group Distribution</h3>
            {['O+','O-','A+','A-','B+','B-','AB+','AB-'].map((bg) => {
              const count = donors.filter(d => d.bloodGroup === bg).length;
              const pct = donors.length ? Math.round((count / donors.length) * 100) : 0;
              return (
                <div key={bg} style={{ marginBottom:'1rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.35rem', fontSize:'0.88rem' }}>
                    <span style={{ fontWeight:700, color:'var(--secondary)' }}>{bg}</span>
                    <span style={{ color:'var(--text-muted)' }}>{count} donor{count !== 1 ? 's' : ''} ({pct}%)</span>
                  </div>
                  <div style={{ height:10, background:'var(--border)', borderRadius:'var(--radius-full)', overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${pct}%`, background:'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius:'var(--radius-full)', transition:'width 0.8s ease' }} />
                  </div>
                </div>
              );
            })}
          </Card>
        )}

      </div>
    </div>
  );
};

export default HospitalDashboard;
