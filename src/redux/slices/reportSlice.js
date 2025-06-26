import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulate backend report generation
export const generateReport = createAsyncThunk(
  'reports/generateReport',
  async (reportData, thunkAPI) => {
    // Simulate API call delay
    await new Promise(res => setTimeout(res, 1000));
    // Return a dummy report object
    return {
      ...reportData,
      name: reportData.reportType,
      type: reportData.reportType,
      date: new Date().toISOString().slice(0, 10),
      by: 'Manager',
      link: '/reports/' + reportData.reportType.replace(/\s/g, '-').toLowerCase() + '-' + Date.now() + '.pdf'
    };
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    history: [
      { name: 'Weekly Progress', type: 'Weekly', date: '2025-05-20', by: 'Manager', link: '/reports/weekly-2025-05-20.pdf' },
      { name: 'Monthly Summary', type: 'Monthly', date: '2025-05-01', by: 'Manager', link: '/reports/monthly-2025-05.pdf' }
    ],
    preview: null,
    loading: false,
    error: null,
  },
  reducers: {
    setPreview: (state, action) => {
      state.preview = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(generateReport.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.loading = false;
        state.history.unshift(action.payload);
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setPreview } = reportSlice.actions;
export default reportSlice.reducer;