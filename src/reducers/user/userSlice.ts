import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, registerLoginUser } from './userMiddleware';
import { RootState } from '../../store/store';
import { calcAge } from '../../utils/math';

export interface UserState {
  isLogged: boolean;
  token: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  gender: 'Femme' | 'Homme' | '';
}

const initialState: UserState = {
  isLogged: false,
  token: localStorage.getItem('token') || '',
  firstname: '',
  lastname: '',
  gender: '',
  dateOfBirth: '',
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

    setIsLogged: (state) => {
      return { ...state, isLogged: true };
    },
    onLogout: (state) => {
      localStorage.clear();
      return { ...state, initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerLoginUser.pending, (state) => {
        // todo
      })
      .addCase(registerLoginUser.fulfilled, (state, action) => {
        return { ...state, isLogged: true, token: action.payload };
      })
      .addCase(registerLoginUser.rejected, (state) => {
        return { ...state, isLogged: false };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {});
  },
});

export const { onLogout, setIsLogged } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;
export const selectFirstName = (state: RootState) => state.user.firstname;
export const selectGender = (state: RootState) => state.user.gender;
export const selectIsLogged = (state: RootState) => state.user.isLogged;

export default userSlice.reducer;
