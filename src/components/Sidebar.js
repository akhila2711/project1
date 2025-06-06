import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navItems = {
  Admin: [
    { label: '📊 Dashboard', to: '/admin/dashboard' },
    { label: '👥 Manage Users', to: '/admin/manage-users' },
    { label: '🧑‍⚖️ Add Project', to: '/admin/add-project' },
    { label: '🏗️ Oversee Projects', to: '/admin/oversee-projects' },
    { label: '📝 Create Reports', to: '/admin/create-reports' },
    { label: '📄 View Reports', to: '/admin/view-reports' },
    { label: '📂 Manage Logs', to: '/admin/manage-logs' },
    { label: '📩 Inquiries', to: '/admin/enquiries' },


  ],
  Engineer: [
    { label: '📊 Dashboard', to: '/engineer/dashboard' },
    { label: '📝 Create Site Logs', to: '/engineer/site-logs' },
    { label: '📂 My Logs', to: '/engineer/my-logs' },
    { label: '📂 Material Logs', to: '/engineer/material-logs' },
    { label: '📂 View Assigned Projects', to: '/engineer/assigned-projects' },
  ],
 
  Client: [
    { label: '📊 Dashboard', to: '/client/dashboard' },
    { label: '📄 Reports', to: '/client/view-reports' },
    { label: '🖼️ Gallery', to: '/client/view-images' },

  ],
};

const Sidebar = ({ role = 'Admin' }) => (
  <div className="sidebar">
    <h3 className="logo">{role} Panel</h3>
    <ul className="nav-list">
      {(navItems[role] || []).map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;