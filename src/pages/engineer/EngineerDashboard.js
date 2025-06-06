import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';

import axios from '../../api/axios';

const EngineerDashboard = () => {
  const [engineer, setEngineer] = useState(null);

  useEffect(() => {
    const fetchEngineer = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEngineer(res.data);
      } catch {
        setEngineer(null);
      }
    };
    fetchEngineer();
  }, []);

  return (
    <div>
     
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar role="Engineer" />
        <div style={{ flex: 1, padding: '40px' }}>
          <h1>Engineer Dashboard</h1>
          <p>
            Welcome, <strong>{engineer ? engineer.name : 'Engineer'}</strong>! Use the sidebar to log updates, upload images, and track milestones.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default EngineerDashboard;