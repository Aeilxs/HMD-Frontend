import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActivityInputs,
  AuthenticationInputs,
  DrugInputs,
  FoodInputs,
  HydrationInputs,
  InputPayload,
  ProfilInputs,
  PropertyPath,
  SleepInputs,
  SmokeInputs,
} from '../../Interfaces/inputs';

import { RootState } from '../../store/store';
import { registerLoginUser, registerUser } from '../user/userMiddleware';

export interface ErrorsForm {
  login: any;
  registration: any;
}

export interface UIState {
  isDark: boolean;
  errors: ErrorsForm;
  isRegistered: boolean;
  isDrawerOpen: boolean;
  isEdit: boolean;
  authenticationInputs: AuthenticationInputs;
  drugInputs: DrugInputs;
  foodInputs: FoodInputs;
  hydrationInputs: HydrationInputs;
  profilInputs: ProfilInputs;
  sleepInputs: SleepInputs;
  smokeInputs: SmokeInputs;
  activityInputs: ActivityInputs;
}

const initialState: UIState = {
  isDark: JSON.parse(localStorage.getItem('isDark') || 'false'),
  errors: { login: null, registration: null },
  isRegistered: false,
  isDrawerOpen: false,
  isEdit: false,
  activityInputs: {
    id: null,
    date: null,
    duration: '',
    intensity: '',
    type: '',
  },
  authenticationInputs: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    gender: 'femme',
  },
  drugInputs: {
    id: null,
    date: null,
    name: '',
    infos: '',
    quantity: '',
    unit: '',
  },
  foodInputs: {
    date: null,
    categories: [],
    search: '',
    page: 1,
    category: null,
    name: '',
  },
  hydrationInputs: {
    id: null,
    date: null,
    quantity: '',
  },
  profilInputs: {
    dateOfBirth: null,
    size: '',
    weight: '',
  },
  sleepInputs: {
    id: null,
    date: null,
    duration: '',
    quality: '',
  },
  smokeInputs: {
    id: null,
    date: null,
    quantity: '',
  },
};

export const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      localStorage.setItem('isDark', JSON.stringify(!state.isDark));
      return { ...state, isDark: !state.isDark };
    },
    toggleForm: (state, action: PayloadAction<boolean>) => {
      return { ...state, isRegistered: action.payload };
    },
    toggleDrawer: (state) => {
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    },
    setInputValue: (state, action: PayloadAction<InputPayload>) => {
      const { path, name, value } = action.payload;
      return {
        ...state,
        [path]: { ...state[path], [name]: value },
      };
    },
    resetInputValue: (state, action: PayloadAction<PropertyPath>) => {
      const path = action.payload;
      return { ...state, [path]: initialState[path] };
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      return { ...state, isEdit: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        return {
          ...state,
          errors: { ...state.errors, registration: '' },
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        return { ...state, errors: { ...state.errors, registration: action.payload } };
      })
      .addCase(registerLoginUser.fulfilled, (state, action) => {
        return { ...state, errors: { ...state.errors, login: '' } };
      })
      .addCase(registerLoginUser.rejected, (state, action) => {
        return { ...state, errors: { ...state.errors, login: action.payload } };
      });
  },
});

export const { toggleTheme, toggleDrawer, toggleForm, setInputValue, resetInputValue, setIsEdit } = UISlice.actions;

export const selectTheme = (state: RootState) => state.ui.isDark;
export const selectDrawerState = (state: RootState) => state.ui.isDrawerOpen;
export const selectForm = (state: RootState) => state.ui.isRegistered;
export const selectAuthErrors = (state: RootState) => state.ui.errors;
export const selectIsEdit = (state: RootState) => state.ui.isEdit;

export const selectActivityInputs = (state: RootState) => state.ui.activityInputs;
export const selectAuthenticationInputs = (state: RootState) => state.ui.authenticationInputs;
export const selectDrugInputs = (state: RootState) => state.ui.drugInputs;
export const selectFoodInputs = (state: RootState) => state.ui.foodInputs;
export const selectHydrationInputs = (state: RootState) => state.ui.hydrationInputs;
export const selectProfilInputs = (state: RootState) => state.ui.profilInputs;
export const selectSleepInputs = (state: RootState) => state.ui.sleepInputs;
export const selectSmokeInputs = (state: RootState) => state.ui.smokeInputs;

export default UISlice.reducer;
