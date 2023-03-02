import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';

export const postProfil = createAsyncThunk('profil/postProfil', async (_, { getState }) => {
  const { weight, height, age, dateOfBirth } = (getState() as RootState).profil;
  const token = (getState() as RootState).user.token;
  const response = await axios.post(
    'http://localhost:8000/api/users/properties',
    {
      date: dateOfBirth, // a supprimer dans le back
      age: age,
      weight: weight,
      size: height,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
});
