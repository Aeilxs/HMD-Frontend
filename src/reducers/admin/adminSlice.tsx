import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessage } from '../../Interfaces/API_Interfaces';
import { RootState } from '../../store/store';

export interface AdminState {
  message: AlertMessage;
  categories: string[];
}

const initialState: AdminState = {
  message: { severity: 'info', message: '' },
  categories: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      return { ...state, categories: action.payload };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {},
});

export const {} = adminSlice.actions;

// export const selectTruc = (state: RootState) => state.admin.machin;

export default adminSlice.reducer;
