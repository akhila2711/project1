import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Grid, Chip, Divider, TextField, MenuItem, Link
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from '../../api/axios';

const BACKEND_URL = "http://localhost:5000"; // Change if your backend runs elsewhere

const MyLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [projectOptions, setProjectOptions] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/logs/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data);

        // Extract unique project options for filter
        const uniqueProjects = Array.from(
          new Set(res.data.map(log => log.project?.name).filter(Boolean))
        );
        setProjectOptions(uniqueProjects);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Failed to fetch your logs'
        );
      }
    };
    fetchLogs();
  }, []);

  // Helper to check if a URL is external (Cloudinary, etc.)
  const isExternalUrl = url => /^https?:\/\//i.test(url);

  // Helper to check file type
  const getFileType = (url) => {
    const ext = url.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
    if (ext === 'pdf') return 'pdf';
    if (['doc', 'docx'].includes(ext)) return 'doc';
    return 'other';
  };

  // Filter logs by project name if filter is set
  const filteredLogs = projectFilter
    ? logs.filter(log => log.project?.name === projectFilter)
    : logs;

  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        📋 My Submitted Logs
      </Typography>
      <Box sx={{ mb: 2, maxWidth: 300 }}>
        <TextField
          select
          label="Filter by Project"
          value={projectFilter}
          onChange={e => setProjectFilter(e.target.value)}
          fullWidth
          size="small"
        >
          <MenuItem value="">All Projects</MenuItem>
          {projectOptions.map((name, idx) => (
            <MenuItem key={idx} value={name}>{name}</MenuItem>
          ))}
        </TextField>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      {filteredLogs.length === 0 && !error && (
        <Typography>No logs found.</Typography>
      )}
      <Grid container spacing={2}>
        {filteredLogs.map(log => (
          <Grid item xs={12} key={log._id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">
                {log.project?.name || 'Project'} ({log.project?.location || ''})
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {new Date(log.date).toLocaleDateString()}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography><b>Work Completed:</b> {log.workDone}</Typography>
              <Typography><b>Labor Count:</b> {log.laborCount || '-'}</Typography>
              <Typography><b>Working Hours:</b> {log.workingHours || '-'}</Typography>
              <Typography><b>Equipment Used:</b> {log.equipmentUsed || '-'}</Typography>
              {log.issues && (
                <Typography><b>Any Issues or Delays:</b> {log.issues}</Typography>
              )}
              {log.weather && (
                <Typography><b>Weather Conditions:</b> {log.weather}</Typography>
              )}
              {log.remarks && (
                <Typography><b>Supervisor/Engineer Remarks:</b> {log.remarks}</Typography>
              )}
              {log.photos && log.photos.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2">Photos & Documents:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {log.photos.map((file, idx) => {
                      const url = isExternalUrl(file)
                        ? file
                        : `${BACKEND_URL}/${file.replace(/\\/g, '/')}`;
                      const type = getFileType(url);

                      if (type === 'image') {
                        return (
                          <a
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={url}
                              alt={`log-photo-${idx}`}
                              style={{
                                width: 80,
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: 4,
                                border: '1px solid #ccc'
                              }}
                            />
                          </a>
                        );
                      } else if (type === 'pdf') {
                        return (
                          <Link
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                          >
                            <PictureAsPdfIcon color="error" />
                            PDF {idx + 1}
                          </Link>
                        );
                      } else if (type === 'doc') {
                        return (
                          <Link
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                          >
                            <DescriptionIcon color="primary" />
                            DOC {idx + 1}
                          </Link>
                        );
                      } else {
                        return (
                          <Link
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                          >
                            <InsertDriveFileIcon />
                            File {idx + 1}
                          </Link>
                        );
                      }
                    })}
                  </Box>
                </Box>
              )}
              <Box sx={{ mt: 1 }}>
                <Chip
                  label={log.viewed ? 'Viewed by Admin' : 'Not Viewed'}
                  color={log.viewed ? 'success' : 'default'}
                  size="small"
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyLogs;