import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface UIState {
  isDark: boolean;
  isRegistered: boolean;
  isDrawerOpen: boolean;
}

const initialState: UIState = {
  isDark: true,
  isRegistered: true,
  isDrawerOpen: false,
};

export const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
    toggleForm: (state) => {
      state.isRegistered = !state.isRegistered;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { toggleTheme, toggleDrawer, toggleForm } = UISlice.actions;

export const selectTheme = (state: RootState) => state.ui.isDark;
export const selectDrawerState = (state: RootState) => state.ui.isDrawerOpen;
export const selectForm = (state: RootState) => state.ui.isRegistered;

export default UISlice.reducer;
