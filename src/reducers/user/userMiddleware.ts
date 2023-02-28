import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store/store';
import { setLoginError, setValue } from '../UI/uiSlice';

export const registerLoginUser = createAsyncThunk(
  'ui/registerLoginUser',
  async (_, { getState, dispatch }) => {
    try {
      const { email, password } = (getState() as RootState).ui.user;
      const response = await axios.post('https://localhost:8000/api/login', {
        username: email,
        password: password,
      });
      dispatch(setLoginError(false));
      dispatch(setValue({ value: '', name: 'email' }));
      dispatch(setValue({ value: '', name: 'password' }));
      return response.data.token;
    } catch (error) {
      dispatch(setLoginError(true));
      throw error;
    }
  }
);
