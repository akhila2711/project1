import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Button, TextField, MenuItem, IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../api/axios';

const MATERIALS = [
  { name: 'Cement', unit: 'bags' },
  { name: 'Steel', unit: 'kg' },
  { name: 'Bricks', unit: 'pieces' },
  { name: 'Sand', unit: 'tons' },
  { name: 'Aggregate', unit: 'tons' },
  { name: 'Tiles', unit: 'boxes' },
  // Add more as needed
];

const MaterialLogs = () => {
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [project, setProject] = useState('');
  const [logs, setLogs] = useState([
    { materialName: '', quantity: '', unit: '', purpose: '', remarks: '' }
  ]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch assigned projects for the engineer
    const fetchAssignedProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/projects/engineer/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssignedProjects(res.data);
      } catch {
        setAssignedProjects([]);
      }
    };
    fetchAssignedProjects();
  }, []);

  // For dropdown auto-fill unit
  const handleMaterialChange = (idx, value) => {
    const mat = MATERIALS.find(m => m.name === value);
    setLogs(logs =>
      logs.map((row, i) =>
        i === idx
          ? { ...row, materialName: value, unit: mat ? mat.unit : '' }
          : row
      )
    );
  };

  const handleChange = (idx, field, value) => {
    setLogs(logs =>
      logs.map((row, i) =>
        i === idx ? { ...row, [field]: value } : row
      )
    );
  };

  const addRow = () => {
    setLogs([...logs, { materialName: '', quantity: '', unit: '', purpose: '', remarks: '' }]);
  };

  const removeRow = idx => {
    setLogs(logs => logs.filter((_, i) => i !== idx));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);

    // Validation: project and at least one row with material and quantity
    if (!project) {
      setError('Please select a project.');
      setLoading(false);
      return;
    }
    if (
      logs.length === 0 ||
      logs.some(row => !row.materialName || !row.quantity || !row.unit)
    ) {
      setError('Please fill Material Name, Quantity, and Unit for all rows.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('/material-logs', { project, logs }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Material logs submitted successfully!');
      setLogs([{ materialName: '', quantity: '', unit: '', purpose: '', remarks: '' }]);
      setProject('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit material logs');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          🧱 Material Usage Log
        </Typography>
        {success && <Typography color="primary" sx={{ mb: 2 }}>{success}</Typography>}
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Assigned Project"
                value={project}
                onChange={e => setProject(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value="">Select Project</MenuItem>
                {assignedProjects.map(proj => (
                  <MenuItem key={proj._id} value={proj._id}>
                    {proj.name} ({proj.location})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={addRow}
                sx={{ mb: 2 }}
              >
                Add Material Row
              </Button>
            </Grid>
            {logs.map((row, idx) => (
              <React.Fragment key={idx}>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    label="Material Name"
                    value={row.materialName}
                    onChange={e => handleMaterialChange(idx, e.target.value)}
                    fullWidth
                    required
                  >
                    <MenuItem value="">Select</MenuItem>
                    {MATERIALS.map(mat => (
                      <MenuItem key={mat.name} value={mat.name}>{mat.name}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} md={2}>
                  <TextField
                    label="Quantity Used"
                    type="number"
                    value={row.quantity}
                    onChange={e => handleChange(idx, 'quantity', e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <TextField
                    label="Unit"
                    value={row.unit}
                    onChange={e => handleChange(idx, 'unit', e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Purpose / Section"
                    value={row.purpose}
                    onChange={e => handleChange(idx, 'purpose', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={11} md={1}>
                  <TextField
                    label="Remarks"
                    value={row.remarks}
                    onChange={e => handleChange(idx, 'remarks', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1} md={1} sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => removeRow(idx)}
                    disabled={logs.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Submitting...' : 'Submit Material Logs'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default MaterialLogs;