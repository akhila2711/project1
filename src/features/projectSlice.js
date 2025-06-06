import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axios'; // <-- use your custom axios instance

export const addNewProject = createAsyncThunk(
  'project/addNewProject',
  async (projectData, thunkAPI) => {
    const response = await api.post('/projects', projectData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState: { projects: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.loading = false;
      })
      .addCase(addNewProject.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default projectSlice.reducer;