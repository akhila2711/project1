import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../api/axios';
import {
  Box, Typography, Paper, Chip, Grid, Button
} from '@mui/material';

const ProjectFiles = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/admin/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProject(res.data);
      } catch (err) {
        setError('Failed to fetch project files');
      }
      setLoading(false);
    };
    fetchProject();
  }, [projectId]);

  // Helper to handle both string and array for documents
  const renderDocuments = (docUrl) => {
    if (!docUrl) return <Typography>No document uploaded.</Typography>;
    if (Array.isArray(docUrl)) {
      if (docUrl.length === 0) return <Typography>No document uploaded.</Typography>;
      return docUrl.map((doc, idx) => (
        <Button
          key={idx}
          href={doc}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        >
          View Document {docUrl.length > 1 ? idx + 1 : ''}
        </Button>
      ));
    }
    return (
      <Button
        href={docUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        sx={{ mr: 1, mb: 1 }}
      >
        View Document
      </Button>
    );
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2 }}>
      <Link to="/admin/oversee-projects" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>
        ← Back to Projects
      </Link>
      <Typography variant="h4" fontWeight={700} sx={{ mt: 2, mb: 2 }}>
        Project Files
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              {project?.name}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography fontWeight={500}>Documents:</Typography>
              {renderDocuments(project?.documentUrl)}
            </Box>
            <Box>
              <Typography fontWeight={500} sx={{ mb: 1 }}>Images:</Typography>
              <Grid container spacing={2}>
                {project?.imageUrls && project.imageUrls.length > 0 ? (
                  project.imageUrls.map((img, idx) => (
                    <Grid item xs={6} sm={4} md={3} key={idx}>
                      <a
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'block', borderRadius: 8, overflow: 'hidden' }}
                      >
                        <img
                          src={img}
                          alt={`Project Image ${idx + 1}`}
                          style={{
                            width: '100%',
                            height: 120,
                            objectFit: 'cover',
                            borderRadius: 8,
                            border: '1px solid #ccc'
                          }}
                        />
                      </a>
                    </Grid>
                  ))
                ) : (
                  <Typography>No images uploaded.</Typography>
                )}
              </Grid>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ProjectFiles;