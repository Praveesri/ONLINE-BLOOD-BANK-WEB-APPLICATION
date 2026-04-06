import React, { createContext, useState, useEffect, useContext } from 'react';

export const BloodBankContext = createContext();

export const useBloodBank = () => useContext(BloodBankContext);

export const BloodBankProvider = ({ children }) => {
  // Mock Data Initialization
  const [currentUser, setCurrentUser] = useState(null); // null means not logged in, object means user/admin
  
  const [donors, setDonors] = useState(() => {
    const saved = localStorage.getItem('bb_donors');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'John Doe', age: 30, bloodGroup: 'O+', contact: '123-456-7890', location: 'New York', status: 'Available' },
      { id: 2, name: 'Jane Smith', age: 25, bloodGroup: 'A-', contact: '987-654-3210', location: 'Los Angeles', status: 'Available' },
      { id: 3, name: 'Mike Johnson', age: 40, bloodGroup: 'B+', contact: '555-123-4567', location: 'Chicago', status: 'Donated Recently' },
      { id: 4, name: 'Emily Davis', age: 28, bloodGroup: 'AB+', contact: '444-987-6543', location: 'New York', status: 'Available' },
    ];
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('bb_requests');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, patientName: 'Alice Brown', bloodGroup: 'O+', hospital: 'General Hospital', contact: '111-222-3333', location: 'New York', urgency: 'High', status: 'Pending', date: new Date().toISOString() }
    ];
  });

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('bb_donors', JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem('bb_requests', JSON.stringify(requests));
  }, [requests]);

  // Actions
  const loginMode = (mode) => {
    if (mode === 'admin') {
      setCurrentUser({ id: 'admin1', name: 'Admin User', role: 'admin' });
    } else if (mode === 'user') {
      setCurrentUser({ id: 'user1', name: 'Demo User', role: 'user' });
    } else {
      setCurrentUser(null);
    }
  };

  const addDonor = (donorData) => {
    const newDonor = {
      ...donorData,
      id: Date.now(),
      status: 'Available'
    };
    setDonors([...donors, newDonor]);
  };

  const updateDonorStatus = (id, newStatus) => {
    setDonors(donors.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const deleteDonor = (id) => {
    setDonors(donors.filter(d => d.id !== id));
  };

  const addRequest = (requestData) => {
    const newReq = {
      ...requestData,
      id: Date.now(),
      status: 'Pending',
      date: new Date().toISOString()
    };
    setRequests([newReq, ...requests]);
  };

  const updateRequestStatus = (id, newStatus) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const deleteRequest = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <BloodBankContext.Provider value={{
      currentUser,
      loginMode,
      donors,
      addDonor,
      updateDonorStatus,
      deleteDonor,
      requests,
      addRequest,
      updateRequestStatus,
      deleteRequest
    }}>
      {children}
    </BloodBankContext.Provider>
  );
};
