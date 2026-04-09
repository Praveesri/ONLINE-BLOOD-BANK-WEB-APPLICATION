import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Loader2, CheckCircle2, Droplet } from 'lucide-react';
import { useBloodBank } from '../context/BloodBankContext';
import { useLanguage } from '../context/LanguageContext';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const bloodGroups = [
  { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
];

const DonorRegistration = () => {
  const { addDonor } = useBloodBank();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', age: '', bloodGroup: '', gender: '',
    contact: '', location: '', address: '',
    history: '', medical: '',
    lat: '', lng: '',
  });

  const [locLoading, setLocLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFormData((prev) => ({
          ...prev,
          lat: latitude.toFixed(5),
          lng: longitude.toFixed(5),
          location: prev.location || `Lat ${latitude.toFixed(3)}, Lng ${longitude.toFixed(3)}`,
        }));
        setLocLoading(false);
      },
      () => {
        alert('Unable to retrieve your location. Please enter manually.');
        setLocLoading(false);
      }
    );
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.age || formData.age < 18) errs.age = 'Must be at least 18 years old';
    if (formData.age > 65) errs.age = 'Must be 65 or younger';
    if (!formData.bloodGroup) errs.bloodGroup = 'Blood group is required';
    if (!formData.gender) errs.gender = 'Gender is required';
    if (!formData.contact.trim()) errs.contact = 'Contact number is required';
    if (!formData.location.trim()) errs.location = 'Location is required';
    if (!formData.address.trim()) errs.address = 'Permanent address is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    addDonor(formData);
    setSubmitted(true);
  };

  const genderOptions = [
    { value: 'Male', label: t('male') },
    { value: 'Female', label: t('female') },
    { value: 'Other', label: t('other') },
  ];

  if (submitted) {
    return (
      <div className="section animate-fade-in" style={{ background: 'var(--background)', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle2 size={44} color="var(--success)" />
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', color: 'var(--secondary)', marginBottom: '0.75rem' }}>
            Registration Successful! 🎉
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: 440, margin: '0 auto 2rem' }}>
            Thank you for registering as a blood donor, <strong>{formData.name}</strong>. Your details have been saved. Hospitals may contact you when your blood type is needed.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button size="lg" onClick={() => navigate('/search')}>Find Donors</Button>
            <Button size="lg" variant="outline" onClick={() => { setSubmitted(false); setFormData({ name:'',age:'',bloodGroup:'',gender:'',contact:'',location:'',address:'',history:'',medical:'',lat:'',lng:'' }); }}>
              Register Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in section" style={{ background: 'var(--background)' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', padding: '0.4rem 1.2rem', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Droplet size={13} fill="currentColor" /> Blood Donation
          </div>
          <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>{t('registerDonor')}</h1>
          <p className="section-subtitle">Complete the form below. All fields marked * are required.</p>
        </div>

        <Card style={{ maxWidth: '700px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} noValidate>

            {/* Personal Info */}
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              👤 Personal Information
            </h3>

            <Input
              label={`${t('fullName')} *`}
              id="name"
              placeholder="e.g. Ramesh Kumar"
              value={formData.name}
              onChange={update('name')}
              error={errors.name}
              voiceKey="fullName"
            />

            <div className="grid grid-cols-2">
              <Input
                label={`${t('age')} *`}
                id="age"
                type="number"
                min="18"
                max="65"
                placeholder="18–65"
                value={formData.age}
                onChange={update('age')}
                error={errors.age}
                voiceKey="age"
              />
              <Input
                label={`${t('gender')} *`}
                id="gender"
                type="select"
                options={genderOptions}
                value={formData.gender}
                onChange={update('gender')}
                error={errors.gender}
                voiceKey="gender"
              />
            </div>

            <div className="grid grid-cols-2">
              <Input
                label={`${t('bloodGroup')} *`}
                id="bloodGroup"
                type="select"
                options={bloodGroups}
                value={formData.bloodGroup}
                onChange={update('bloodGroup')}
                error={errors.bloodGroup}
                voiceKey="bloodGroup"
              />
              <Input
                label={`${t('contactNumber')} *`}
                id="contact"
                type="tel"
                placeholder="+91 9876543210"
                value={formData.contact}
                onChange={update('contact')}
                error={errors.contact}
                voiceKey="contactNumber"
              />
            </div>

            {/* Location Info */}
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '1.5rem 0 1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              📍 Location Information
            </h3>

            <Input
              label={`${t('permanentAddress')} *`}
              id="address"
              type="textarea"
              placeholder="Door No, Street, Town, District, State, PIN"
              value={formData.address}
              onChange={update('address')}
              error={errors.address}
              voiceKey="permanentAddress"
              rows={3}
            />

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <Input
                  label={`${t('liveLocation')} (Area/City) *`}
                  id="location"
                  placeholder="e.g. Chennai, Tamil Nadu"
                  value={formData.location}
                  onChange={update('location')}
                  error={errors.location}
                  voiceKey="liveLocation"
                />
              </div>
              <div style={{ marginBottom: errors.location ? '1.75rem' : '1.35rem', flexShrink: 0 }}>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={getLiveLocation}
                  disabled={locLoading}
                  style={{ height: '47px' }}
                >
                  {locLoading
                    ? <><Loader2 size={15} className="spin" /> Fetching…</>
                    : <><MapPin size={15} /> {t('getLiveLocation')}</>
                  }
                </Button>
              </div>
            </div>
            {formData.lat && (
              <p style={{ fontSize: '0.78rem', color: 'var(--success)', marginTop: '-0.75rem', marginBottom: '1rem' }}>
                ✓ GPS: {formData.lat}, {formData.lng}
              </p>
            )}

            {/* Medical Info */}
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0.5rem 0 1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              🏥 Medical Information
            </h3>

            <Input
              label={t('donationHistory')}
              id="history"
              placeholder="e.g. Donated 2 times, last donation Jan 2024"
              value={formData.history}
              onChange={update('history')}
              voiceKey="donationHistory"
            />

            <Input
              label={t('medicalIssues')}
              id="medical"
              type="textarea"
              placeholder="e.g. None / Diabetic / On medication (HIV, hepatitis test required)"
              value={formData.medical}
              onChange={update('medical')}
              voiceKey="medicalIssues"
              rows={3}
            />

            {/* Privacy Note */}
            <div style={{ background: 'var(--primary-light)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--primary)', display: 'flex', gap: '0.5rem' }}>
              🔒 <span><strong>Privacy:</strong> Your name, contact, address, and medical details are <strong>private</strong> and visible only to authorized hospital staff. The public can only see your blood group and general area.</span>
            </div>

            <Button type="submit" fullWidth size="lg">
              <Droplet size={18} fill="currentColor" /> {t('registerNow')}
            </Button>
          </form>
        </Card>
      </div>

      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default DonorRegistration;
