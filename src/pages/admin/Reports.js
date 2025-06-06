import React, { useEffect, useState } from 'react';
import {
  Typography, Grid, TextField, Button, MenuItem, Paper, Box, Alert
} from '@mui/material';
import axios from '../../api/axios';
import './Reports.css';

const Reports = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState('');
  const [status, setStatus] = useState('');
  const [milestone, setMilestone] = useState('');
  const [progressDetails, setProgressDetails] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/admin/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data);
      } catch {
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  const handleFileChange = (e) => {
    setAttachments(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);
    if (!project || !status || !milestone || !progressDetails) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('project', project);
      formData.append('status', status);
      formData.append('milestone', milestone);
      formData.append('progressdetails', progressDetails);
      if (attachments && attachments.length > 0) {
        Array.from(attachments).forEach(file => {
          formData.append('attachments', file);
        });
      }
      await axios.post('/reports', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Report created successfully!');
      setProject('');
      setStatus('');
      setMilestone('');
      setProgressDetails('');
      setAttachments([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create report');
    }
    setLoading(false);
  };

  return (
    <Box className="report-bg">
      <Paper elevation={3} className="report-paper">
        <Typography variant="h4" fontWeight={700} gutterBottom align="center">
          Create Report
        </Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                select
                label="Project"
                value={project}
                onChange={e => setProject(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="">Select a project</MenuItem>
                {projects.map(p => (
                  <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Status"
                value={status}
                onChange={e => setStatus(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="">Select status</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Milestone"
                value={milestone}
                onChange={e => setMilestone(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Progress Details"
                value={progressDetails}
                onChange={e => setProgressDetails(e.target.value)}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ py: 1.5, fontWeight: 600, fontSize: 18 }}
              >
                Upload Attachments
                <input
                  type="file"
                  name="attachments"
                  hidden
                  multiple
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                />
              </Button>
              {attachments && attachments.length > 0 && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {Array.from(attachments).map(f => f.name).join(', ')}
                </Typography>
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
                sx={{ py: 1.5, fontWeight: 600, fontSize: 18 }}
              >
                {loading ? 'Creating...' : 'Create Report'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Reports;