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
  Avatar,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogContent,
  Button
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import axios from '../../api/axios';

const BACKEND_URL = "http://localhost:5000"; // Change if your backend runs elsewhere

const isExternalUrl = url => /^https?:\/\//i.test(url);

const ManageLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [projectOptions, setProjectOptions] = useState([]);
  const [projectFilter, setProjectFilter] = useState('');
  const [openImg, setOpenImg] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/logs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data);

        // Extract unique project names for filter
        const uniqueProjects = Array.from(
          new Set(res.data.map(log => log.project?.name).filter(Boolean))
        );
        setProjectOptions(uniqueProjects);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch logs');
      }
      setLoading(false);
    };
    fetchLogs();
  }, []);

 

  // Filter logs by project name if filter is set
  const filteredLogs = projectFilter
    ? logs.filter(log => log.project?.name === projectFilter)
    : logs;

  return (
    <Box sx={{ maxWidth: 1300, margin: 'auto', mt: 4, px: { xs: 1, md: 2 } }}>
      <Typography variant="h4" fontWeight={700} gutterBottom align="center" sx={{ letterSpacing: 1 }}>
        🗂️ Manage Logs
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3, mb: 3 }}>
        <FormControl fullWidth size="small" sx={{ maxWidth: 320, mb: 2 }}>
          <InputLabel id="project-filter-label">Filter by Project</InputLabel>
          <Select
            labelId="project-filter-label"
            id="project-filter"
            value={projectFilter}
            label="Filter by Project"
            onChange={e => setProjectFilter(e.target.value)}
          >
            <MenuItem value="">All Projects</MenuItem>
            {projectOptions.map((name, idx) => (
              <MenuItem key={idx} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {loading ? (
          <Typography>Loading logs...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                <TableCell>Project</TableCell>
                <TableCell>Engineer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Work Completed</TableCell>
                <TableCell>Labor</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Equipment</TableCell>
                <TableCell>Issues</TableCell>
                <TableCell>Weather</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Photos</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.map(log => (
                <TableRow key={log._id} hover>
                  <TableCell>
                    <Chip label={log.project?.name || '-'} color="primary" size="small" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#1976d2' }}>
                        {log.engineer?.name?.[0]?.toUpperCase() || <PhotoLibraryIcon />}
                      </Avatar>
                      <Typography fontWeight={500}>{log.engineer?.name || '-'}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {log.date ? new Date(log.date).toLocaleDateString() : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ maxWidth: 120, whiteSpace: 'pre-line' }}>
                      {log.workDone}
                    </Typography>
                  </TableCell>
                  <TableCell>{log.laborCount || '-'}</TableCell>
                  <TableCell>{log.workingHours || '-'}</TableCell>
                  <TableCell>{log.equipmentUsed || '-'}</TableCell>
                  <TableCell>{log.issues || '-'}</TableCell>
                  <TableCell>{log.weather || '-'}</TableCell>
                  <TableCell>
                    <Typography sx={{ maxWidth: 120, whiteSpace: 'pre-line' }}>
                      {log.remarks || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {log.photos && log.photos.length > 0 ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {log.photos.map((img, idx) => (
                          <Tooltip title="View Photo" key={idx}>
                            <IconButton
                              size="small"
                              onClick={() => setOpenImg(img)}
                              sx={{ p: 0.5 }}
                            >
                              <img
                                src={
                                  isExternalUrl(img)
                                    ? img
                                    : `${BACKEND_URL}/${img.replace(/\\/g, '/')}`
                                }
                                alt={`Photo ${idx + 1}`}
                                style={{
                                  width: 38,
                                  height: 38,
                                  objectFit: 'cover',
                                  borderRadius: 4,
                                  border: '1px solid #ccc'
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                    ) : (
                      <Typography color="text.secondary" variant="body2">-</Typography>
                    )}
                  </TableCell>
                 
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
      <Dialog open={!!openImg} onClose={() => setOpenImg(null)} maxWidth="md">
        <DialogContent sx={{ p: 0, bgcolor: '#222' }}>
          <img
            src={openImg}
            alt="Full"
            style={{
              width: '100%',
              maxWidth: '80vw',
              maxHeight: '80vh',
              display: 'block',
              margin: 'auto'
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ManageLogs;