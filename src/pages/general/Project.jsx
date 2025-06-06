// src/components/ProjectsSection.jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './Project.css';

const projects = [
  {
    title: 'Dream Home',
    category: 'construction, design',
    image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlJTIwY29uc3RydWN0aW9ufGVufDB8fDB8fHww',
  },
  {
    title: 'Provide Machinery',
    category: 'construction',
    image: 'https://images.unsplash.com/photo-1612935089040-89195ef54677?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2UlMjBjb25zdHJ1Y3Rpb258ZW58MHx8MHx8fDA%3D',
  },
  {
    title: 'Corporate Buildings',
    category: 'construction, design',
    image: 'https://media.istockphoto.com/id/1471363410/photo/engineer-people-meeting-working-in-office-for-discussing-engineering-hands-of-engineer.webp?a=1&b=1&s=612x612&w=0&k=20&c=3X6R8lmXZY5TMJoe19Bq9iKjrSvKLfeh68OmHBxA1RI=',
  },
   {
    title: 'Corporate Buildings',
    category: 'construction, design',
    image: 'https://media.istockphoto.com/id/1471363410/photo/engineer-people-meeting-working-in-office-for-discussing-engineering-hands-of-engineer.webp?a=1&b=1&s=612x612&w=0&k=20&c=3X6R8lmXZY5TMJoe19Bq9iKjrSvKLfeh68OmHBxA1RI=',
  },
   {
    title: 'Corporate Buildings',
    category: 'construction, design',
    image: 'https://media.istockphoto.com/id/1471363410/photo/engineer-people-meeting-working-in-office-for-discussing-engineering-hands-of-engineer.webp?a=1&b=1&s=612x612&w=0&k=20&c=3X6R8lmXZY5TMJoe19Bq9iKjrSvKLfeh68OmHBxA1RI=',
  },
   {
    title: 'Corporate Buildings',
    category: 'construction, design',
    image: 'https://media.istockphoto.com/id/1471363410/photo/engineer-people-meeting-working-in-office-for-discussing-engineering-hands-of-engineer.webp?a=1&b=1&s=612x612&w=0&k=20&c=3X6R8lmXZY5TMJoe19Bq9iKjrSvKLfeh68OmHBxA1RI=',
  },
   {
    title: 'Corporate Buildings',
    category: 'construction, design',
    image: 'https://media.istockphoto.com/id/1471363410/photo/engineer-people-meeting-working-in-office-for-discussing-engineering-hands-of-engineer.webp?a=1&b=1&s=612x612&w=0&k=20&c=3X6R8lmXZY5TMJoe19Bq9iKjrSvKLfeh68OmHBxA1RI=',
  },
   {
    title: 'Corporate Buildings',
    category: 'construction, design',
    image: 'https://media.istockphoto.com/id/1471363410/photo/engineer-people-meeting-working-in-office-for-discussing-engineering-hands-of-engineer.webp?a=1&b=1&s=612x612&w=0&k=20&c=3X6R8lmXZY5TMJoe19Bq9iKjrSvKLfeh68OmHBxA1RI=',
  },
   {
    title: 'Corporate Buildings',
    category: 'construction, design',
    image: 'https://media.istockphoto.com/id/1471363410/photo/engineer-people-meeting-working-in-office-for-discussing-engineering-hands-of-engineer.webp?a=1&b=1&s=612x612&w=0&k=20&c=3X6R8lmXZY5TMJoe19Bq9iKjrSvKLfeh68OmHBxA1RI=',
  },
   {
    title: 'Corporate Buildings',
    category: 'construction, design',
    image: 'https://media.istockphoto.com/id/1471363410/photo/engineer-people-meeting-working-in-office-for-discussing-engineering-hands-of-engineer.webp?a=1&b=1&s=612x612&w=0&k=20&c=3X6R8lmXZY5TMJoe19Bq9iKjrSvKLfeh68OmHBxA1RI=',
  },
];

const ProjectsSection = () => {
  return (
    <section className="projects-section" id="projects">
      <Typography variant="h4" className="projects-title">
        Our Works
      </Typography>
      <Box className="projects-grid">
        {projects.map((project, index) => (
          <Card className="project-card" key={index}>
            <CardMedia
              component="img"
              height="240"
              image={project.image}
              alt={project.title}
              className="project-image"
            />
            <CardContent className="project-info">
              <Typography variant="subtitle1" fontWeight="bold">
                {project.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.category}
              </Typography>
              <IconButton className="project-icon">
                <AddIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </section>
  );
};

export default ProjectsSection;
