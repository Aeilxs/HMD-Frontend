import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface sportState {
  date: string;
  type: 'course' | 'marche' | 'natation' | 'velo' | 'exercices' | '';
  duration: number | '';
  intensity: 'Faible' | 'Modérée' | 'Élevée';
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
  date: 'Wed, 15 Jul 1998 22:00:00 GMT',
  type: 'course',
  duration: '',
  intensity: 'Modérée',
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
      return { ...state, duration: action.payload };
    },
    setIntensity: (state, action: PayloadAction<'Faible' | 'Modérée' | 'Élevée'>) => {
      return { ...state, intensity: action.payload };
    },
    setDate: (state, action: PayloadAction<string>) => {
      return { ...state, date: action.payload };
    },
  },
});

export const { setType, setDuration, setIntensity, setDate } = sportSlice.actions;

export const selectDate = (state: RootState) => state.sport.date;
export const selectType = (state: RootState) => state.sport.type;
export const selectDuration = (state: RootState) => state.sport.duration;
export const selectIntensity = (state: RootState) => state.sport.intensity;

export default sportSlice.reducer;
