import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';

export const postSport = createAsyncThunk('sport/postSport', async (_, { getState }) => {
  const { type, duration, intensity, date } = (getState() as RootState).sport;
  const token = (getState() as RootState).user.token;
  const response = await axios.post(
    'http://localhost:8000/api/users/activities',
    {
      type: type,
      time: duration,
      intensity: intensity,
      calories_per_session: 50, // TODO
      date: date,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
});
