import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { removeDrug, setDrug, updateDrug } from '../../user/userSlice';
import { calcDate } from '../../../utils/math';
import { resetInputs } from './drugSlice';

export const postDrug = createAsyncThunk('drug/postDrug', async (_, { getState, dispatch, rejectWithValue }) => {
  const { quantity, name, date, unit } = (getState() as RootState).drug;
  const token = (getState() as RootState).user.token;
  try {
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
    dispatch(resetInputs());
    return { severity: 'info', message: `Ajout du traitement médical en date du ${calcDate(response.data.date)}` };
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({ severity: 'error', message: "Echec de l'ajout" });
  }
});

export const editDrug = createAsyncThunk('drug/editDrug', async (_, { getState, dispatch, rejectWithValue }) => {
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
    return { severity: 'info', message: `Modification du traitement médical en date du ${calcDate(response.data.date)}` };
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({ severity: 'error', message: "Echec de la modification" });
  }
});

export const deleteDrug = createAsyncThunk('sleep/deleteDrug', async (id: number, { getState, dispatch, rejectWithValue }) => {
  try {
    const token = (getState() as RootState).user.token;
    const response = await axios.delete(`http://localhost:8000/api/users/drugs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(removeDrug(id));
    return { severity: 'info', message: `Votre traitement médical a bien été supprimé` };
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({ severity: 'error', message: "Echec de la suppression" });
  }
});
