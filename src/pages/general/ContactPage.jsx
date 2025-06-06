import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert
} from '@mui/material';
import axios from '../../api/axios'; // <-- import your axios instance
import './Contact.css';

const ContactPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/enquiries', formData);
      setSnackbarOpen(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      alert('Failed to send enquiry');
    }
  };

  return (
    <Box className="contact-page" sx={{ py: 6, px: { xs: 2, md: 10 }, backgroundColor: '#fefefe' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 5 }}>
        Have a question or want to work with us? Fill out the form below and we’ll get back to you soon.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 4, borderRadius: 3 }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  margin="normal"
                  required
                />
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, width: '100%' }}>
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ mt: { xs: 4, md: 0 } }}>
            <Typography variant="h6" gutterBottom>Address</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Construction Progress HQ<br />
              123 Builder's Lane<br />
              Kochi, Kerala, 682030
            </Typography>
            <Typography variant="h6" gutterBottom>Phone</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              +91 9876543210
            </Typography>
            <Typography variant="h6" gutterBottom>Email</Typography>
            <Typography variant="body2">
              support@constructiontracker.com
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled">
          Your message has been sent!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;