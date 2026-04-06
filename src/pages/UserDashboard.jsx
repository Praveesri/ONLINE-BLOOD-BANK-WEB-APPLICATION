import React from 'react';
import { useBloodBank } from '../context/BloodBankContext';
import { Navigate } from 'react-router-dom';
import Card from '../components/UI/Card';
import { User, Activity, Clock } from 'lucide-react';

const UserDashboard = () => {
  const { currentUser, requests } = useBloodBank();

  // Protect route
  if (!currentUser || currentUser.role !== 'user') {
    return (
      <div className="section container text-center">
        <h2>Access Denied. Please login as User.</h2>
      </div>
    );
  }

  // Mock filtering user's own requests
  const myRequests = requests.slice(0, 1); // just showing latest one as a demo

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <h1 className="section-title">User Dashboard</h1>
        
        <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
          <Card className="col-span-1 border-top-primary">
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--border)', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <User size={40} color="var(--text-muted)" />
              </div>
              <h3>{currentUser.name}</h3>
              <p className="text-muted">Blood Group: B+</p>
              <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#d1fae5', color: '#065f46', borderRadius: '4px' }}>
                Status: Eligible to Donate
              </div>
            </div>
          </Card>
          
          <Card className="..." style={{ gridColumn: 'span 2' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              My Recent Activities
            </h3>
            
            {myRequests.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {myRequests.map(req => (
                  <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                       <Activity color="var(--danger)" />
                       <div>
                         <strong>Blood Request ({req.bloodGroup})</strong>
                         <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>For {req.patientName} at {req.hospital}</p>
                       </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.85rem', padding: '0.3rem 0.6rem', borderRadius: '12px', background: req.status === 'Pending' ? '#fef3c7' : '#d1fae5', color: req.status === 'Pending' ? '#92400e' : '#065f46' }}>
                         <Clock size={12} style={{ display: 'inline', marginRight: '4px' }}/> 
                         {req.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No recent activities found.</p>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
