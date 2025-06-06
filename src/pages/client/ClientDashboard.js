import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';

import { CircularProgress, Typography } from '@mui/material';

const ClientDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching client data
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
    
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar role="Client" />
        <div style={{ flex: 1, padding: '40px' }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="h4" gutterBottom>Client Dashboard</Typography>
              <Typography>Welcome! Here you can view your project progress and reports.</Typography>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;