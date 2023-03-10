import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
interface ResponseData {
  token: string;
}

export const registerLoginUser = createAsyncThunk(
  'ui/registerLoginUser',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { email, password } = (getState() as RootState).ui.user;
      const response = await axios.post<ResponseData>('http://localhost:8000/api/login', {
        username: email,
        password: password,
      });
      dispatch(fetchUser(response.data.token));
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    } catch (error: any) {
      if (!axios.isAxiosError(error)) throw error;
      switch (error.response?.status) {
        case 401:
          return rejectWithValue('Identifiants incorrect');
        case 404:
          return rejectWithValue('Erreur 404');
        case 500:
          return rejectWithValue('Erreur du serveur');
        default:
          throw error;
      }
    }
  }
);

export const registerUser = createAsyncThunk('user/registerUser', async (_, { getState, rejectWithValue }) => {
  const { firstname, lastname, email, password, gender } = (getState() as RootState).ui.user;
  try {
    const response = await axios.post('http://localhost:8000/api/users', {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      gender: gender,
    });
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    switch (error.response?.status) {
      case 500:
        return rejectWithValue('Erreur du serveur');
    }
  }
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (token: string, { dispatch }) => {
  const response = await axios.get(`http://localhost:8000/api/users/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});
