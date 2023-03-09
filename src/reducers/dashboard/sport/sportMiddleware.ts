import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { removeSport, setSport, updateSport } from '../../user/userSlice';
import { calcDate } from '../../../utils/math';

export const postSport = createAsyncThunk('sport/postSport', async (_, { getState, dispatch, rejectWithValue }) => {
  const { type, time, intensity, date } = (getState() as RootState).sport;
  const token = (getState() as RootState).user.token;
  try {
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
    return {
      severity: 'info',
      message: `Votre session ${
        response.data.type === 'exercices' ? `d'${response.data.type}` : `de ${response.data.type}`
      } du ${calcDate(response.data.date)} a bien été ajoutée !`,
    };
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({ severity: 'error', message: "Echec de l'ajout" });
  }
});

export const editSport = createAsyncThunk('sport/editSport', async (_, { getState, dispatch }) => {
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
  } catch (error) {
    console.error(error);
  }
});

export const deleteSport = createAsyncThunk('sport/deleteSport', async (id: number, { getState, dispatch }) => {
  try {
    const token = (getState() as RootState).user.token;
    const response = await axios.delete(`http://localhost:8000/api/users/activities/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(removeSport(id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
