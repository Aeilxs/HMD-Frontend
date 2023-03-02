import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';

export const registerUser = createAsyncThunk('user/registerUser', async (_, { getState }) => {
  const { firstname, lastname, email, password, gender } = (getState() as RootState).ui.user;
  const response = await axios.post('http://localhost:8000/api/users', {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    gender: gender,
  });
  return response.data;
});
