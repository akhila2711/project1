import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from '../../api/axios';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const CHART_COLORS = ['#1976d2', '#009688', '#43a047', '#6a1b9a', '#00bcd4', '#3949ab'];

const EngineerDashboard = () => {
  const [engineer, setEngineer] = useState(null);
  const [logs, setLogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [materialLogs, setMaterialLogs] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchEngineer = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEngineer(res.data);
      } catch {
        setEngineer(null);
      }
    };
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/logs/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data);
      } catch {}
    };
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/projects/engineer/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data);
      } catch {}
    };
    const fetchMaterialLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/materials/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMaterialLogs(res.data);
      } catch {}
    };
    fetchEngineer();
    fetchLogs();
    fetchProjects();
    fetchMaterialLogs();
  }, []);

  // Chart Data
  const projectStatusData = (() => {
    const statusCount = {};
    projects.forEach(p => {
      const status = p.status || 'Unknown';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });
    return Object.entries(statusCount).map(([name, value]) => ({ name, value }));
  })();

  const logPerProjectData = (() => {
    const count = {};
    logs.forEach(l => {
      const pname = l.project?.name || 'Unknown';
      count[pname] = (count[pname] || 0) + 1;
    });
    return Object.entries(count).map(([name, value]) => ({ name, value }));
  })();

  const materialUsageData = (() => {
    const usage = {};
    materialLogs.forEach(log => {
      log.materials?.forEach(mat => {
        usage[mat.materialName] = (usage[mat.materialName] || 0) + Number(mat.quantity || 0);
      });
    });
    return Object.entries(usage).map(([name, value]) => ({ name, value }));
  })();

  return (
    <div style={{ background: 'linear-gradient(120deg, #e3f0ff 0%, #f8fdff 100%)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar role="Engineer" />
        <div style={{ flex: 1, padding: '32px 18px 18px 18px', maxWidth: 1400, margin: '0 auto' }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#1976d2', mb: 2, letterSpacing: 1 }}>
            👷 Engineer Dashboard
          </Typography>
          <Typography sx={{ mb: 3, color: '#333', fontSize: 18 }}>
            Welcome, <strong>{engineer ? engineer.name : 'Engineer'}</strong>! Here’s a quick overview of your site activity and progress.
          </Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ borderRadius: 4, background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)', color: '#fff', boxShadow: 3 }}>
                <CardContent>
                  <Typography fontWeight={600} sx={{ opacity: 0.93 }}>Assigned Projects</Typography>
                  <Typography fontWeight={800} variant="h4" sx={{ mt: 1 }}>{projects.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ borderRadius: 4, background: 'linear-gradient(90deg, #009688 0%, #4dd0e1 100%)', color: '#fff', boxShadow: 3 }}>
                <CardContent>
                  <Typography fontWeight={600} sx={{ opacity: 0.93 }}>Logs Submitted</Typography>
                  <Typography fontWeight={800} variant="h4" sx={{ mt: 1 }}>{logs.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ borderRadius: 4, background: 'linear-gradient(90deg, #388e3c 0%, #81c784 100%)', color: '#fff', boxShadow: 3 }}>
                <CardContent>
                  <Typography fontWeight={600} sx={{ opacity: 0.93 }}>Material Logs</Typography>
                  <Typography fontWeight={800} variant="h4" sx={{ mt: 1 }}>{materialLogs.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3, height: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#1976d2' }}>
                  Project Status Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      label
                    >
                      {projectStatusData.map((entry, idx) => (
                        <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3, height: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#009688' }}>
                  Logs per Project
                </Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={logPerProjectData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    barSize={40}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontWeight: 600, fontSize: 14 }} />
                    <YAxis allowDecimals={false} tick={{ fontWeight: 600, fontSize: 14 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#009688">
                      {logPerProjectData.map((entry, idx) => (
                        <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3, height: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#43a047' }}>
                  Material Usage Summary
                </Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={materialUsageData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    barSize={40}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontWeight: 600, fontSize: 14 }} />
                    <YAxis allowDecimals={false} tick={{ fontWeight: 600, fontSize: 14 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#43a047">
                      {materialUsageData.map((entry, idx) => (
                        <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default EngineerDashboard;