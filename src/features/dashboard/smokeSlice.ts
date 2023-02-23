import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface smokeState {

}

const initialState: smokeState = {

};

export const smokeSlice = createSlice({
  name: 'smoke',
  initialState,
  reducers: {
  },
});

export const {  } = smokeSlice.actions;


export default smokeSlice.reducer;