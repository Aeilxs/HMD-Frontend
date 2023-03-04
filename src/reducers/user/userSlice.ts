import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, registerLoginUser } from './userMiddleware';
import { dataHydrationApi } from '../dashboard/hydration/hydrationSlice';
import { dataProfilApi } from '../dashboard/profil/profilSlice';
import { dataSmokeApi } from '../dashboard/smoke/smokeSlice';
import { dataSportApi } from '../dashboard/sport/sportSlice';
import { dataDrugApi } from '../dashboard/drug/drugSlice';
import { RootState } from '../../store/store';
import { calcAge } from '../../utils/math';
import { dataSleepApi } from '../dashboard/sleep/sleepSlice';

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
    setSleeps: (state, action: PayloadAction<dataSleepApi>) => {
      return { ...state, sleeps: [...state.sleeps, { ...action.payload }] };
    },
    removeSleeps: (state, action: PayloadAction<number>) => {
      return { ...state, sleeps: state.sleeps.filter((sleep) => sleep.id !== action.payload) };
    },
    updateSleeps: (state, action: PayloadAction<dataSleepApi>) => {
      const index = state.sleeps.findIndex((sleep) => sleep.id === action.payload.id);
      if (index !== -1) {
        state.sleeps[index] = action.payload;
      }
    },
    setHydration: (state, action: PayloadAction<dataHydrationApi>) => {
      return { ...state, hydratations: [...state.hydratations, { ...action.payload }] };
    },
    removeHydration: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        hydratations: state.hydratations.filter((hydratation) => hydratation.id !== action.payload),
      };
    },
    updateHydration: (state, action: PayloadAction<dataHydrationApi>) => {
      const index = state.hydratations.findIndex(
        (hydratation) => hydratation.id === action.payload.id
      );
      if (index !== -1) {
        state.hydratations[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerLoginUser.fulfilled, (state, action) => {
        return action.payload === undefined
          ? { ...state, isLogged: false, token: '' }
          : { ...state, isLogged: true, token: action.payload };
      })
      .addCase(registerLoginUser.rejected, (state) => {
        return { ...state, isLogged: false };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action.payload);
        return { ...state, ...action.payload };
      });
  },
});

export const {
  setDateOfBirth,
  setWeight,
  setHeight,
  onLogout,
  setSleeps,
  removeSleeps,
  updateSleeps,
  setHydration,
  removeHydration,
  updateHydration,
} = userSlice.actions;

export const selectIsLogged = (state: RootState) => state.user.isLogged;
export const selectSleeps = (state: RootState) => state.user.sleeps;
export const selectDrugs = (state: RootState) => state.user.medicalTreatments;
export const selectHydrations = (state: RootState) => state.user.hydratations;
export const selectSmokes = (state: RootState) => state.user.cigarettes;
export const selectActivites = (state: RootState) => state.user.activities;

export default userSlice.reducer;
