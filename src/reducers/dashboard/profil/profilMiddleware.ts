import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { setProperties, updateProperties } from '../../user/userSlice';
import { setProfilInputs } from './profilSlice';
import { calcDate } from '../../../utils/math';

export const postProfil = createAsyncThunk('profil/postProfil', async (_, { getState, dispatch, rejectWithValue }) => {
  const { weight, size, age, dateOfBirth } = (getState() as RootState).profil;
  const token = (getState() as RootState).user.token;
  try {
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
  return {
    severity: 'info',
    message: `Vos informations ont bien été mises à jour`,
  };
} catch (error) {
  if (!axios.isAxiosError(error)) throw error;
  return rejectWithValue({ severity: 'error', message: "Echec de l'ajout" });
}
}
);

export const editProfil = createAsyncThunk('profil/editProfil', async (id: number, { getState, dispatch, rejectWithValue }) => {
  const { weight, size, age, dateOfBirth } = (getState() as RootState).profil;
  const token = (getState() as RootState).user.token;
  try {
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
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue({ severity: 'error', message: "Echec de la modification" });
    }
  }
);
