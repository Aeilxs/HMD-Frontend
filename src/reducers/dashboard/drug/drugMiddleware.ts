import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';

export const postDrug = createAsyncThunk('drug/postDrug', async (_, { getState }) => {
  const { quantity, name, date } = (getState() as RootState).drug;
  const token = (getState() as RootState).user.token;
  const response = await axios.post(
    'http://localhost:8000/api/users/drugs',
    {
      quantity: 4, // CHANGER QUANTITE DANS LE BACK
      drugName: name,
      date: date,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
});
