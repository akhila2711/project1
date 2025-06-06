import React, { useEffect, useState } from 'react';
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
    <div style={{ padding: '40px' }}>
      <h2>Assigned Projects</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div style={{ maxWidth: 300, marginBottom: 16 }}>
        <label htmlFor="project-filter"><b>Filter by Project:</b></label>
        <select
          id="project-filter"
          value={projectFilter}
          onChange={e => setProjectFilter(e.target.value)}
          style={{ width: '100%', padding: 6, marginTop: 4 }}
        >
          <option value="">All Projects</option>
          {projectOptions.map((name, idx) => (
            <option key={idx} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Client</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Budget</th>
            <th>Description</th>
            <th>Document</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center' }}>No assigned projects found.</td>
            </tr>
          ) : (
            filteredProjects.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.client}</td>
                <td>{p.location}</td>
                <td>{p.startDate ? new Date(p.startDate).toLocaleDateString() : ''}</td>
                <td>{p.endDate ? new Date(p.endDate).toLocaleDateString() : ''}</td>
                <td>{p.status}</td>
                <td>{p.budget}</td>
                <td>{p.description}</td>
                <td>
  {p.documentUrl ? (
    <a
      href={
        isExternalUrl(p.documentUrl)
          ? p.documentUrl
          : p.documentUrl.startsWith('uploads/')
            ? `/${p.documentUrl.replace(/\\/g, '/')}`
            : `/uploads/${p.documentUrl.replace(/\\/g, '/')}`
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      View
    </a>
  ) : (
    '-'
  )}
</td>
<td>
  {p.imageUrls && p.imageUrls.length > 0
    ? p.imageUrls.map((img, idx) => (
        <a
          key={idx}
          href={
            isExternalUrl(img)
              ? img
              : img.startsWith('uploads/')
                ? `/${img.replace(/\\/g, '/')}`
                : `/uploads/${img.replace(/\\/g, '/')}`
          }
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: 4 }}
        >
          Image {idx + 1}
        </a>
      ))
    : '-'}
</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedProjects;