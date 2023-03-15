import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessage } from '../../../Interfaces/AlertMessage';
import { SmokeResponse } from '../../../Interfaces/API_Interfaces';
import { RootState } from '../../../store/store';
import { deleteSmoke, editSmoke, postSmoke } from './smokeMiddleware';

export interface SmokeState {
  id: number | null;
  message: AlertMessage;
  date: string | null;
  quantity: number | '';
}

const initialState: SmokeState = {
  id: null,
  message: { severity: 'info', message: '' },
  date: null,
  quantity: '',
};

export const smokeSlice = createSlice({
  name: 'smoke',
  initialState,
  reducers: {
    setSmokeDate: (state, action: PayloadAction<string>) => {
      return { ...state, date: action.payload };
    },
    setSmokeQuantity: (state, action: PayloadAction<number>) => {
      return { ...state, quantity: action.payload };
    },
    setSelectedSmoke: (state, action: PayloadAction<SmokeResponse>) => {
      return { ...state, ...action.payload };
    },
    resetSmokeInputs: (state) => {
      return { ...initialState };
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

export const { setSmokeDate, setSmokeQuantity, setSelectedSmoke, resetSmokeInputs } = smokeSlice.actions;

export const selectSmokeDate = (state: RootState) => state.smoke.date;
export const selectSmokeQuantity = (state: RootState) => state.smoke.quantity;
export const selectSmokeMessage = (state: RootState) => state.smoke.message;

export default smokeSlice.reducer;
