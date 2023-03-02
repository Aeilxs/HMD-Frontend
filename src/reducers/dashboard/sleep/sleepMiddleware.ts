import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';

export const postSleep = createAsyncThunk('sleep/postSleep', async (_, { getState }) => {
  const { date, quantity, quality } = (getState() as RootState).sleep;
  const token = (getState() as RootState).user.token;
  const response = await axios.post(
    'http://localhost:8000/api/users/sleeps',
    {
      time: quantity,
      quality: quality,
      date: date,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
});
