import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Smoke, AlertMessage } from '../../../Interfaces/API_Interfaces';
import { RootState } from '../../../store/store';
import { deleteSmoke, editSmoke, postSmoke } from './smokeMiddleware';

export interface SmokeState {
  message: AlertMessage;
  smokes: Smoke[];
}

const initialState: SmokeState = {
  message: { severity: 'info', message: '' },
  smokes: [],
};

export const smokeSlice = createSlice({
  name: 'smoke',
  initialState,
  reducers: {
    setSmokes: (state, action: PayloadAction<Smoke[]>) => {
      return { ...state, smokes: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSmoke.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(postSmoke.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(editSmoke.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(editSmoke.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(deleteSmoke.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(deleteSmoke.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      });
  },
});

export const { setSmokes } = smokeSlice.actions;

export const selectSmokeMessage = (state: RootState) => state.smoke.message;
export const selectSmokes = (state: RootState) => state.smoke.smokes;

export default smokeSlice.reducer;
