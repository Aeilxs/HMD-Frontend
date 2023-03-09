import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessage } from '../../../shared/Interfaces/AlertMessage';
import { RootState } from '../../../store/store';
import { deleteHydration, postHydration } from './hydrationMiddleware';

export interface HydrationState {
  id: number | null;
  message: AlertMessage;
  date: string | null;
  quantity: number | '';
}

export interface dataHydrationApi {
  id: number;
  quantity: number;
  date: string;
}

const initialState: HydrationState = {
  id: null,
  message: { severity: 'info', message: '' },
  date: null,
  quantity: '',
};

export const hydrationSlice = createSlice({
  name: 'hydration',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      return { ...state, date: action.payload };
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      return { ...state, quantity: action.payload };
    },
    setSelectedHydration: (state, action: PayloadAction<dataHydrationApi>) => {
      return { ...state, ...action.payload };
    },
    resetInputs: (state) => {
      return { ...state, date: null, quantity: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postHydration.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity: severity, message: message } };
      })
      .addCase(postHydration.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity: severity, message: message } };
      })
      .addCase(deleteHydration.fulfilled, (state, action) => {
        console.log(action.payload)
        const { severity, message } = action.payload as AlertMessage;
        return { ...state,  message: { severity: severity, message: message } };
      })
      .addCase(deleteHydration.rejected, (state, action) => {
        console.log(action.payload)
        const { severity, message } = action.payload as AlertMessage;
        return { ...state,  message: { severity: severity, message: message } };
      });
  },
});

export const { setDate, setQuantity, setSelectedHydration, resetInputs } = hydrationSlice.actions;

export const selectHydrationDate = (state: RootState) => state.hydration.date;
export const selectHydrationQuantity = (state: RootState) => state.hydration.quantity;
export const selectHydrationMessage = (state: RootState) => state.hydration.message;

export default hydrationSlice.reducer;
