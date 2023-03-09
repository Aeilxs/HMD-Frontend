import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../../store/store';
import { calcDate } from '../../../utils/math';
import { removeHydration, setHydration, updateHydration } from '../../user/userSlice';

export const postHydration = createAsyncThunk(
  'hydration/postHydration',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { date, quantity } = (getState() as RootState).hydration;
      const token = (getState() as RootState).user.token;
      const response = await axios.post(
        'http://localhost:8000/api/users/hydrations',
        {
          quantity: quantity,
          date: date,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setHydration(response.data));
      return {
        severity: 'info',
        message: `Votre consommation d'eau du ${calcDate(response.data.date)} a bien été ajoutée`,
      };
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue({ severity: 'error', message: "Echec de l'ajout" });
    }
  }
);

export const editHydration = createAsyncThunk('hydration/editHydration', async (_, { getState, dispatch }) => {
  try {
    const { date, quantity, id } = (getState() as RootState).hydration;
    const token = (getState() as RootState).user.token;
    const response = await axios.patch(
      `http://localhost:8000/api/users/hydrations/${id}`,
      {
        quantity: quantity,
        date: date,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(updateHydration(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const deleteHydration = createAsyncThunk(
  'hydration/editHydration',
  async (id: number, { getState, dispatch }) => {
    try {
      const token = (getState() as RootState).user.token;
      const response = await axios.delete(`http://localhost:8000/api/users/hydrations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(removeHydration(id));
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
