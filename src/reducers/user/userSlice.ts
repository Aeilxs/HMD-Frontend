import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, registerLoginUser } from './userMiddleware';
import { RootState } from '../../store/store';
import { LoginResponse, Roles, UserDataResponse } from '../../Interfaces/API_Interfaces';

export interface UserState {
  id: number;
  roles: Roles[];
  isLogged: boolean;
  token: string;
  firstname: string;
  lastname: string;
  gender: 'femme' | 'homme' | null;
}

const initialState: UserState = {
  id: 0,
  roles: [],
  isLogged: false,
  token: '',
  firstname: '',
  lastname: '',
  gender: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onSuccesAuthentication: (state, action: PayloadAction<LoginResponse>) => {
      const { token, id } = action.payload;
      return { ...state, token, id };
    },
    setUserData: (state, action: PayloadAction<UserDataResponse>) => {
      const { user } = action.payload;
      return { ...state, roles: user.roles, firstname: user.firstname, lastname: user.lastname };
    },
    setIsLogged: (state) => {
      return { ...state, isLogged: true };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // .addCase(registerLoginUser.pending, (state) => {
      //   // todo
      // })
      // .addCase(registerLoginUser.fulfilled, (state, action) => {
      //   return { ...state, isLogged: true, token: action.payload };
      // })
      .addCase(registerLoginUser.rejected, (state) => {
        return { ...state, isLogged: false };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {});
  },
});

export const { setIsLogged, onSuccesAuthentication, setUserData } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;
export const selectFirstName = (state: RootState) => state.user.firstname;
export const selectGender = (state: RootState) => state.user.gender;
export const selectIsLogged = (state: RootState) => state.user.isLogged;

export default userSlice.reducer;
