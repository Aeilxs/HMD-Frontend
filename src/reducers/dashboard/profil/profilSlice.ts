import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { calcAge } from '../../../utils/math';
import { postProfil } from './profilMiddleware';

export interface dataProfilApi {
  id: number;
  size: number;
  weight: number;
  age: number;
  date: string;
}

export interface ProfilState {
  dateOfBirth: string | null;
  age: number;
  weight: number |'';
  height: number |'';
}

const initialState: ProfilState = {
  dateOfBirth: null,
  age: 0,
  weight: '',
  height: '',
};

export const profilSlice = createSlice({
  name: 'profil',
  initialState,
  reducers: {
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        dateOfBirth: action.payload,
        age: calcAge(action.payload),
      };
    },
    setWeight: (state, action: PayloadAction<number>) => {
      return { ...state, weight: action.payload };
    },
    setHeight: (state, action: PayloadAction<number>) => {
      return { ...state, height: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postProfil.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(postProfil.rejected, () => {
        console.error('non');
        // en cas d'erreur
      });
  },
});

export const { setDateOfBirth, setWeight, setHeight } = profilSlice.actions;

export const selectDateOfBirth = (state: RootState) => state.profil.dateOfBirth;
export const selectWeight = (state: RootState) => state.profil.weight;
export const selectHeight = (state: RootState) => state.profil.height;
export const selectAge = (state: RootState) => state.profil.age;

export default profilSlice.reducer;
