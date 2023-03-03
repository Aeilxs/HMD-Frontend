import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { editSleep, postSleep } from './sleepMiddleware';

export interface SleepState {
  id: number | null;
  isEdit: boolean,
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
  id:null,
  isEdit: false,
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
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      return { ...state, isEdit: action.payload };
    },
    setSelectedSleep: (state, action: PayloadAction<dataSleepApi>) =>{
      return {...state, ...action.payload, quantity: action.payload.time}
    },
    resetInputs: (state) => {
      return { ...state, date: null, quantity:'', quality:'' }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSleep.fulfilled, (state, action) => {
        return {...state, ...action.payload}
      })
      .addCase(postSleep.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(editSleep.fulfilled, (state, action) => {
        return { ...state, isEdit: false };
      })
      .addCase(editSleep.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const { setDate, setQuantity, setQuality, setIsEdit, setSelectedSleep, resetInputs } = sleepSlice.actions;

export const selectSleepDate = (state: RootState) => state.sleep.date;
export const selectSleepQuantity = (state: RootState) => state.sleep.quantity;
export const selectSleepQuality = (state: RootState) => state.sleep.quality;
export const selectIsEdit = (state: RootState) => state.sleep.isEdit;

export default sleepSlice.reducer;
