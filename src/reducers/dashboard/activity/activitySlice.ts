import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity, AlertMessage } from '../../../Interfaces/API_Interfaces';
import { ActivityState } from '../../../Interfaces/Reducers-Interfaces';
import { RootState } from '../../../store/store';
import { deleteSport, editSport, postSport } from './sportMiddleware';

const initialState: ActivityState = {
  id: null,
  message: { severity: 'info', message: '' },
  activities: [],
};

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      return { ...state, activities: action.payload };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSport.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(postSport.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(editSport.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(editSport.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(deleteSport.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(deleteSport.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      });
  },
});

export const { setActivities } = activitySlice.actions;

export const selectActivities = (state: RootState) => state.activity.activities;
export const selectActivityMessage = (state: RootState) => state.activity.message;

export default activitySlice.reducer;
