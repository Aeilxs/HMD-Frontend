import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { resetInputValue, setIsEdit } from '../../UI/uiSlice';
import { HydrationApiResponse } from '../../../Interfaces/API_Interfaces';
import { setHydrations } from './hydrationSlice';

export const postHydration = createAsyncThunk(
  'hydration/postHydration',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { date, quantity } = (getState() as RootState).ui.hydrationInputs;
      const token = (getState() as RootState).user.token;
      const response = await axios.post<HydrationApiResponse>(
        'https://localhost:8000/api/hydrations',
        {
          quantity: Number(quantity),
          date: date,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(resetInputValue('hydrationInputs'));
      dispatch(setHydrations(response.data.hydrations));
      return response.data.message;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const editHydration = createAsyncThunk(
  'hydration/editHydration',
  async (_, { getState, dispatch, rejectWithValue }) => {
    dispatch(setIsEdit(false));
    const { date, quantity, id } = (getState() as RootState).ui.hydrationInputs;
    const token = (getState() as RootState).user.token;
    try {
      const response = await axios.patch<HydrationApiResponse>(
        `https://localhost:8000/api/hydrations/${id}`,
        {
          quantity: Number(quantity),
          date: date,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(resetInputValue('hydrationInputs'));
      dispatch(setHydrations(response.data.hydrations));
      return response.data.message;
    } catch (error: any) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const deleteHydration = createAsyncThunk(
  'hydration/editHydration',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    dispatch(setIsEdit(false));
    try {
      const token = (getState() as RootState).user.token;
      const response = await axios.delete<HydrationApiResponse>(`https://localhost:8000/api/hydrations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setHydrations(response.data.hydrations));
      return response.data.message;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue(error.response?.data.message);
    }
  }
);
