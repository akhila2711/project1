import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from '../../api/axios';

import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Card, CardContent, Divider, useTheme
} from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './AdminDashboard.css';

// Modern color palette
const CHART_COLORS = ['#1976d2', '#009688', '#43a047', '#6a1b9a', '#00bcd4', '#3949ab'];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    engineers: 0,
    clients: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [projectStatusData, setProjectStatusData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const usersRes = await axios.get('/auth/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const users = usersRes.data;
        const engineers = users.filter(u => u.role === 'Engineer').length;
        const clients = users.filter(u => u.role === 'Client').length;
        setStats(prev => ({
          ...prev,
          users: users.length,
          engineers,
          clients,
        }));
        setRoleData([
          { name: 'Engineers', value: engineers },
          { name: 'Clients', value: clients },
        ]);
      } catch {}
    };
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const projectsRes = await axios.get('/admin/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(prev => ({ ...prev, projects: projectsRes.data.length }));
        setRecentProjects(projectsRes.data.slice(-5).reverse());
        const statusCount = {};
        projectsRes.data.forEach(p => {
          const status = p.status || 'Unknown';
          statusCount[status] = (statusCount[status] || 0) + 1;
        });
        setProjectStatusData(
          Object.entries(statusCount).map(([name, value]) => ({ name, value }))
        );
      } catch {}
    };
    fetchStats();
    fetchProjects();
  }, []);

  return (
    <div className="admin-dashboard-bg">
      <nav className="manage-users-navbar" style={{
        background: 'linear-gradient(90deg, #1976d2 60%, #26c6da 100%)',
        color: '#fff',
        fontWeight: 700,
        fontSize: '1.25rem',
        letterSpacing: 1.5,
        boxShadow: '0 2px 12px rgba(44,62,80,0.07)'
      }}>
        <span className="navbar-title" style={{ fontWeight: 800 }}>🏗️ Construction Site Progress Tracker</span>
        <span className="navbar-user" style={{ fontWeight: 500 }}>Welcome, Admin</span>
      </nav>
      <div className="admin-dashboard-flex">
        <Sidebar role="Admin" />
        <div className="admin-dashboard-content">

          {/* Stat Cards */}
          <div className="admin-dashboard-cards">
            <Card className="stat-card stat-blue" elevation={0}>
              <CardContent>
                <Typography className="stat-label"><strong>Total Users</strong></Typography>
                <Typography className="stat-value">{stats.users}</Typography>
              </CardContent>
            </Card>
            <Card className="stat-card stat-teal" elevation={0}>
              <CardContent>
                <Typography className="stat-label"><strong>Projects</strong></Typography>
                <Typography className="stat-value">{stats.projects}</Typography>
              </CardContent>
            </Card>
            <Card className="stat-card stat-green" elevation={0}>
              <CardContent>
                <Typography className="stat-label"><strong>Engineers</strong></Typography>
                <Typography className="stat-value">{stats.engineers}</Typography>
              </CardContent>
            </Card>
            <Card className="stat-card stat-purple" elevation={0}>
              <CardContent>
                <Typography className="stat-label"><strong>Clients</strong></Typography>
                <Typography className="stat-value">{stats.clients}</Typography>
              </CardContent>
            </Card>
          </div>

          <Divider className="admin-dashboard-divider" />

          {/* Charts */}
          <Box
            className="admin-dashboard-charts"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 3, md: 5 },
              mb: 4,
              justifyContent: 'center'
            }}
          >
            <Paper
              className="chart-paper"
              sx={{
                background: '#fff',
                borderRadius: 4,
                boxShadow: 3,
                p: { xs: 2, md: 4 },
                flex: '1 1 320px',
                minWidth: 320,
                maxWidth: 480,
                height: 340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h6" className="chart-title" sx={{ mb: 2 }}>
                User Roles
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={roleData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    label
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
            <Paper
              className="chart-paper"
              sx={{
                background: '#fff',
                borderRadius: 4,
                boxShadow: 3,
                p: { xs: 2, md: 4 },
                flex: '1 1 320px',
                minWidth: 320,
                maxWidth: 480,
                height: 340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h6" className="chart-title" sx={{ mb: 2 }}>
                Project Status
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={projectStatusData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  barSize={40}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontWeight: 600, fontSize: 14 }} />
                  <YAxis allowDecimals={false} tick={{ fontWeight: 600, fontSize: 14 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#1976d2">
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`bar-cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Box>

          <Divider className="admin-dashboard-divider" />

          <Box className="recent-projects-box" sx={{
            background: 'linear-gradient(90deg, #e3f0ff 60%, #f8fdff 100%)',
            borderRadius: 3,
            boxShadow: 2,
            p: { xs: 2, md: 4 },
            mt: 2
          }}>
            <Typography variant="h6" className="recent-projects-title" sx={{ mb: 2 }}>
              Recent Projects
            </Typography>
            <div className="recent-projects-table-wrapper">
              <Table className="recent-projects-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentProjects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No projects found.</TableCell>
                    </TableRow>
                  ) : (
                    recentProjects.map(project => (
                      <TableRow key={project._id}>
                        <TableCell>
                          <Typography fontWeight={600}>{project.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <span
                            style={{
                              fontWeight: 600,
                              color:
                                project.status === 'Completed'
                                  ? theme.palette.success.main
                                  : project.status === 'Ongoing'
                                  ? theme.palette.primary.main
                                  : theme.palette.warning.main
                            }}
                          >
                            {project.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {project.startDate ? new Date(project.startDate).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell>
                          {project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;