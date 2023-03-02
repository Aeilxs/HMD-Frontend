import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store/store';
import { setLoginError, setValue } from '../UI/uiSlice';

// action de connexion
export const registerLoginUser = createAsyncThunk(
  'ui/registerLoginUser',
  async (_, { getState, dispatch }) => {
    try {
      const { email, password } = (getState() as RootState).ui.user;
      const response = await axios.post('http://localhost:8000/api/login', {
        username: email,
        password: password,
      });
      dispatch(setLoginError(false));
      dispatch(setValue({ value: '', name: 'email' }));
      dispatch(setValue({ value: '', name: 'password' }));
      dispatch(fetchUser(response.data.token));
      return response.data.token;
    } catch (error) {
      dispatch(setLoginError(true));
      throw error;
    }
  }
);

export const fetchUser = createAsyncThunk('user/fetchUser', async (token: string, { getState }) => {
  const response = await axios.get(`http://localhost:8000/api/users/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});
