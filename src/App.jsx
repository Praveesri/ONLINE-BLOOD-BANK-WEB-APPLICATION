import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Pages to be created
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import DonorRegistration from './pages/DonorRegistration';
import RequestBlood from './pages/RequestBlood';
import SearchBlood from './pages/SearchBlood';
import UserDashboard from './pages/UserDashboard';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="page-wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/register" element={<DonorRegistration />} />
            <Route path="/request" element={<RequestBlood />} />
            <Route path="/search" element={<SearchBlood />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
