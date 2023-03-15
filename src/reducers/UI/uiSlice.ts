import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { registerLoginUser, registerUser } from '../user/userMiddleware';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: 'Homme' | 'Femme';
}

export interface ErrorsForm {
  login: any;
  registration: any;
}

export interface UIState {
  isDark: boolean;
  errors: ErrorsForm;
  isRegistered: boolean;
  isDrawerOpen: boolean;
  user: User;
  isEdit: boolean;
}

const initialState: UIState = {
  isDark: JSON.parse(localStorage.getItem('isDark') || 'false'),
  errors: { login: null, registration: null },
  isRegistered: false,
  isDrawerOpen: false,
  isEdit: false,
  user: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    gender: 'Homme',
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
    setValue: (state, action: PayloadAction<{ page: string; value: string; name: string }>) => {
      const { page, value, name } = action.payload;
      return {
        ...state,
        [page]: {
          ...state.user,
          [name]: value,
        },
      };
    },
    setGender: (state, action: PayloadAction<'Homme' | 'Femme'>) => {
      return {
        ...state,
        user: {
          ...state.user,
          gender: action.payload,
        },
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
          isRegistered: true,
          user: { ...state.user, password: '' },
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

export const { toggleTheme, toggleDrawer, toggleForm, setValue, setGender, setIsEdit } = UISlice.actions;

export const selectTheme = (state: RootState) => state.ui.isDark;
export const selectDrawerState = (state: RootState) => state.ui.isDrawerOpen;
export const selectForm = (state: RootState) => state.ui.isRegistered;
export const selectUser = (state: RootState) => state.ui.user;
export const selectAuthErrors = (state: RootState) => state.ui.errors;
export const selectIsEdit = (state: RootState) => state.ui.isEdit;

export default UISlice.reducer;
