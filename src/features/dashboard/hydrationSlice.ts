import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface hydrationState {

}

const initialState: hydrationState = {

};

export const hydrationSlice = createSlice({
  name: 'hydration',
  initialState,
  reducers: {
  },
});

export const {  } = hydrationSlice.actions;


export default hydrationSlice.reducer;