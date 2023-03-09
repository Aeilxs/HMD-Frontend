import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { setProperties, updateProperties } from '../../user/userSlice';
import { setProfilInputs } from './profilSlice';

export const postProfil = createAsyncThunk('profil/postProfil', async (_, { getState, dispatch }) => {
  const { weight, size, age, dateOfBirth } = (getState() as RootState).profil;
  const token = (getState() as RootState).user.token;
  const response = await axios.post(
    'http://localhost:8000/api/users/properties',
    {
      dateOfBirth: dateOfBirth, // a supprimer dans le back
      age: age,
      weight: weight,
      size: size,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(setProfilInputs(response.data));
  dispatch(setProperties(response.data));
  return response.data;
});

export const editProfil = createAsyncThunk('profil/postProfil', async (id: number, { getState, dispatch }) => {
  const { weight, size, age, dateOfBirth } = (getState() as RootState).profil;
  const token = (getState() as RootState).user.token;
  const response = await axios.patch(
    `http://localhost:8000/api/users/properties/${id}`,
    {
      dateOfBirth: dateOfBirth, // a supprimer dans le back
      age: age,
      weight: weight,
      size: size,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(setProfilInputs(response.data));
  dispatch(updateProperties(response.data));
  return response.data;
});
