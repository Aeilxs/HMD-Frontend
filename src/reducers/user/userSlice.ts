import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { calcAge } from '../../utils/math';
import { registerLoginUser } from './userMiddleware';

export interface UserState {
  isLogged: boolean;
  dateOfBirth: string | null;
  age: number;
  weight: number | '';
  height: number | '';
  token: string;
}

const initialState: UserState = {
  isLogged: false,
  dateOfBirth: null,
  age: 0,
  weight: '',
  height: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        dateOfBirth: action.payload,
        age: calcAge(action.payload),
      };
    },
    setWeight: (state, action: PayloadAction<number>) => {
      return { ...state, weight: action.payload };
    },
    setHeight: (state, action: PayloadAction<number>) => {
      return { ...state, height: action.payload };
    },
    onLogout: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLogged: false, token: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerLoginUser.fulfilled, (state, action) => {
        return { ...state, isLogged: true, token: action.payload };
      })
      .addCase(registerLoginUser.rejected, (state, action) => {
        // rejet de la requete
      });
  },
});

export const { setDateOfBirth, setWeight, setHeight, onLogout } = userSlice.actions;

export const selectIsLogged = (state: RootState) => state.user.isLogged;
export const selectDateOfBirth = (state: RootState) => state.user.dateOfBirth;
export const selectWeight = (state: RootState) => state.user.weight;
export const selectHeight = (state: RootState) => state.user.height;

export default userSlice.reducer;
