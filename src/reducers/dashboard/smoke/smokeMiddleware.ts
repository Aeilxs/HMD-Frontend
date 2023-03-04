import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { removeSmoke, setSmoke, updateSmoke } from '../../user/userSlice';

export const postSmoke = createAsyncThunk('smoke/postSmoke', async (_, { getState, dispatch }) => {
  const { date, quantity } = (getState() as RootState).smoke;
  const token = (getState() as RootState).user.token;
  const response = await axios.post(
    'http://localhost:8000/api/users/cigarettes',
    {
      quantity: quantity,
      date: date,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(setSmoke(response.data));
  return response.data;
});

export const editSmoke = createAsyncThunk('smoke/editSmoke', async (_,{ getState, dispatch }) => {
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
  }
  catch (error) {
    console.error(error);
  }
});

export const deleteSmoke = createAsyncThunk('smoke/deleteSmoke', async (id:number, { getState, dispatch }) => {
  try {
  const token = (getState() as RootState).user.token;
  const response = await axios.delete(
   `http://localhost:8000/api/users/cigarettes/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(removeSmoke(id));
  return response.data;
  }
  catch (error) {
    console.error(error);
  }
});
