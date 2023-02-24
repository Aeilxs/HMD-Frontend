import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { calcAge } from '../../utils/math';

export interface UserState {
  isLogged: boolean;
  dateOfBirth: string | null;
  age: number;
  weight: number | '';
  height: number | '';
}

const initialState: UserState = {
  isLogged: true,
  dateOfBirth: null,
  age: 0,
  weight: '',
  height: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      return { ...state, dateOfBirth: action.payload, age: calcAge(action.payload) };
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
