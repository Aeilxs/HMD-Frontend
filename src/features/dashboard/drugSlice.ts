import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface drugState {

}

const initialState: drugState = {

};

export const drugSlice = createSlice({
  name: 'drug',
  initialState,
  reducers: {
  },
});

export const {  } = drugSlice.actions;


export default drugSlice.reducer;
