import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface UIState {
  isDark: boolean;
  isDrawerOpen: boolean;
}

const initialState: UIState = {
  isDark: true,
  isDrawerOpen: false,
};

export const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { toggleTheme, toggleDrawer } = UISlice.actions;

export const selectTheme = (state: RootState) => state.ui.isDark;
export const selectDrawerState = (state: RootState) => state.ui.isDrawerOpen;

export default UISlice.reducer;
