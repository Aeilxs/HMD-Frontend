import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { calcAge } from '../../../utils/math';
import { postProfil } from './profilMiddleware';

export interface dataProfilApi {
  id: number;
  size: number;
  weight: number;
  age: number;
  dateOfBirth: string;
}

export interface ProfilState {
  dateOfBirth: string | null;
  age: number | '';
  weight: number |'';
  size: number |'';
}

const initialState: ProfilState = {
  dateOfBirth: null,
  age: '',
  weight: '',
  size: '',
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
    setProfilInputs: (state, action: PayloadAction<dataProfilApi>) => {
      return { ...state, ...action.payload };
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

export const { setDateOfBirth, setWeight, setHeight,setProfilInputs } = profilSlice.actions;

export const selectDateOfBirth = (state: RootState) => state.profil.dateOfBirth;
export const selectWeight = (state: RootState) => state.profil.weight;
export const selectHeight = (state: RootState) => state.profil.size;
export const selectAge = (state: RootState) => state.profil.age;

export default profilSlice.reducer;
