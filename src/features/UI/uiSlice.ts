import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface UIState {
  isDark: boolean;
  isRegistered: boolean;
}

const initialState: UIState = {
  isDark: true,
  isRegistered: true,
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
  },
});

export const { toggleTheme, toggleForm } = UISlice.actions;
export const selectTheme = (state: RootState) => state.ui.isDark;
export const selectForm = (state: RootState) => state.ui.isRegistered;
export default UISlice.reducer;
