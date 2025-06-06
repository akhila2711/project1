import React, { useState, useEffect } from 'react';
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, Paper, Grid, Alert, Avatar
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import axios from '../../api/axios';

const CreateLog = () => {
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [project, setProject] = useState('');
  const [date, setDate] = useState('');
  const [workDone, setWorkDone] = useState('');
  const [issues, setIssues] = useState('');
  const [weather, setWeather] = useState('');
  const [laborCount, setLaborCount] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [equipmentUsed, setEquipmentUsed] = useState('');
  const [remarks, setRemarks] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch assigned projects for the engineer
    const fetchAssignedProjects = async () => {
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/projects/engineer/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssignedProjects(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Failed to fetch assigned projects'
        );
      }
    };
    fetchAssignedProjects();
  }, []);

  const handlePhotoUpload = (e) => {
    setPhotos([...e.target.files]);
    setPhotoPreviews(Array.from(e.target.files).map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!project || !date || !workDone) {
      setError('Project, Date, and Work Done are required.');
      return;
    }

    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('project', project);
    data.append('date', date);
    data.append('workDone', workDone);
    data.append('issues', issues);
    data.append('weather', weather);
    data.append('laborCount', laborCount);
    data.append('workingHours', workingHours);
    data.append('equipmentUsed', equipmentUsed);
    data.append('remarks', remarks);

    if (photos && photos.length > 0) {
      Array.from(photos).forEach((img) => {
        data.append('photos', img);
      });
    }

    try {
      await axios.post('/logs', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Log submitted successfully!');
      setProject('');
      setDate('');
      setWorkDone('');
      setIssues('');
      setWeather('');
      setLaborCount('');
      setWorkingHours('');
      setEquipmentUsed('');
      setRemarks('');
      setPhotos([]);
      setPhotoPreviews([]);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to submit log'
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #e3f0ff 0%, #f8fdff 100%)',
        py: 5
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 700,
          mx: 'auto',
          p: { xs: 2, md: 5 },
          borderRadius: 5,
          boxShadow: 6
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          align="center"
          gutterBottom
          sx={{ letterSpacing: 1, color: '#1976d2' }}
        >
          <AssignmentTurnedInIcon sx={{ mr: 1, fontSize: 36, verticalAlign: 'middle' }} />
          Submit Daily Site Log
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Select Project</InputLabel>
                <Select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  label="Select Project"
                >
                  {assignedProjects.map((proj) => (
                    <MenuItem key={proj._id} value={proj._id}>
                      {proj.name} ({proj.location})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Weather Condition"
                fullWidth
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Work Completed"
                multiline
                rows={4}
                fullWidth
                value={workDone}
                onChange={(e) => setWorkDone(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Labor Count"
                type="number"
                fullWidth
                value={laborCount}
                onChange={(e) => setLaborCount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Working Hours"
                type="text"
                fullWidth
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                placeholder="e.g. 8, 9:00-17:00"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Equipment Used"
                multiline
                rows={2}
                fullWidth
                value={equipmentUsed}
                onChange={(e) => setEquipmentUsed(e.target.value)}
                placeholder="e.g. Excavator, Crane"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Any Issues or Delays"
                multiline
                rows={2}
                fullWidth
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Supervisor/Engineer Remarks"
                multiline
                rows={2}
                fullWidth
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#1976d2',
                  borderColor: '#1976d2',
                  '&:hover': {
                    borderColor: '#1565c0',
                    background: '#e3f0ff'
                  }
                }}
              >
                Upload Photos
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </Button>
              {photos.length > 0 && (
                <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {photoPreviews.map((src, idx) => (
                    <Avatar
                      key={idx}
                      src={src}
                      alt={`preview-${idx}`}
                      variant="rounded"
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
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
                sx={{ py: 1.5, fontWeight: 700, fontSize: 18 }}
              >
                Submit Log
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateLog;