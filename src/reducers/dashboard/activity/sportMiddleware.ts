import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

import { ActivityApiResponse } from '../../../Interfaces/API_Interfaces';
import { setActivities } from './activitySlice';
import { setIsEdit } from '../../UI/uiSlice';

export const postSport = createAsyncThunk('sport/postSport', async (_, { getState, dispatch, rejectWithValue }) => {
  const { type, duration, intensity, date } = (getState() as RootState).ui.activityInputs;
  const token = (getState() as RootState).user.token;
  try {
    const response = await axios.post<ActivityApiResponse>(
      'https://localhost:8000/api/activities',
      {
        type: type,
        duration: Number(duration),
        intensity: Number(intensity),
        date: date,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(setActivities(response.data.activities));
    return response.data.message;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({ severity: 'error', message: "Echec de l'ajout" });
  }
});

export const editSport = createAsyncThunk('sport/editSport', async (_, { getState, dispatch, rejectWithValue }) => {
  dispatch(setIsEdit(false));
  try {
    const { type, duration, intensity, date, id } = (getState() as RootState).ui.activityInputs;
    const token = (getState() as RootState).user.token;
    const response = await axios.patch<ActivityApiResponse>(
      `https://localhost:8000/api/activities/${id}`,
      {
        type: type,
        duration: Number(duration),
        intensity: Number(intensity),
        date: date,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(setActivities(response.data.activities));
    return response.data.message;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({ severity: 'error', message: 'Echec de la modification' });
  }
});

export const deleteSport = createAsyncThunk(
  'sport/deleteSport',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).user.token;
      const response = await axios.delete<ActivityApiResponse>(`https://localhost:8000/api/activities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setActivities(response.data.activities));
      return response.data.message;
    } catch (error) {
      console.warn(error);
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue(error.response?.data.message);
    }
  }
);
