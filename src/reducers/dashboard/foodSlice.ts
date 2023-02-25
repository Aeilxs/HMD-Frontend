import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface foodState {}

const initialState: foodState = {};

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
});

export const {} = foodSlice.actions;

export default foodSlice.reducer;
