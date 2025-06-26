import React, { useEffect, useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center py-8">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Manage Users</h2>
        </div>
        {loading ? (
          <p className="text-blue-700 font-semibold">Loading users...</p>
        ) : error ? (
          <p className="text-red-600 font-semibold">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="px-4 py-2 font-bold">Name</th>
                  <th className="px-4 py-2 font-bold">Email</th>
                  <th className="px-4 py-2 font-bold">Phone</th>
                  <th className="px-4 py-2 font-bold">Role</th>
                  <th className="px-4 py-2 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-t border-gray-100 hover:bg-blue-50">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phone || '-'}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={user.role === 'Admin'}
                        title={user.role === 'Admin' ? "Can't delete admin" : "Delete user"}
                        className={`px-3 py-1 rounded-md font-semibold text-white transition 
                          ${user.role === 'Admin'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700 cursor-pointer'
                          }`}
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
  );
};

export default ManageUsers;