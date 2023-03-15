import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, registerLoginUser } from './userMiddleware';
import { RootState } from '../../store/store';
import { calcAge, sortByDate } from '../../utils/math';
import {
  ActivityResponse,
  DrugResponse,
  FoodResponse,
  HydrationResponse,
  SleepResponse,
  SmokeResponse,
} from '../../Interfaces/API_Interfaces';

export interface UserState {
  isLogged: boolean;
  token: string;
  firstname: string;
  gender: 'Femme' | 'Homme' | '';
  activities: ActivityResponse[];
  drugs: DrugResponse[];
  foods: FoodResponse[];
  hydrations: HydrationResponse[];
  sleeps: SleepResponse[];
  smokes: SmokeResponse[];
}

const initialState: UserState = {
  isLogged: false,
  token: localStorage.getItem('token') || '',
  firstname: '',
  gender: '',
  activities: [],
  drugs: [],
  foods: [],
  hydrations: [],
  sleeps: [],
  smokes: [],
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

    setIsLogged: (state) => {
      return { ...state, isLogged: true };
    },
    onLogout: (state, action: PayloadAction<boolean>) => {
      localStorage.clear();
      return { ...initialState };
    },
    setSleeps: (state, action: PayloadAction<SleepResponse>) => {
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
    updateSleeps: (state, action: PayloadAction<SleepResponse>) => {
      const index = state.sleeps.findIndex((sleep) => sleep.id === action.payload.id);
      if (index !== -1) {
        state.sleeps[index] = action.payload;
      }
    },
    setHydration: (state, action: PayloadAction<HydrationResponse>) => {
      return {
        ...state,
        hydrations: [...state.hydrations, { ...action.payload }].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      };
    },
    removeHydration: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        hydrations: state.hydrations.filter((hydratation) => hydratation.id !== action.payload),
      };
    },
    updateHydration: (state, action: PayloadAction<HydrationResponse>) => {
      const index = state.hydrations.findIndex((hydratation) => hydratation.id === action.payload.id);
      if (index !== -1) {
        state.hydrations[index] = action.payload;
      }
    },
    setDrug: (state, action: PayloadAction<DrugResponse>) => {
      return {
        ...state,
        drugs: [...state.drugs, { ...action.payload }].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      };
    },
    removeDrug: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        drugs: state.drugs.filter((drug) => drug.id !== action.payload),
      };
    },
    updateDrug: (state, action: PayloadAction<DrugResponse>) => {
      const index = state.drugs.findIndex((drug) => drug.id === action.payload.id);
      if (index !== -1) {
        state.drugs[index] = action.payload;
      }
    },
    setSmoke: (state, action: PayloadAction<SmokeResponse>) => {
      return {
        ...state,
        smokes: [...state.smokes, { ...action.payload }].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      };
    },
    removeSmoke: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        cigarettes: state.smokes.filter((cigarette) => cigarette.id !== action.payload),
      };
    },
    updateSmoke: (state, action: PayloadAction<SmokeResponse>) => {
      const index = state.smokes.findIndex((cigarette) => cigarette.id === action.payload.id);
      if (index !== -1) {
        state.smokes[index] = action.payload;
      }
    },
    setSport: (state, action: PayloadAction<ActivityResponse>) => {
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
    updateSport: (state, action: PayloadAction<ActivityResponse>) => {
      const index = state.activities.findIndex((activity) => activity.id === action.payload.id);
      if (index !== -1) {
        state.activities[index] = action.payload;
      }
    },
    setFood: (state, action: PayloadAction<FoodResponse>) => {
      return {
        ...state,
        foods: [...state.foods, { ...action.payload }],
      };
    },
    removeFood: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        foods: state.foods.filter((food) => food.id !== action.payload),
      };
    },
    updateFood: (state, action: PayloadAction<FoodResponse>) => {
      const index = state.foods.findIndex((food) => food.id === action.payload.id);
      if (index !== -1) {
        state.foods[index] = action.payload;
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
        const fetchedUser = action.payload;
        console.log(fetchedUser);
        return {
          ...state,
          ...action.payload,
          sleeps: sortByDate(action.payload.sleeps),
          medicalTreatments: sortByDate(fetchedUser.drugs),
          smokes: sortByDate(fetchedUser.smokes),
          activities: sortByDate(fetchedUser.activities),
          hydrations: sortByDate(fetchedUser.hydrations),
          caloricAlimentations: sortByDate(fetchedUser.caloricAlimentations),
        };
      });
  },
});

export const {
  setDateOfBirth,
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
} = userSlice.actions;

export const selectFirstName = (state: RootState) => state.user.firstname;
export const selectGender = (state: RootState) => state.user.gender;
export const selectIsLogged = (state: RootState) => state.user.isLogged;
export const selectSleeps = (state: RootState) => state.user.sleeps;
export const selectDrugs = (state: RootState) => state.user.drugs;
export const selectHydrations = (state: RootState) => state.user.hydrations;
export const selectSmokes = (state: RootState) => state.user.smokes;
export const selectSports = (state: RootState) => state.user.activities;
export const selectToken = (state: RootState) => state.user.token;
export const selectFoods = (state: RootState) => state.user.foods;

export default userSlice.reducer;
