import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, TextField, Button, MenuItem, FormControl,
  InputLabel, Select, OutlinedInput, Checkbox, ListItemText, Paper, Box, Alert, CircularProgress, Avatar, Chip
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from '@mui/icons-material/Person';
import axios from '../../api/axios';

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    location: '',
    startDate: '',
    endDate: '',
    status: '',
    engineers: [],
    budget: '',
    description: '',
    documents: null,
    images: []
  });
  const [engineersList, setEngineersList] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [successProject, setSuccessProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch engineers and clients list
    const fetchEngineersAndClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const [engRes, clientRes] = await Promise.all([
          axios.get('/auth/users/engineers', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/auth/users/clients', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setEngineersList(engRes.data);
        setClientsList(clientRes.data);
      } catch (err) {
        setEngineersList([]);
        setClientsList([]);
      }
    };
    fetchEngineersAndClients();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'images') {
      setFormData({
        ...formData,
        images: e.target.files,
      });
      setImagePreviews(Array.from(e.target.files).map(file => URL.createObjectURL(file)));
    } else if (e.target.name === 'documents') {
      setFormData({
        ...formData,
        documents: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEngineersChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      engineers: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSuccessProject(null);
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'engineers') {
          value.forEach(v => data.append('engineers', v));
        } else if (key === 'images') {
          if (value && value.length > 0) {
            Array.from(value).forEach(file => data.append('images', file));
          }
        } else if (key === 'documents') {
          if (value) data.append('documents', value);
        } else {
          data.append(key, value);
        }
      });

      const token = localStorage.getItem('token');
      const res = await axios.post('/projects/admin/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess('Project added successfully!');
      setSuccessProject(res.data);
      setImagePreviews([]);
      setFormData({
        name: '',
        client: '',
        location: '',
        startDate: '',
        endDate: '',
        status: '',
        engineers: [],
        budget: '',
        description: '',
        documents: null,
        images: []
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add project');
    }
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #e3f0ff 0%, #f8fdff 100%)',
      py: 5
    }}>
      <Paper elevation={4} sx={{
        maxWidth: 900,
        mx: 'auto',
        p: { xs: 2, md: 5 },
        borderRadius: 5,
        boxShadow: 6
      }}>
        <Typography variant="h4" fontWeight={700} align="center" gutterBottom sx={{ letterSpacing: 1 }}>
          Add New Project
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Project Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Avatar sx={{ width: 28, height: 28, bgcolor: '#1976d2', mr: 1 }}>
                      <PersonIcon />
                    </Avatar>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Client</InputLabel>
                <Select
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  label="Client"
                >
                  <MenuItem value="">Select Client</MenuItem>
                  {clientsList.map(client => (
                    <MenuItem key={client._id} value={client._id}>
                      <Chip label={client.name} color="primary" size="small" sx={{ mr: 1 }} />
                      {client.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{ startAdornment: <span style={{ marginRight: 8 }}>₹</span> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                required
                select
                variant="outlined"
              >
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Assign Engineers</InputLabel>
                <Select
                  multiple
                  name="engineers"
                  value={formData.engineers}
                  onChange={handleEngineersChange}
                  input={<OutlinedInput label="Assign Engineers" />}
                  renderValue={(selected) =>
                    selected
                      .map(id => {
                        const eng = engineersList.find(e => e._id === id);
                        return eng ? eng.name : id;
                      })
                      .join(', ')
                  }
                >
                  {engineersList.map((eng) => (
                    <MenuItem key={eng._id} value={eng._id}>
                      <Checkbox checked={formData.engineers.indexOf(eng._id) > -1} />
                      <ListItemText primary={eng.name + ' (' + eng.email + ')'} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{ py: 1.5, fontWeight: 600, mb: 1 }}
              >
                Upload Document
                <input
                  type="file"
                  name="documents"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />
              </Button>
              {formData.documents && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {formData.documents.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{ py: 1.5, fontWeight: 600, mb: 1 }}
              >
                Upload Images
                <input
                  type="file"
                  name="images"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                />
              </Button>
              {formData.images && formData.images.length > 0 && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {Array.from(formData.images).map(f => f.name).join(', ')}
                </Typography>
              )}
              {imagePreviews.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {imagePreviews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`preview-${idx}`}
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: 'cover',
                        borderRadius: 8,
                        border: '1px solid #ccc'
                      }}
                    />
                  ))}
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ py: 1.5, fontWeight: 700, fontSize: 18, mt: 2 }}
                startIcon={loading && <CircularProgress size={22} />}
              >
                {loading ? 'Adding...' : 'Add Project'}
              </Button>
            </Grid>
          </Grid>
        </form>
        {successProject && successProject.imageUrls && successProject.imageUrls.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              Uploaded Images:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {successProject.imageUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`uploaded-${idx}`}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: 'cover',
                    borderRadius: 8,
                    border: '1px solid #ccc'
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AddProject;