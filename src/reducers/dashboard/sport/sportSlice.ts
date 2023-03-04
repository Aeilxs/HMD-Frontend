import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { postSport } from './sportMiddleware';

export interface sportState {
  id: number | null;
  date: string | null;
  type: string;
  time: number | '';
  intensity: '' | number;
}

export interface dataSportApi {
  id: number;
  type: string;
  time: number;
  intensity: number;
  caloriesPerSession: number;
  date: string;
}

const initialState: sportState = {
  id: null,
  date: null,
  type: 'course',
  time: '',
  intensity: '',
};

export const sportSlice = createSlice({
  name: 'sport',
  initialState,
  reducers: {
    setType: (
      state,
      action: PayloadAction<'course' | 'marche' | 'natation' | 'velo' | 'exercices'>
    ) => {
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
    setSelectedSport: (state, action: PayloadAction<dataSportApi>) => {
      return { ...state, ...action.payload };
    },
    resetInputs: (state) => {
      return { ...state, date: null, type: '', time: '', intensity: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSport.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(postSport.rejected, () => {
        console.error('non');
        // en cas d'erreur
      });
  },
});

export const { setType, setDuration, setIntensity, setDate, setSelectedSport, resetInputs } =
  sportSlice.actions;

export const selectDate = (state: RootState) => state.sport.date;
export const selectType = (state: RootState) => state.sport.type;
export const selectDuration = (state: RootState) => state.sport.time;
export const selectIntensity = (state: RootState) => state.sport.intensity;

export default sportSlice.reducer;
