import axios from 'axios';
import { calcDate } from '../../../utils/math';
import { RootState } from '../../../store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeSmoke, setSmoke, updateSmoke } from '../../user/userSlice';
import { resetSmokeInputs } from './smokeSlice';

export const postSmoke = createAsyncThunk(
  'smoke/postSmoke',
  async (_, { getState, dispatch, rejectWithValue }) => {
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
      dispatch(resetSmokeInputs());
      return {
        severity: 'info',
        message: `Votre consommation de cigarette du ${calcDate(
          response.data.date
        )} a bien été ajoutée`,
      };
    } catch (error: any) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue({
        severity: 'error',
        message: "Echec de l'ajout",
      });
    }
  }
);

export const editSmoke = createAsyncThunk(
  'smoke/editSmoke',
  async (_, { getState, dispatch, rejectWithValue }) => {
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
      dispatch(resetSmokeInputs());
      return {
        severity: 'info',
        message: `Votre consommation de cigarette du ${calcDate(
          response.data.date
        )} a bien été modifiée`,
      };
    } catch (error: any) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue({
        severity: 'error',
        message: 'Echec de la modification',
      });
    }
  }
);

export const deleteSmoke = createAsyncThunk(
  'smoke/deleteSmoke',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).user.token;
      const response = await axios.delete(`http://localhost:8000/api/users/cigarettes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(removeSmoke(id));
      return { severity: 'info', message: `Votre consommation a bien été supprimée` };
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue({ severity: 'error', message: 'Echec de la suppression' });
    }
  }
);
