import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

import { deleteSleep, editSleep, postSleep } from './sleepMiddleware';
import { Sleep, AlertMessage } from '../../../Interfaces/API_Interfaces';

export interface SleepState {
  id: number | null;
  message: AlertMessage;
  sleeps: Sleep[];
}

const initialState: SleepState = {
  id: null,
  message: { severity: 'info', message: '' },
  sleeps: [],
};

export const sleepSlice = createSlice({
  name: 'sleep',
  initialState,
  reducers: {
    setSleeps: (state, action: PayloadAction<Sleep[]>) => {
      return { ...state, sleeps: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSleep.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(postSleep.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(editSleep.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(editSleep.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(deleteSleep.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(deleteSleep.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      });
  },
});

export const { setSleeps } = sleepSlice.actions;

export const selectSleepMessage = (state: RootState) => state.sleep.message;
export const selectSleeps = (state: RootState) => state.sleep.sleeps;

export default sleepSlice.reducer;
