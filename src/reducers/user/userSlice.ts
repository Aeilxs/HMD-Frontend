import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, registerLoginUser } from './userMiddleware';
import { dataHydrationApi } from '../dashboard/hydrationSlice';
import { dataProfilApi } from '../dashboard/profilSlice';
import { dataSmokeApi } from '../dashboard/smokeSlice';
import { dataSportApi } from '../dashboard/sportSlice';
import { dataDrugApi } from '../dashboard/drugSlice';
import { RootState } from '../../store/store';
import { calcAge } from '../../utils/math';
import { dataSleepApi } from '../dashboard/sleepSlice';

export interface UserState {
  isLogged: boolean;
  token: string;
  properties: dataProfilApi[];
  medicalTreatments: dataDrugApi[];
  cigarettes: dataSmokeApi[];
  caloricAlimentation: [];
  hydratations: dataHydrationApi[];
  activities: dataSportApi[];
  sleeps: dataSleepApi[];
}

const initialState: UserState = {
  isLogged: false,
  token: '',
  properties: [],
  medicalTreatments: [],
  cigarettes: [],
  caloricAlimentation: [],
  hydratations: [],
  activities: [],
  sleeps: [],
};

export const userSlice = createSlice({
  name: 'user',
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
    onLogout: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLogged: false, token: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerLoginUser.fulfilled, (state, action) => {
        return { ...state, isLogged: true, token: action.payload };
      })
      .addCase(registerLoginUser.rejected, () => {
        console.error('non');
        // en cas d'erreur
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action.payload);
        return { ...state, ...action.payload };
      });
  },
});

export const { setDateOfBirth, setWeight, setHeight, onLogout } = userSlice.actions;

export const selectIsLogged = (state: RootState) => state.user.isLogged;

export default userSlice.reducer;
