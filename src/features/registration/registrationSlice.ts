import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface RegistrationState {
    firstname:string,
    lastname:string,
    email: string;
    password: string;
    gender:'Homme' | 'Femme',
    isSubmitted: boolean,
    error:string | null
  }

  const initialState: RegistrationState = {
    firstname:'',
    lastname:'',
    email: '',
    password: '',
    gender: 'Femme',
    isSubmitted: false,
    error: null,
  };

  export const RegistrationSlice = createSlice({
    name:'registration',
    initialState,
    reducers: {
        setFirstname: (state, action:PayloadAction<string>) => {
            state.firstname = action.payload
        },
        setLastname: (state, action:PayloadAction<string>) => {
            state.lastname = action.payload
        },
        setEmail: (state, action:PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action:PayloadAction<string>) => {
            state.password = action.payload
        },
        setGender: (state, action:PayloadAction<'Homme' | 'Femme'>) => {
            state.gender = action.payload
        },
        setIsSubmitted: (state, action:PayloadAction<boolean>) => {
            state.isSubmitted = action.payload
        },
        setError: (state, action:PayloadAction<string|null>) => {
            state.error = action.payload
        },
    }
  })

  export const { setFirstname, setLastname, setEmail, setPassword, setGender, setError } = RegistrationSlice.actions;

  export const selectFirstname = (state: RootState) => state.registration.firstname;
  export const selectLastname = (state: RootState) => state.registration.lastname;
  export const selectEmail = (state: RootState) => state.registration.email;
  export const selectPassword = (state: RootState) => state.registration.password;
  export const selectGender = (state: RootState) => state.registration.gender;
  export const selectIsSubmitting = (state: RootState) => state.registration.isSubmitted;
  export const selectError = (state: RootState) => state.registration.error;

  export default RegistrationSlice.reducer;