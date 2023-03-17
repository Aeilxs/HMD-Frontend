import axios from 'axios';
import { RootState } from '../../../store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SmokeApiResponse } from '../../../Interfaces/API_Interfaces';
import { setSmokes } from './smokeSlice';
import { resetInputValue, setIsEdit } from '../../UI/uiSlice';

export const postSmoke = createAsyncThunk('smoke/postSmoke', async (_, { getState, dispatch, rejectWithValue }) => {
  const { date, quantity } = (getState() as RootState).ui.smokeInputs;
  const token = (getState() as RootState).user.token;
  try {
    const response = await axios.post<SmokeApiResponse>(
      'https://localhost:8000/api/smokes',
      {
        quantity: Number(quantity),
        date: date,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(resetInputValue('smokeInputs'));
    dispatch(setSmokes(response.data.smokes));
    return response.data.message;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue(error.response?.data.message);
  }
});

export const editSmoke = createAsyncThunk('smoke/editSmoke', async (_, { getState, dispatch, rejectWithValue }) => {
  dispatch(setIsEdit(false));
  try {
    const { date, quantity, id } = (getState() as RootState).ui.smokeInputs;
    const token = (getState() as RootState).user.token;
    const response = await axios.patch<SmokeApiResponse>(
      `https://localhost:8000/api/smokes/${id}`,
      {
        quantity: Number(quantity),
        date: date,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(resetInputValue('smokeInputs'));
    dispatch(setSmokes(response.data.smokes));
    return response.data.message;
  } catch (error: any) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue(error.response?.data.message);
  }
});

export const deleteSmoke = createAsyncThunk(
  'smoke/deleteSmoke',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    dispatch(setIsEdit(false));
    try {
      const token = (getState() as RootState).user.token;
      const response = await axios.delete<SmokeApiResponse>(`https://localhost:8000/api/smokes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setSmokes(response.data.smokes));
      return { severity: 'info', message: `Votre consommation a bien été supprimée` };
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue(error.response?.data.message);
    }
  }
);
