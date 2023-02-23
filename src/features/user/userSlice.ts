import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface UserState {
  isLogged: boolean;
  dateOfBirth: string;
  age: number;
  weight: number | '';
  height: number | '';
}

const initialState: UserState = {
  isLogged: true,
  dateOfBirth: 'Wed, 16 Jul 1998 22:00:00 GMT',
  age: 0,
  weight: '',
  height: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      return { ...state, dateOfBirth: action.payload };
    },
    setWeight: (state, action: PayloadAction<number>) => {
      return { ...state, weight: action.payload };
    },
    setHeight: (state, action: PayloadAction<number>) => {
      return { ...state, height: action.payload };
    },
  },
});

export const { setDateOfBirth, setWeight, setHeight } = userSlice.actions;

export const selectIsLogged = (state: RootState) => state.user.isLogged;
export const selectDateOfBirth = (state: RootState) => state.user.dateOfBirth;
export const selectWeight = (state: RootState) => state.user.weight;
export const selectHeight = (state: RootState) => state.user.height;

export default userSlice.reducer;
