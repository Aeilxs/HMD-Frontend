import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessage } from '../../../shared/Interfaces/AlertMessage';
import { RootState } from '../../../store/store';
import { calcAge } from '../../../utils/math';
import { editProfil, postProfil } from './profilMiddleware';

export interface dataProfilApi {
  id: number;
  size: number;
  weight: number;
  age: number;
  dateOfBirth: string;
}

export interface ProfilState {
  dateOfBirth: string | null;
  message: AlertMessage;
  age: number | '';
  weight: number | '';
  size: number | '';
}

const initialState: ProfilState = {
  dateOfBirth: null,
  message: { severity: 'info', message: '' },
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
      return { ...state, size: action.payload };
    },
    setProfilInputs: (state, action: PayloadAction<dataProfilApi>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postProfil.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(postProfil.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(editProfil.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(editProfil.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      });
  },
});

export const { setDateOfBirth, setWeight, setHeight, setProfilInputs } = profilSlice.actions;

export const selectDateOfBirth = (state: RootState) => state.profil.dateOfBirth;
export const selectWeight = (state: RootState) => state.profil.weight;
export const selectHeight = (state: RootState) => state.profil.size;
export const selectAge = (state: RootState) => state.profil.age;
export const selectProfilMessage = (state: RootState) => state.profil.message;

export default profilSlice.reducer;
