import React from 'react';
import Home from './pages/Home';
import About from './pages/general/About';
import Service from './pages/general/Service';
import Projects from './pages/general/Project';
import ContactPage from './pages/general/ContactPage';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/general/ForgotPassword';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AddProject from './pages/admin/AddProject';
import CreateReports from './pages/admin/Reports';
import ViewReports from './pages/admin/ViewReports';
import OverseeProjects from './pages/admin/OverseeProjects';
import ManageLogs from './pages/admin/ManageLogs';
import Enquiries from './pages/admin/Enquiry';

import ProjectFiles from './pages/admin/ProjectFiles';

import EngineerDashboard from './pages/engineer/EngineerDashboard';
import CreateSiteLogs from './pages/engineer/CreateLog';
import AssignedProjects from './pages/engineer/AssignedProjects';
import MyLogs from './pages/engineer/MyLogs';
import MaterialLogs from './pages/engineer/MaterialLogs';



import ClientDashboard from './pages/client/ClientDashboard';
import ViewImages from './pages/client/Gallery';
import ViewReport from './pages/client/ViewReports';


import NotAuthorized from './pages/general/NotAuthorized';
import PrivateRoute from './routes/PrivateRoute';
import { Routes, Route, Navigate } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';


import './App.css';

function App() {
  return (
    <Provider store={store}>
      
      <Routes>
        {/* Redirect root to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute roles={['Admin']} />}>
  <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
  <Route path="/admin/manage-users" element={<ManageUsers />} />
  <Route path="/admin/add-project" element={<AddProject />} />
  <Route path="/admin/create-reports" element={<CreateReports />} />
  <Route path="/admin/view-reports" element={<ViewReports />} />
  <Route path="/admin/oversee-projects" element={<OverseeProjects />} />
  <Route path="/admin/manage-logs" element={<ManageLogs />} />
  <Route path="/admin/enquiries" element={<Enquiries />} />
  <Route path="/admin/project-files/:projectId" element={<ProjectFiles />} />
 </Route>


     <Route element={<PrivateRoute roles={['Engineer']} />}>
  <Route path="/engineer" element={<EngineerDashboard />} />
  <Route path="/engineer/site-logs" element={<CreateSiteLogs />} />
  <Route path="/engineer/assigned-projects" element={<AssignedProjects />} />
  <Route path="/engineer/my-logs" element={<MyLogs />} />
  <Route path="/engineer/material-logs" element={<MaterialLogs />} />
</Route>


       
        <Route element={<PrivateRoute roles={['Client']} />}>
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/view-images" element={<ViewImages />} />
          <Route path="/client/view-reports" element={<ViewReport />} />
        </Route>


        {/* Catch-all route for 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Provider>
  );
}

export default App;