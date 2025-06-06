import React, { useEffect, useState } from 'react';

import './ManageUser.css';
import axios from '../../api/axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="manage-users-layout">
   
      <div className="manage-users-main">
      
        <div className="manage-users-container">
          <div className="manage-users-content">
            <h2 className="manage-users-heading">Manage Users</h2>
            {loading ? (
              <p className="manage-users-loading">Loading users...</p>
            ) : error ? (
              <p className="manage-users-error">{error}</p>
            ) : (
              <div className="manage-users-table-wrapper">
                <table className="manage-users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || '-'}</td>
                        <td>{user.role}</td>
                        <td>
                          <button
                            onClick={() => handleDelete(user._id)}
                            disabled={user.role === 'Admin'}
                            title={user.role === 'Admin' ? "Can't delete admin" : "Delete user"}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;