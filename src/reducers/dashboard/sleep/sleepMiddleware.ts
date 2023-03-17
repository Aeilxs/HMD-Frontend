import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { resetInputValue, setIsEdit } from '../../UI/uiSlice';
import { SleepApiResponse } from '../../../Interfaces/API_Interfaces';
import { setSleeps } from './sleepSlice';

export const postSleep = createAsyncThunk('sleep/postSleep', async (_, { getState, dispatch, rejectWithValue }) => {
  try {
    const { date, duration, quality } = (getState() as RootState).ui.sleepInputs;
    const token = (getState() as RootState).user.token;
    const response = await axios.post<SleepApiResponse>(
      'https://localhost:8000/api/sleeps',
      {
        date: date,
        duration: Number(duration),
        quality: quality,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(resetInputValue('sleepInputs'));
    dispatch(setSleeps(response.data.sleeps));
    return response.data.message;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue(error.response?.data.message);
  }
});

export const editSleep = createAsyncThunk('sleep/editSleep', async (_, { getState, dispatch, rejectWithValue }) => {
  dispatch(setIsEdit(false));
  try {
    const { date, duration, quality, id } = (getState() as RootState).ui.sleepInputs;
    const token = (getState() as RootState).user.token;
    const response = await axios.patch<SleepApiResponse>(
      `https://localhost:8000/api/sleeps/${id}`,
      {
        duration: Number(duration),
        quality: quality,
        date: date,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(resetInputValue('sleepInputs'));
    dispatch(setSleeps(response.data.sleeps));
    return response.data.message;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue(error.response?.data.message);
  }
});

export const deleteSleep = createAsyncThunk(
  'sleep/deleteSleep',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    const token = (getState() as RootState).user.token;
    try {
      const response = await axios.delete<SleepApiResponse>(`https://localhost:8000/api/sleeps/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setSleeps(response.data.sleeps));
      return response.data.message;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue(error.response?.data.message);
    }
  }
);
