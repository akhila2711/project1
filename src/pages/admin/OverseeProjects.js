import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
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
  Button,
  Avatar,
  Grid,
  Skeleton
} from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const OverseeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/admin/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch projects');
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f8fdff 0%, #e3f0ff 100%)',
      py: 5,
      px: { xs: 1, md: 4 }
    }}>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        align="center"
        sx={{ letterSpacing: 1, color: '#1976d2', mb: 4 }}
      >
        Oversee Projects
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3, maxWidth: 1300, mx: 'auto' }}>
        {loading ? (
          <Grid container spacing={2}>
            {[...Array(5)].map((_, idx) => (
              <Grid item xs={12} key={idx}>
                <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Engineers</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Files</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography color="text.secondary">No projects found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                projects.map(project => (
                  <TableRow key={project._id} hover sx={{
                    transition: 'background 0.18s',
                    '&:hover': { background: '#e3f0ff' }
                  }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2', fontWeight: 700 }}>
                          {project.name?.[0]?.toUpperCase() || <FolderOpenIcon />}
                        </Avatar>
                        <Typography fontWeight={600}>{project.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {project.client && typeof project.client === 'object'
                        ? project.client.name
                        : '-'}
                    </TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>
                      <Chip
                        label={project.status}
                        color={
                          project.status === 'Completed'
                            ? 'success'
                            : project.status === 'Ongoing'
                            ? 'primary'
                            : 'warning'
                        }
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>
                      {(project.engineers || []).length > 0
                        ? project.engineers.map(e =>
                            typeof e === 'object' && e !== null && e.name ? e.name : e
                          ).join(', ')
                        : <span style={{ color: '#aaa' }}>-</span>}
                    </TableCell>
                    <TableCell>
                      {project.budget ? `₹${project.budget}` : '-'}
                    </TableCell>
                    <TableCell>
                      {project.startDate ? new Date(project.startDate).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      {project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/admin/project-files/${project._id}`)}
                        startIcon={<FolderOpenIcon />}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 600,
                          textTransform: 'none'
                        }}
                      >
                        View Files
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
};

export default OverseeProjects;