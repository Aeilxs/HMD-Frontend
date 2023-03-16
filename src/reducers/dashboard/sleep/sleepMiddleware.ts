import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { removeSleeps, setSleeps, updateSleeps } from '../../user/userSlice';
import { calcDate } from '../../../utils/math';
import { resetSleepInputs } from './sleepSlice';

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
    dispatch(resetSleepInputs());
    return {
      severity: 'info',
      message: `Votre nuit de sommeil du ${calcDate(response.data.date)} a bien été enregistrée`,
    };
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({ severity: 'error', message: "Echec de l'ajout" });
  }
});

export const editSleep = createAsyncThunk('sleep/editSleep', async (_, { getState, dispatch, rejectWithValue }) => {
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
    dispatch(resetSleepInputs());
    return {
      severity: 'info',
      message: `Votre nuit de sommeil du ${calcDate(response.data.date)} a bien été modifiée`,
    };
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({ severity: 'error', message: 'Echec de la modification' });
  }
});

export const deleteSleep = createAsyncThunk(
  'sleep/deleteSleep',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).user.token;
      const response = await axios.delete(`http://localhost:8000/api/users/sleeps/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(removeSleeps(id));
      return {
        severity: 'info',
        message: `Votre nuit de sommeil a bien été supprimée`,
      };
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue({ severity: 'error', message: 'Echec de la suppression' });
    }
  }
);
