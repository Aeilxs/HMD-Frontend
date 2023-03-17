import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { resetInputValue } from '../../UI/uiSlice';
import { setDrugs } from './drugSlice';
import { DrugApiResponse } from '../../../Interfaces/API_Interfaces';

export const postDrug = createAsyncThunk('drug/postDrug', async (_, { getState, dispatch, rejectWithValue }) => {
  const { quantity, name, date, unit } = (getState() as RootState).ui.drugInputs;
  const token = (getState() as RootState).user.token;
  try {
    const response = await axios.post<DrugApiResponse>(
      'https://localhost:8000/api/drugs',
      {
        quantity: Number(quantity),
        name: name,
        unit: unit,
        date: date,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(resetInputValue('drugInputs'));
    dispatch(setDrugs(response.data.drugs));
    return response.data.message;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue(error.response?.data.message);
  }
});

export const editDrug = createAsyncThunk('drug/editDrug', async (_, { getState, dispatch, rejectWithValue }) => {
  try {
    const { quantity, name, unit, date, id } = (getState() as RootState).ui.drugInputs;
    const token = (getState() as RootState).user.token;
    const response = await axios.patch<DrugApiResponse>(
      `https://localhost:8000/api/drugs/${id}`,
      {
        quantity: Number(quantity),
        name: name,
        unit: unit,
        date: date,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(setDrugs(response.data.drugs));
    return response.data.message;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue(error.response?.data.message);
  }
});

export const deleteDrug = createAsyncThunk(
  'drug/deleteDrug',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).user.token;
      const response = await axios.delete<DrugApiResponse>(`https://localhost:8000/api/drugs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(resetInputValue('drugInputs'));
      dispatch(setDrugs(response.data.drugs));
      return response.data.message;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue(error.response?.data.message);
    }
  }
);
