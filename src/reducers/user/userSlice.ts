import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, registerLoginUser } from './userMiddleware';
import { dataHydrationApi } from '../dashboard/hydration/hydrationSlice';
import { dataProfilApi } from '../dashboard/profil/profilSlice';
import { dataSmokeApi } from '../dashboard/smoke/smokeSlice';
import { dataSportApi } from '../dashboard/sport/sportSlice';
import { dataDrugApi } from '../dashboard/drug/drugSlice';
import { RootState } from '../../store/store';
import { calcAge, sortByDate } from '../../utils/math';
import { dataSleepApi } from '../dashboard/sleep/sleepSlice';
import { dataFoodApi } from '../dashboard/food/foodSlice';

export interface UserState {
  isLogged: boolean;
  token: string;
  firstname: string;
  gender: 'Femme' | 'Homme' | '';
  properties: dataProfilApi[];
  medicalTreatments: dataDrugApi[];
  cigarettes: dataSmokeApi[];
  caloricAlimentations: dataFoodApi[];
  hydratations: dataHydrationApi[];
  activities: dataSportApi[];
  sleeps: dataSleepApi[];
}

const initialState: UserState = {
  isLogged: false,
  token: localStorage.getItem('token') || '',
  firstname: '',
  gender: '',
  properties: [],
  medicalTreatments: [],
  cigarettes: [],
  caloricAlimentations: [],
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
    setIsLogged: (state) => {
      return { ...state, isLogged: true };
    },
    onLogout: (state, action: PayloadAction<boolean>) => {
      localStorage.clear();
      return { ...initialState };
    },
    setSleeps: (state, action: PayloadAction<dataSleepApi>) => {
      return {
        ...state,
        sleeps: [...state.sleeps, action.payload].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      };
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
      return {
        ...state,
        hydratations: [...state.hydratations, { ...action.payload }].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      };
    },
    removeHydration: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        hydratations: state.hydratations.filter((hydratation) => hydratation.id !== action.payload),
      };
    },
    updateHydration: (state, action: PayloadAction<dataHydrationApi>) => {
      const index = state.hydratations.findIndex((hydratation) => hydratation.id === action.payload.id);
      if (index !== -1) {
        state.hydratations[index] = action.payload;
      }
    },
    setDrug: (state, action: PayloadAction<dataDrugApi>) => {
      return {
        ...state,
        medicalTreatments: [...state.medicalTreatments, { ...action.payload }].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      };
    },
    removeDrug: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        medicalTreatments: state.medicalTreatments.filter((drug) => drug.id !== action.payload),
      };
    },
    updateDrug: (state, action: PayloadAction<dataDrugApi>) => {
      const index = state.medicalTreatments.findIndex((drug) => drug.id === action.payload.id);
      if (index !== -1) {
        state.medicalTreatments[index] = action.payload;
      }
    },
    setSmoke: (state, action: PayloadAction<dataSmokeApi>) => {
      return {
        ...state,
        cigarettes: [...state.cigarettes, { ...action.payload }].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      };
    },
    removeSmoke: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        cigarettes: state.cigarettes.filter((cigarette) => cigarette.id !== action.payload),
      };
    },
    updateSmoke: (state, action: PayloadAction<dataSmokeApi>) => {
      const index = state.cigarettes.findIndex((cigarette) => cigarette.id === action.payload.id);
      if (index !== -1) {
        state.cigarettes[index] = action.payload;
      }
    },
    setSport: (state, action: PayloadAction<dataSportApi>) => {
      return {
        ...state,
        activities: [...state.activities, { ...action.payload }].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      };
    },
    removeSport: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        activities: state.activities.filter((activity) => activity.id !== action.payload),
      };
    },
    updateSport: (state, action: PayloadAction<dataSportApi>) => {
      const index = state.activities.findIndex((activity) => activity.id === action.payload.id);
      if (index !== -1) {
        state.activities[index] = action.payload;
      }
    },
    setFood: (state, action: PayloadAction<dataFoodApi>) => {
      return {
        ...state,
        caloricAlimentations: [...state.caloricAlimentations, { ...action.payload }],
      };
    },
    removeFood: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        caloricAlimentations: state.caloricAlimentations.filter((food) => food.id !== action.payload),
      };
    },
    updateFood: (state, action: PayloadAction<dataFoodApi>) => {
      const index = state.caloricAlimentations.findIndex((food) => food.id === action.payload.id);
      if (index !== -1) {
        state.caloricAlimentations[index] = action.payload;
      }
    },
    setProperties: (state, action: PayloadAction<dataProfilApi>) => {
      return {
        ...state,
        properties: [...state.properties, { ...action.payload }],
      };
    },
    updateProperties: (state, action: PayloadAction<dataProfilApi>) => {
      const index = state.properties.findIndex((property) => property.id === action.payload.id);
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerLoginUser.pending, (state) => {
        // todo
      })
      .addCase(registerLoginUser.fulfilled, (state, action) => {
        return { ...state, isLogged: true, token: action.payload };
      })
      .addCase(registerLoginUser.rejected, (state) => {
        return { ...state, isLogged: false };
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          sleeps: sortByDate(action.payload.sleeps),
          medicalTreatments: sortByDate(action.payload.medicalTreatments),
          cigarettes: sortByDate(action.payload.cigarettes),
          activities: sortByDate(action.payload.activities),
          hydratations: sortByDate(action.payload.hydratations),
          caloricAlimentations: sortByDate(action.payload.caloricAlimentations),
        };
      });
  },
});

export const {
  setDateOfBirth,
  setWeight,
  setHeight,
  onLogout,
  setIsLogged,
  setSleeps,
  removeSleeps,
  updateSleeps,
  setHydration,
  removeHydration,
  updateHydration,
  setDrug,
  removeDrug,
  updateDrug,
  setSmoke,
  removeSmoke,
  updateSmoke,
  setSport,
  removeSport,
  updateSport,
  setFood,
  removeFood,
  updateFood,
  setProperties,
  updateProperties,
} = userSlice.actions;

export const selectFirstName = (state: RootState) => state.user.firstname;
export const selectGender = (state: RootState) => state.user.gender;
export const selectIsLogged = (state: RootState) => state.user.isLogged;
export const selectSleeps = (state: RootState) => state.user.sleeps;
export const selectDrugs = (state: RootState) => state.user.medicalTreatments;
export const selectHydrations = (state: RootState) => state.user.hydratations;
export const selectSmokes = (state: RootState) => state.user.cigarettes;
export const selectSports = (state: RootState) => state.user.activities;
export const selectToken = (state: RootState) => state.user.token;
export const selectFoods = (state: RootState) => state.user.caloricAlimentations;
export const selectProperties = (state: RootState) => state.user.properties;

export default userSlice.reducer;
