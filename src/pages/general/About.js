import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, useTheme } from '@mui/material';
import './About.css';

const stats = [
  { number: '10+', label: 'Years of Experience' },
  { number: '1500+', label: 'Projects Completed' },
  { number: '790+', label: 'Satisfied Clients' },
  { number: '450+', label: 'Active Workers' },
];

const AboutSection = () => {
  const theme = useTheme();

  return (
    <Box
      id="about"
      className="about-section"
      sx={{
        py: { xs: 5, md: 8 },
        px: { xs: 2, md: 8 },
        background: 'linear-gradient(135deg, #f9f9f9 60%, #ffe0b2 100%)',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={6} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: theme.shadows[6],
              mb: { xs: 3, md: 0 },
              maxWidth: 500,
              mx: 'auto',
            }}
          >
           
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: '#ff6600',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.7rem' },
              letterSpacing: 1,
            }}
          >
            About BuildTrack
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#222',
              mb: 2,
              lineHeight: 1.3,
            }}
          >
            We Deliver the Best Work You Dream Of!
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#444', mb: 3 }}>
            Our team of experienced professionals is committed to delivering high-quality workmanship and exceptional customer service on every project. We blend innovation, safety, and efficiency to ensure your construction goals are met on time and within budget.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 1,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1.1rem',
              borderRadius: 2,
              background: 'linear-gradient(90deg, #ff6600 0%, #ffb347 100%)',
              boxShadow: '0 4px 16px rgba(255, 102, 0, 0.12)',
              '&:hover': {
                background: 'linear-gradient(90deg, #ff8c1a 0%, #ffd580 100%)',
              },
            }}
          >
            Read More
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: { xs: 6, md: 10 } }}>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                className="stat-card"
                sx={{
                  textAlign: 'center',
                  py: 4,
                  borderRadius: 4,
                  boxShadow: 6,
                  background: 'linear-gradient(120deg, #fffbe6 60%, #ffe0b2 100%)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.06)',
                    boxShadow: 12,
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: '#ff6600',
                      mb: 1,
                      fontSize: { xs: '2.2rem', md: '2.7rem' },
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: '#333', fontWeight: 500, fontSize: '1.1rem' }}
                  >
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutSection;