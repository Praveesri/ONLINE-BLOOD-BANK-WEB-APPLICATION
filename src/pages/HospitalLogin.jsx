import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, Eye, EyeOff, Droplet, ShieldCheck } from 'lucide-react';
import { useBloodBank } from '../context/BloodBankContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/UI/Button';

// Hard-coded hospital accounts for demo
const HOSPITAL_ACCOUNTS = [
  { id: 'hospital1', password: 'password123', name: 'City General Hospital' },
  { id: 'hospital2', password: 'hospital456', name: 'Apollo Blood Centre' },
];

const HospitalLogin = () => {
  const { loginMode } = useBloodBank();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ id: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const account = HOSPITAL_ACCOUNTS.find(
        (h) => h.id === formData.id && h.password === formData.password
      );

      if (account) {
        loginMode('hospital');
        navigate('/hospital-dashboard');
      } else {
        setError('Invalid Hospital ID or Password. Please try again.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d1b2a 0%, #1b3352 60%, #2a1020 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>

      {/* Background decorations */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,24,74,0.15) 0%, transparent 70%)', top: -150, right: -100, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,24,74,0.08) 0%, transparent 70%)', bottom: -80, left: -80, pointerEvents: 'none' }} />

      <div className="animate-fade-in" style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>

        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 8px 30px rgba(201,24,74,0.4)', animation: 'heartbeat 2s ease infinite' }}>
            <Droplet size={34} color="white" fill="white" />
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#f0f4f8', marginBottom: '0.35rem' }}>
            Hospital Login
          </h1>
          <p style={{ color: 'rgba(240,244,248,0.6)', fontSize: '0.9rem' }}>
            Authorized hospital staff only. Access full donor records.
          </p>
        </div>

        {/* Login Card */}
        <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-xl)', padding: '2.5rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#2dd4bf', fontSize: '0.82rem', fontWeight: 600 }}>
            <ShieldCheck size={16} />
            Secure & Encrypted Connection
          </div>

          {error && (
            <div style={{ background: 'rgba(201,24,74,0.15)', border: '1px solid rgba(201,24,74,0.35)', borderRadius: 'var(--radius-md)', padding: '0.9rem 1rem', marginBottom: '1.5rem', color: '#ff6b8a', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Hospital ID */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(240,244,248,0.8)', marginBottom: '0.5rem' }}>
                Hospital ID
              </label>
              <div style={{ position: 'relative' }}>
                <Building2 size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,244,248,0.4)' }} />
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="e.g. hospital1"
                  required
                  style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', color: '#f0f4f8', fontSize: '0.95rem', outline: 'none', transition: 'var(--transition)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(240,244,248,0.8)', marginBottom: '0.5rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,244,248,0.4)' }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  style={{ width: '100%', padding: '0.85rem 3rem 0.85rem 2.75rem', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', color: '#f0f4f8', fontSize: '0.95rem', outline: 'none', transition: 'var(--transition)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(240,244,248,0.5)', cursor: 'pointer', display: 'flex' }}
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? '⏳ Authenticating…' : '🏥 Login to Hospital Portal'}
            </Button>
          </form>

          {/* Demo credentials */}
          <div style={{ marginTop: '1.75rem', padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(240,244,248,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Demo Credentials</p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(240,244,248,0.6)' }}>ID: <code style={{ color: '#ffd166' }}>hospital1</code> | Pass: <code style={{ color: '#ffd166' }}>password123</code></p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(240,244,248,0.6)', marginTop: '0.25rem' }}>ID: <code style={{ color: '#ffd166' }}>hospital2</code> | Pass: <code style={{ color: '#ffd166' }}>hospital456</code></p>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(240,244,248,0.4)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
          Are you a blood donor?{' '}
          <button onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Register here</button>
        </p>
      </div>
    </div>
  );
};

export default HospitalLogin;
