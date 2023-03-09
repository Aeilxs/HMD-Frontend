import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { editSmoke, postSmoke } from './smokeMiddleware';

export interface SmokeState {
  id: number | null;
  message: SmokeMessage;
  date: string | null;
  quantity: number | '';
}

export interface dataSmokeApi {
  id: number;
  quantity: number;
  date: string;
}

export interface SmokeMessage {
  severity: AlertColor;
  message: string;
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
    setSelectedSmoke: (state, action: PayloadAction<dataSmokeApi>) => {
      return { ...state, ...action.payload };
    },
    resetInputs: (state) => {
      return { ...state, date: null, quantity: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSmoke.fulfilled, (state, action) => {
        const { severity, message } = action.payload as SmokeMessage;
        return { ...state, message: { severity: severity, message: message } };
      })
      .addCase(postSmoke.rejected, (state, action) => {
        const { severity, message } = action.payload as SmokeMessage;
        return { ...state, message: { severity: severity, message: message } };
      })
      .addCase(editSmoke.fulfilled, (state, action) => {
        return { ...state, isEdit: false };
      })
      .addCase(editSmoke.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const { setSmokeDate, setSmokeQuantity, setSelectedSmoke, resetInputs } = smokeSlice.actions;

export const selectSmokeDate = (state: RootState) => state.smoke.date;
export const selectSmokeQuantity = (state: RootState) => state.smoke.quantity;
export const selectSmokeMessage = (state: RootState) => state.smoke.message;

export default smokeSlice.reducer;
