import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { LoginResponse } from '../../Interfaces/API_Interfaces';
import { setSleeps } from '../dashboard/sleep/sleepSlice';
import { setActivities } from '../dashboard/sport/sportSlice';
import { setSmokes } from '../dashboard/smoke/smokeSlice';
import { setDrugs } from '../dashboard/drug/drugSlice';
import { setHydrations } from '../dashboard/hydration/hydrationSlice';
import { onSuccesAuthentication, setIsLogged } from './userSlice';

export const registerLoginUser = createAsyncThunk(
  'ui/registerLoginUser',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { email, password } = (getState() as RootState).ui.authenticationInputs;
    try {
      const response = await axios.post<LoginResponse>('https://localhost:8000/api/login', {
        email: email,
        password: password,
      });
      dispatch(onSuccesAuthentication({ token: response.data.token, id: response.data.id }));
      dispatch(fetchUser());
      dispatch(setIsLogged());
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    } catch (error: any) {
      console.log(error);
      if (!axios.isAxiosError(error)) throw error;
      return;
    }
  }
);

export const registerUser = createAsyncThunk('user/registerUser', async (_, { getState, rejectWithValue }) => {
  const { firstname, lastname, email, password, gender } = (getState() as RootState).ui.authenticationInputs;
  try {
    const response = await axios.post('https://localhost:8000/api/users', {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      gender: gender,
    });
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue('Tous les champs doivent être remplis');
  }
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { getState, dispatch, rejectWithValue }) => {
  const { token, id } = (getState() as RootState).user;
  try {
    const response = await axios.get(`https://localhost:8000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    dispatch(setActivities(response.data.user.activities));
    dispatch(setSleeps(response.data.user.sleeps));
    dispatch(setSmokes(response.data.user.smokes));
    dispatch(setDrugs(response.data.user.drugs));
    dispatch(setHydrations(response.data.user.hydrations));
    return response.data.message;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({
      severity: 'error',
      message: "Nous n'avons pas pu récupérer vos données, réessayez plus tard.",
    });
  }
});
