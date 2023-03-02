import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

export interface SmokeState {
  date: string | null;
  quantity: number | '';
}

export interface dataSmokeApi {
  id: number;
  quantity: number;
  date: string;
}

const initialState: SmokeState = {
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
  },
});

export const { setSmokeDate, setSmokeQuantity } = smokeSlice.actions;

export const selectSmokeDate = (state: RootState) => state.smoke.date;
export const selectSmokeQuantity = (state: RootState) => state.smoke.quantity;

export default smokeSlice.reducer;
