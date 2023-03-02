import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../../store/store';

export const postHydration = createAsyncThunk('hydration/postHydration', async (_, { getState }) => {
  const { date, quantity } = (getState() as RootState).hydration;
  const token = (getState() as RootState).user.token;
  const response = await axios.post(
    'http://localhost:8000/api/users/hydrations',
    {
      quantity: quantity,
      date: date,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
});
