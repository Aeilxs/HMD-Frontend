import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface UIState {
  isDark: boolean;
}

const initialState: UIState = {
  isDark: true,
};

export const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = UISlice.actions;
export const selectTheme = (state: RootState) => state.ui.isDark;
export default UISlice.reducer;
