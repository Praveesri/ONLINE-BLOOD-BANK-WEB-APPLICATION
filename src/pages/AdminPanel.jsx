import React, { useState } from 'react';
import { useBloodBank } from '../context/BloodBankContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Users, AlertCircle, Edit, Trash2 } from 'lucide-react';

const AdminPanel = () => {
  const { currentUser, donors, updateDonorStatus, deleteDonor, requests, updateRequestStatus, deleteRequest } = useBloodBank();
  const [activeTab, setActiveTab] = useState('donors');

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="section container text-center">
        <h2>Access Denied. Admin Privileges Required.</h2>
      </div>
    );
  }

  return (
    <div className="animate-fade-in section" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <h1 className="section-title">Admin Control Panel</h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-3" style={{ marginBottom: '3rem' }}>
          <Card hoverable style={{ borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Donors</p>
                <h2 style={{ fontSize: '2rem', color: 'var(--secondary)' }}>{donors.length}</h2>
              </div>
              <div style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: '50%' }}>
                <Users color="var(--primary)" size={24} />
              </div>
            </div>
          </Card>
          <Card hoverable style={{ borderLeft: '4px solid var(--danger)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Pending Requests</p>
                <h2 style={{ fontSize: '2rem', color: 'var(--secondary)' }}>{requests.filter(r => r.status === 'Pending').length}</h2>
              </div>
              <div style={{ background: 'rgba(230, 57, 70, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                <AlertCircle color="var(--danger)" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <Button 
            variant={activeTab === 'donors' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('donors')}
          >
            Manage Donors
          </Button>
          <Button 
            variant={activeTab === 'requests' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('requests')}
          >
            Manage Requests
          </Button>
        </div>

        {/* Content Area */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {activeTab === 'donors' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
                  <tr>
                    <th style={{ padding: '1rem' }}>Name</th>
                    <th style={{ padding: '1rem' }}>Blood Group</th>
                    <th style={{ padding: '1rem' }}>City</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map(donor => (
                    <tr key={donor.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem' }}><strong>{donor.name}</strong><br/><span className="text-muted" style={{ fontSize: '0.85rem' }}>{donor.contact}</span></td>
                      <td style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>{donor.bloodGroup}</td>
                      <td style={{ padding: '1rem' }}>{donor.location}</td>
                      <td style={{ padding: '1rem' }}>
                        <select 
                          value={donor.status} 
                          onChange={(e) => updateDonorStatus(donor.id, e.target.value)}
                          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        >
                          <option value="Available">Available</option>
                          <option value="Donated Recently">Donated Recently</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <Button variant="outline" size="sm" onClick={() => deleteDonor(donor.id)} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {donors.length === 0 && <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>No donors found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'requests' && (
             <div style={{ overflowX: 'auto' }}>
             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
               <thead style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
                 <tr>
                   <th style={{ padding: '1rem' }}>Patient Name</th>
                   <th style={{ padding: '1rem' }}>Required Group</th>
                   <th style={{ padding: '1rem' }}>Urgency</th>
                   <th style={{ padding: '1rem' }}>Status</th>
                   <th style={{ padding: '1rem' }}>Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {requests.map(req => (
                   <tr key={req.id} style={{ borderBottom: '1px solid var(--border)' }}>
                     <td style={{ padding: '1rem' }}><strong>{req.patientName}</strong><br/><span className="text-muted" style={{ fontSize: '0.85rem' }}>{req.hospital}</span></td>
                     <td style={{ padding: '1rem', color: 'var(--danger)', fontWeight: 'bold' }}>{req.bloodGroup}</td>
                     <td style={{ padding: '1rem' }}>
                       <span style={{ 
                         padding: '0.3rem 0.6rem', 
                         borderRadius: '4px', 
                         fontSize: '0.85rem',
                         background: req.urgency === 'High' ? '#fee2e2' : req.urgency === 'Medium' ? '#fef3c7' : '#e0e7ff',
                         color: req.urgency === 'High' ? '#991b1b' : req.urgency === 'Medium' ? '#92400e' : '#3730a3'
                       }}>{req.urgency}</span>
                     </td>
                     <td style={{ padding: '1rem' }}>
                       <select 
                         value={req.status} 
                         onChange={(e) => updateRequestStatus(req.id, e.target.value)}
                         style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                       >
                         <option value="Pending">Pending</option>
                         <option value="Approved">Approved</option>
                         <option value="Fulfilled">Fulfilled</option>
                         <option value="Rejected">Rejected</option>
                       </select>
                     </td>
                     <td style={{ padding: '1rem' }}>
                        <Button variant="outline" size="sm" onClick={() => deleteRequest(req.id)} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                          <Trash2 size={16} />
                        </Button>
                     </td>
                   </tr>
                 ))}
                 {requests.length === 0 && <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>No requests found.</td></tr>}
               </tbody>
             </table>
           </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
