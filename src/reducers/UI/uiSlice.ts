import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface UIState {
  isDark: boolean;
  isRegistered: boolean;
  isDrawerOpen: boolean;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: 'Homme' | 'Femme';
}

const initialState: UIState = {
  isDark: true,
  isRegistered: true,
  isDrawerOpen: true,
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  gender: 'Homme',
};

export const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return {...state,  isDark: !state.isDark}
    },
    toggleForm: (state, action: PayloadAction<boolean>) => {
      return {...state,  isRegistered: action.payload}
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setValue: (state, action: PayloadAction<{ value: string; name: string }>) => {
      const { value, name } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    },
    setGender: (state, action: PayloadAction<'Homme' | 'Femme'>) => {
      state.gender = action.payload;
    },
  },
});

export const { toggleTheme, toggleDrawer, toggleForm, setValue, setGender } = UISlice.actions;

export const selectTheme = (state: RootState) => state.ui.isDark;
export const selectDrawerState = (state: RootState) => state.ui.isDrawerOpen;
export const selectForm = (state: RootState) => state.ui.isRegistered;
export const selectFirstname= (state: RootState) => state.ui.firstname;
export const selectLastname= (state: RootState) => state.ui.lastname;
export const selectEmail= (state: RootState) => state.ui.email;
export const selectPassword= (state: RootState) => state.ui.password;
export const selectGender= (state: RootState) => state.ui.gender;

export default UISlice.reducer;
