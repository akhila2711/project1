import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Chip,
  Link,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import axios from '../../api/axios';

const AssignedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [projectOptions, setProjectOptions] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/projects/engineer/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data);

        // Extract unique project names for filter
        const uniqueNames = Array.from(
          new Set(res.data.map(p => p.name).filter(Boolean))
        );
        setProjectOptions(uniqueNames);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Failed to fetch assigned projects'
        );
      }
    };
    fetchProjects();
  }, []);

  // Filter projects by name if filter is set
  const filteredProjects = projectFilter
    ? projects.filter(p => p.name === projectFilter)
    : projects;

  const isExternalUrl = url => /^https?:\/\//i.test(url);

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        mt: 6,
        px: { xs: 1, md: 3 },
        pb: 6,
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #f8fdff 0%, #e3f0ff 100%)'
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          mb: 3,
          color: '#1976d2',
          letterSpacing: 1,
          textAlign: 'center'
        }}
      >
        🏗️ Assigned Projects
      </Typography>
      <Box sx={{ mb: 3, maxWidth: 320, mx: 'auto' }}>
        <TextField
          select
          label="Filter by Project"
          value={projectFilter}
          onChange={e => setProjectFilter(e.target.value)}
          fullWidth
          size="small"
          sx={{
            background: '#fff',
            borderRadius: 2,
            boxShadow: 1
          }}
        >
          <MenuItem value="">All Projects</MenuItem>
          {projectOptions.map((name, idx) => (
            <MenuItem key={idx} value={name}>{name}</MenuItem>
          ))}
        </TextField>
      </Box>
      {error && <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>{error}</Typography>}
      {filteredProjects.length === 0 && !error && (
        <Typography sx={{ textAlign: 'center', color: '#888', mt: 4 }}>No assigned projects found.</Typography>
      )}
      {filteredProjects.length > 0 && (
        <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Project</b></TableCell>
                <TableCell><b>Location</b></TableCell>
                <TableCell><b>Client</b></TableCell>
                <TableCell><b>Start Date</b></TableCell>
                <TableCell><b>End Date</b></TableCell>
                <TableCell><b>Budget</b></TableCell>
                <TableCell><b>Description</b></TableCell>
                <TableCell><b>Document</b></TableCell>
                <TableCell><b>Images</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar
                        sx={{
                          bgcolor: '#1976d2',
                          color: '#fff',
                          fontWeight: 700,
                          width: 36,
                          height: 36,
                          fontSize: 18
                        }}
                      >
                        {p.name?.[0]?.toUpperCase() || <ImageIcon />}
                      </Avatar>
                      <Typography fontWeight={700}>{p.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{p.location || '-'}</TableCell>
                  <TableCell>
                    {typeof p.client === 'object' ? p.client?.name : p.client || '-'}
                  </TableCell>
                  <TableCell>
                    {p.startDate ? new Date(p.startDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    {p.endDate ? new Date(p.endDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    {p.budget ? `₹${p.budget}` : '-'}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200, whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                    {p.description || '-'}
                  </TableCell>
                  <TableCell>
                    {p.documentUrl ? (
                      <Tooltip title="Document">
                        <Link
                          href={
                            isExternalUrl(p.documentUrl)
                              ? p.documentUrl
                              : p.documentUrl.startsWith('uploads/')
                                ? `/${p.documentUrl.replace(/\\/g, '/')}`
                                : `/uploads/${p.documentUrl.replace(/\\/g, '/')}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#1976d2', fontWeight: 500 }}
                        >
                          <DescriptionIcon color="primary" />
                          View
                        </Link>
                      </Tooltip>
                    ) : (
                      <Chip label="No Document" size="small" sx={{ bgcolor: '#eee' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    {p.imageUrls && p.imageUrls.length > 0
                      ? p.imageUrls.map((img, idx) => (
                          <Tooltip title={`Image ${idx + 1}`} key={idx}>
                            <Link
                              href={
                                isExternalUrl(img)
                                  ? img
                                  : img.startsWith('uploads/')
                                    ? `/${img.replace(/\\/g, '/')}`
                                    : `/uploads/${img.replace(/\\/g, '/')}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: '#009688', fontWeight: 500, mr: 1 }}
                            >
                              <ImageIcon />
                              {idx + 1}
                            </Link>
                          </Tooltip>
                        ))
                      : <Chip label="No Images" size="small" sx={{ bgcolor: '#eee' }} />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AssignedProjects;