import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface AuthFormState {
    hasAccount: boolean;
  }

  const initialState: AuthFormState = {
    hasAccount: true,
  };

  export const AuthFormSlice= createSlice({
    name:'authForm',
    initialState,
    reducers: {
        setHasAccount: (state) => {
            state.hasAccount = !state.hasAccount
        },
    }
  })

  export const { setHasAccount } = AuthFormSlice.actions;
  export const selectHasAccount = (state: RootState) => state.login.email;

  export default AuthFormSlice.reducer;