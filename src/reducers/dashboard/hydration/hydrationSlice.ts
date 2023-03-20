import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../store/store';
import { Hydration, AlertMessage } from '../../../Interfaces/API_Interfaces';
import { deleteHydration, postHydration } from './hydrationMiddleware';

export interface HydrationState {
  message: AlertMessage;
  hydrations: Hydration[];
}

const initialState: HydrationState = {
  message: { severity: 'info', message: '' },
  hydrations: [],
};

export const hydrationSlice = createSlice({
  name: 'hydration',
  initialState,
  reducers: {
    setHydrations: (state, action: PayloadAction<Hydration[]>) => {
      return { ...state, hydrations: action.payload };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postHydration.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(postHydration.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(deleteHydration.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(deleteHydration.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      });
  },
});

export const { setHydrations } = hydrationSlice.actions;

export const selectHydrationMessage = (state: RootState) => state.hydration.message;
export const selectHydrations = (state: RootState) => state.hydration.hydrations;

export default hydrationSlice.reducer;
