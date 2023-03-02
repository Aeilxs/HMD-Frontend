import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';

export const postSmoke = createAsyncThunk('smoke/postSmoke', async (_, { getState }) => {
  const { date, quantity } = (getState() as RootState).smoke;
  const token = (getState() as RootState).user.token;
  const response = await axios.post(
    'http://localhost:8000/api/users/cigarettes',
    {
      quantity: quantity,
      date: date,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
});
