import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface sportState {

}

const initialState: sportState = {

};

export const sportSlice = createSlice({
  name: 'sport',
  initialState,
  reducers: {
  },
});

export const {  } = sportSlice.actions;


export default sportSlice.reducer;