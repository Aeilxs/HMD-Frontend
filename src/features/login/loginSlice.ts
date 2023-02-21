import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface LoginState {
    email: string;
    password: string;
    isSubmitted: boolean,
    error:string | null
  }

  const initialState: LoginState = {
    email: '',
    password: '',
    isSubmitted: false,
    error: null,
  };

  export const loginSlice= createSlice({
    name:'login',
    initialState,
    reducers: {
        setEmail: (state, action:PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action:PayloadAction<string>) => {
            state.password = action.payload
        },
        setIsSubmitted: (state, action:PayloadAction<boolean>) => {
            state.isSubmitted = action.payload
        },
        setError: (state, action:PayloadAction<string|null>) => {
            state.error = action.payload
        },
    }
  })

  export const { setEmail, setPassword, setIsSubmitted, setError } = loginSlice.actions;

  export const selectEmail = (state: RootState) => state.login.email;
  export const selectPassword = (state: RootState) => state.login.password;
  export const selectIsSubmitting = (state: RootState) => state.login.isSubmitted;
  export const selectError = (state: RootState) => state.login.error;

  export default loginSlice.reducer;