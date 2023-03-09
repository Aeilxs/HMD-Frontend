import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { removeSleeps, setSleeps, updateSleeps } from '../../user/userSlice';
import { calcDate } from '../../../utils/math';

export const postSleep = createAsyncThunk('sleep/postSleep', async (_, { getState, dispatch, rejectWithValue }) => {
  try {
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
    dispatch(setSleeps(response.data));
    return {
      severity: 'info',
      message: `Votre nuit de sommeil du ${calcDate(response.data.date)} a bien été enregistrée`,
    };
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({ severity: 'error', message: "Echec de l'ajout" });
  }
});

export const editSleep = createAsyncThunk('sleep/editSleep', async (_, { getState, dispatch }) => {
  try {
    const { date, quantity, quality, id } = (getState() as RootState).sleep;
    const token = (getState() as RootState).user.token;
    const response = await axios.patch(
      `http://localhost:8000/api/users/sleeps/${id}`,
      {
        time: quantity,
        quality: quality,
        date: date,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(updateSleeps(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const deleteSleep = createAsyncThunk('sleep/deleteSleep', async (id: number, { getState, dispatch }) => {
  try {
    const token = (getState() as RootState).user.token;
    const response = await axios.delete(`http://localhost:8000/api/users/sleeps/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(removeSleeps(id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
