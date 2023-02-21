import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface UIState {
  isDark: boolean;
  hasAccount: boolean;
}

const initialState: UIState = {
  isDark: true,
  hasAccount: true,
};

export const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
    toggleForm: (state) => {
      state.hasAccount = !state.hasAccount;
    },
  },
});

export const { toggleTheme, toggleForm } = UISlice.actions;
export const selectTheme = (state: RootState) => state.ui.isDark;
export const selectForm = (state: RootState) => state.ui.hasAccount;
export default UISlice.reducer;
