import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Avatar
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import axios from '../../api/axios';

const Enquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get('/enquiries');
        setEnquiries(res.data);
      } catch {
        setEnquiries([]);
      }
      setLoading(false);
    };
    fetchEnquiries();
  }, []);

  return (
    <Box sx={{ maxWidth: 1100, margin: 'auto', mt: 4, px: { xs: 1, md: 2 } }}>
      <Typography variant="h4" fontWeight={700} gutterBottom align="center" sx={{ letterSpacing: 1 }}>
        📩 User Enquiries
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : enquiries.length === 0 ? (
          <Typography align="center" sx={{ py: 4 }}>No enquiries found.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Name</TableCell>
                <TableCell><EmailIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Email</TableCell>
                <TableCell><MessageIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Message</TableCell>
                <TableCell><AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enquiries.map((enq) => (
                <TableRow key={enq._id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2' }}>
                        {enq.name?.[0]?.toUpperCase() || <PersonIcon />}
                      </Avatar>
                      <Typography fontWeight={600}>{enq.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={enq.email}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ maxWidth: 320, whiteSpace: 'pre-line' }}>
                      {enq.message}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(enq.createdAt).toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
};

export default Enquiry;