import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface sleepState {

}

const initialState: sleepState = {

};

export const sleepSlice = createSlice({
  name: 'sleep',
  initialState,
  reducers: {
  },
});

export const {  } = sleepSlice.actions;


export default sleepSlice.reducer;