import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessage } from '../../../Interfaces/AlertMessage';
import { ActivityResponse } from '../../../Interfaces/API_Interfaces';
import { RootState } from '../../../store/store';
import { deleteSport, editSport, postSport } from './sportMiddleware';

export interface sportState {
  id: number | null;
  message: AlertMessage;
  date: string | null;
  type: string;
  time: number | '';
  intensity: '' | number;
}

const initialState: sportState = {
  id: null,
  message: { severity: 'info', message: '' },
  date: null,
  type: 'course',
  time: '',
  intensity: '',
};

export const sportSlice = createSlice({
  name: 'sport',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<'course' | 'marche' | 'natation' | 'velo' | 'exercices'>) => {
      return { ...state, type: action.payload };
    },
    setDuration: (state, action: PayloadAction<number>) => {
      return { ...state, time: action.payload };
    },
    setIntensity: (state, action: PayloadAction<number>) => {
      return { ...state, intensity: action.payload };
    },
    setDate: (state, action: PayloadAction<string>) => {
      return { ...state, date: action.payload };
    },
    setSelectedSport: (state, action: PayloadAction<ActivityResponse>) => {
      return { ...state, ...action.payload };
    },
    resetSportInputs: (state) => {
      return { ...initialState };
    },
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

export const { setType, setDuration, setIntensity, setDate, setSelectedSport, resetSportInputs } = sportSlice.actions;

export const selectDate = (state: RootState) => state.sport.date;
export const selectType = (state: RootState) => state.sport.type;
export const selectDuration = (state: RootState) => state.sport.time;
export const selectIntensity = (state: RootState) => state.sport.intensity;
export const selectSportMessage = (state: RootState) => state.sport.message;

export default sportSlice.reducer;
