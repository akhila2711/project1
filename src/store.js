import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/slices/authSlice';
import reportReducer from './redux/slices/reportSlice';
import projectReducer from './redux/slices/projectSlice'; 



const store = configureStore({
  reducer: {
    auth: authReducer,
    reports: reportReducer,
    projects: projectReducer,
   
    
  },
});

export default store;
