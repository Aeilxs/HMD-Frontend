import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
interface ResponseData {
  token: string;
}

export const registerLoginUser = createAsyncThunk(
  'ui/registerLoginUser',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { email, password } = (getState() as RootState).ui.authenticationInputs;
    try {
      const response = await axios.post<ResponseData>('https://localhost:8000/api/login', {
        email: email,
        password: password,
      });
      dispatch(fetchUser(response.data.token));
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    } catch (error: any) {
      console.log(error);
      if (!axios.isAxiosError(error)) throw error;
      switch (error.response?.status) {
        case 401:
          return rejectWithValue('Identifiants incorrect');
        case 404:
          return rejectWithValue('Erreur 404');
        case 500:
          return rejectWithValue('Tous les champs doivent être remplis');
        default:
          throw error;
      }
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

export const fetchUser = createAsyncThunk('user/fetchUser', async (token: string, { dispatch }) => {
  try {
    const response = await axios.get(`https://localhost:8000/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // dispatch(setProfilInputs(response.data.properties[0]));
    return response.data.user;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
  }
});
