import React, { createContext, useState, useContext } from 'react';

export const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // 'en' or 'ta'

  const translations = {
    en: {
      appName: 'Online Blood Bank',
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      register: 'Register',
      search: 'Search Blood',
      dashboard: 'Dashboard',
      hospitalLogin: 'Hospital Login',
      admin: 'Admin',
      logout: 'Logout',
      registerDonor: 'Register as a Donor',
      fullName: 'Full Name',
      age: 'Age',
      bloodGroup: 'Blood Group',
      gender: 'Gender',
      contactNumber: 'Contact Number',
      donationHistory: 'Donation History',
      medicalIssues: 'Medical Issues (if any)',
      permanentAddress: 'Permanent Address',
      liveLocation: 'Location (Area/City)',
      getLiveLocation: 'Get Live Location',
      registerNow: 'Register Now',
      findBlood: 'Find Blood Donors',
      selectOption: 'Select an option',
      searchDonors: 'Search Donors',
      guidancePrompt: 'Speaking guidance for',
      yes: 'Yes',
      no: 'No',
      male: 'Male',
      female: 'Female',
      other: 'Other'
    },
    ta: {
      appName: 'ஆன்லைன் ரத்த வங்கி',
      home: 'முகப்பு',
      about: 'பற்றி',
      contact: 'தொடர்புக்கு',
      register: 'பதிவு செய்',
      search: 'ரத்தம் தேடு',
      dashboard: 'கட்டுப்பாட்டகம்',
      hospitalLogin: 'மருத்துவமனை நுழைவு',
      admin: 'நிர்வாகி',
      logout: 'வெளியேறு',
      registerDonor: 'ரத்த தானம் செய்பவராக பதிவு செய்யவும்',
      fullName: 'முழு பெயர்',
      age: 'வயது',
      bloodGroup: 'ரத்த வகை',
      gender: 'பாலினம்',
      contactNumber: 'தொடர்பு எண்',
      donationHistory: 'தானம் செய்த தகவல்கள்',
      medicalIssues: 'மருத்துவச் சிக்கல்கள்',
      permanentAddress: 'நிரந்தர முகவரி',
      liveLocation: 'இருப்பிடம்',
      getLiveLocation: 'தற்போதைய இருப்பிடத்தை பெறுக',
      registerNow: 'இப்போதே பதிவு செய்',
      findBlood: 'ரத்த தானம் செய்பவர்களை தேடு',
      selectOption: 'ஒரு விருப்பத்தை தேர்ந்தெடுக்கவும்',
      searchDonors: 'தானாளர்களை தேடு',
      guidancePrompt: 'பேசும் வழிகாட்டல்',
      yes: 'ஆம்',
      no: 'இல்லை',
      male: 'ஆண்',
      female: 'பெண்',
      other: 'மற்றவை'
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const speak = (textKey) => {
    if (!window.speechSynthesis) return;
    const textToSpeak = t(textKey);
    const synth = window.speechSynthesis;
    // cancel ongoing speech
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    // try to select tamil voice if available
    if (language === 'ta') {
      const voices = synth.getVoices();
      const tamilVoice = voices.find(v => v.lang.includes('ta') || v.lang.includes('IN'));
      if (tamilVoice) utterance.voice = tamilVoice;
      utterance.lang = 'ta-IN';
    } else {
      utterance.lang = 'en-US';
    }
    
    synth.speak(utterance);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, speak }}>
      {children}
    </LanguageContext.Provider>
  );
};
