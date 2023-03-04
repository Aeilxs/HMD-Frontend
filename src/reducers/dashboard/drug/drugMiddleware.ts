import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { removeDrug, setDrug, updateDrug } from '../../user/userSlice';

export const postDrug = createAsyncThunk('drug/postDrug', async (_, { getState, dispatch }) => {
  const { quantity, name, date, unit } = (getState() as RootState).drug;
  const token = (getState() as RootState).user.token;
  const response = await axios.post(
    'http://localhost:8000/api/users/drugs',
    {
      quantity: quantity,
      name: name,
      unit: unit,
      date: date,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(setDrug(response.data));
  return response.data;
});

export const editDrug = createAsyncThunk('drug/editDrug', async (_,{ getState, dispatch }) => {
  try {
  const { quantity, name, unit, date, id } = (getState() as RootState).drug;
  const token = (getState() as RootState).user.token;
  const response = await axios.patch(
   `http://localhost:8000/api/users/drugs/${id}`,
    {
      quantity: quantity,
      name: name,
      unit: unit,
      date: date,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(updateDrug(response.data));
  return response.data;
  }
  catch (error) {
    console.error(error);
  }
});

export const deleteDrug = createAsyncThunk('sleep/deleteDrug', async (id:number, { getState, dispatch }) => {
  try {
  const token = (getState() as RootState).user.token;
  const response = await axios.delete(
   `http://localhost:8000/api/users/drugs/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(removeDrug(id));
  return response.data;
  }
  catch (error) {
    console.error(error);
  }
});