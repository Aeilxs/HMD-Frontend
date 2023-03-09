import axios from 'axios';
import { dataSmokeApi } from './smokeSlice';
import { calcDate } from '../../../utils/math';
import { RootState } from '../../../store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeSmoke, setSmoke, updateSmoke } from '../../user/userSlice';
import { AlertColor } from '@mui/material';

interface MessageProps {
  severity: AlertColor;
  message: string;
}

export const postSmoke = createAsyncThunk('smoke/postSmoke', async (_, { getState, dispatch, rejectWithValue }) => {
  const { date, quantity } = (getState() as RootState).smoke;
  const token = (getState() as RootState).user.token;
  try {
    const response = await axios.post(
      'http://localhost:8000/api/users/cigarettes',
      {
        quantity: quantity,
        date: date,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(setSmoke(response.data));
    console.log(response.data);
    return {
      severity: 'info',
      message: `Votre consommation de cigarette du ${calcDate(response.data.date)} a bien été ajoutée`,
    };
  } catch (error: any) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({
      severity: 'info',
      message: 'Echec',
    });
  }
});

export const editSmoke = createAsyncThunk('smoke/editSmoke', async (_, { getState, dispatch }) => {
  try {
    const { date, quantity, id } = (getState() as RootState).smoke;
    const token = (getState() as RootState).user.token;
    const response = await axios.patch(
      `http://localhost:8000/api/users/cigarettes/${id}`,
      {
        quantity: quantity,
        date: date,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(updateSmoke(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const deleteSmoke = createAsyncThunk('smoke/deleteSmoke', async (id: number, { getState, dispatch }) => {
  try {
    const token = (getState() as RootState).user.token;
    const response = await axios.delete(`http://localhost:8000/api/users/cigarettes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(removeSmoke(id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
