import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { postSleep } from './sleepMiddleware';

export interface SleepState {
  date: string | null;
  quantity: number | '';
  quality: number | '';
}

export interface dataSleepApi {
  id: number;
  time: number;
  quality: number;
  date: string;
}

const initialState: SleepState = {
  date: null,
  quantity: '',
  quality: '',
};

export const sleepSlice = createSlice({
  name: 'sleep',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      return { ...state, date: action.payload };
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      return { ...state, quantity: action.payload };
    },
    setQuality: (state, action: PayloadAction<number>) => {
      return { ...state, quality: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSleep.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(postSleep.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const { setDate, setQuantity, setQuality } = sleepSlice.actions;

export const selectSleepDate = (state: RootState) => state.sleep.date;
export const selectSleepQuantity = (state: RootState) => state.sleep.quantity;
export const selectSleepQuality = (state: RootState) => state.sleep.quality;

export default sleepSlice.reducer;
