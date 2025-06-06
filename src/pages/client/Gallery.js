import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Skeleton,
  Chip,
  Tooltip,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import axios from '../../api/axios';

const Gallery = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [openImg, setOpenImg] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setLogs([]);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/logs/client/gallery', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data);
      } catch (err) {
        setError('Failed to fetch images for your projects.');
      }
    };
    fetchLogs();
  }, []);

  // Flatten all images with their log/project/date info
  const images = logs.flatMap(log =>
    (log.photos || []).map(photo => ({
      url: photo,
      date: log.date,
      project: log.project?.name,
      location: log.project?.location,
      workDone: log.workDone,
      logId: log._id
    }))
  );

  return (
    <Box sx={{ maxWidth: 1300, margin: 'auto', mt: 4, px: { xs: 1, md: 2 } }}>
      <Typography variant="h4" fontWeight={700} gutterBottom align="center" sx={{ letterSpacing: 1 }}>
        📸 Project Gallery
      </Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      {!error && images.length === 0 && (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Skeleton variant="rectangular" width={220} height={180} sx={{ mx: 'auto', mb: 2 }} />
          <Typography>No images uploaded for your projects yet.</Typography>
        </Box>
      )}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {images.map((img, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={img.logId + '-' + idx}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 3,
                transition: 'transform 0.18s',
                '&:hover': { transform: 'scale(1.025)', boxShadow: 8 }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={img.url}
                  alt={img.project || 'Project'}
                  sx={{
                    height: 210,
                    objectFit: 'cover',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    cursor: 'pointer'
                  }}
                  onClick={() => setOpenImg(img.url)}
                />
                <Tooltip title="View Full Image">
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(255,255,255,0.85)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                    }}
                    onClick={() => setOpenImg(img.url)}
                  >
                    <OpenInFullIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <CardContent sx={{ pb: '12px !important' }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
                  {img.project || 'Project'}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {img.location}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  Uploaded: {img.date ? new Date(img.date).toLocaleDateString() : ''}
                </Typography>
                {img.workDone && (
                  <Chip
                    label={img.workDone.length > 30 ? img.workDone.slice(0, 30) + '...' : img.workDone}
                    size="small"
                    sx={{ mt: 1, bgcolor: '#e3f0ff', color: '#1976d2', fontWeight: 500 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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

export default Gallery;