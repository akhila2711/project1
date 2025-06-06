import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import reportReducer from './features/reports/reportSlice';
import projectReducer from './features/projectSlice'; 


const store = configureStore({
  reducer: {
    auth: authReducer,
    reports: reportReducer,
    projects: projectReducer,
  },
});

export default store;
