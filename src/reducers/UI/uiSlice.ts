import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActivityInputs,
  AuthenticationInputs,
  DrugInputs,
  FoodInputs,
  HydrationInputs,
  InputPayload,
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
    date: '',
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
    date: '',
    name: '',
    quantity: '',
    unit: '',
  },
  foodInputs: {
    date: '',
    name: '',
  },
  hydrationInputs: {
    date: '',
    quantity: '',
  },
  sleepInputs: {
    date: '',
    duration: '',
    quality: '',
  },
  smokeInputs: {
    date: '',
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
    setValue: (state, action: PayloadAction<InputPayload>) => {
      const { path, name, value } = action.payload;
      return {
        ...state,
        [path]: { ...state[path], [name]: value },
      };
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

export const { toggleTheme, toggleDrawer, toggleForm, setValue, setIsEdit } = UISlice.actions;

export const selectTheme = (state: RootState) => state.ui.isDark;
export const selectDrawerState = (state: RootState) => state.ui.isDrawerOpen;
export const selectForm = (state: RootState) => state.ui.isRegistered;
export const selectAuthErrors = (state: RootState) => state.ui.errors;
export const selectIsEdit = (state: RootState) => state.ui.isEdit;

export const selectAuthenticationInputs = (state: RootState) => state.ui.authenticationInputs;

export default UISlice.reducer;
