import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { removeSport, setSport, updateSport } from '../../user/userSlice';

export const postSport = createAsyncThunk('sport/postSport', async (_, { getState, dispatch }) => {
  const { type, time, intensity, date } = (getState() as RootState).sport;
  const token = (getState() as RootState).user.token;
  const response = await axios.post(
    'http://localhost:8000/api/users/activities',
    {
      type: type,
      time: time,
      intensity: intensity,
      calories_per_session: 50, // TODO
      date: date,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(setSport(response.data));
  return response.data;
});


export const editSport = createAsyncThunk('sport/editSport', async (_,{ getState, dispatch }) => {
  try {
  const { type, time, intensity, date, id } = (getState() as RootState).sport;
  const token = (getState() as RootState).user.token;
  const response = await axios.patch(
   `http://localhost:8000/api/users/activities/${id}`,
    {
      type: type,
      time: time,
      intensity: intensity,
      calories_per_session: 50, // TODO
      date: date,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(updateSport(response.data));
  return response.data;
  }
  catch (error) {
    console.error(error);
  }
});

export const deleteSport = createAsyncThunk('sport/deleteSport', async (id:number, { getState, dispatch }) => {
  try {
  const token = (getState() as RootState).user.token;
  const response = await axios.delete(
   `http://localhost:8000/api/users/activities/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(removeSport(id));
  return response.data;
  }
  catch (error) {
    console.error(error);
  }
});