import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { incrementTries, setCategories, setProgress } from './adminSlice';

export const admin_fetchCategories = createAsyncThunk(
  'admin/fetchCategories',
  async (_, { getState, dispatch, rejectWithValue }) => {
    dispatch(incrementTries());
    const tries = (getState() as RootState).admin.categories.tries;
    console.log(tries);
    try {
      const response = await axios.get(`https://fr.openfoodfacts.org/categories.json`);
      if (response.data.tags.length === 0) {
        return rejectWithValue({
          status: 'rejected',
          severity: 'warning',
          message: `Le tableau de catégorie était vide.
          Tentative n°${tries}.`,
        });
      }

      const results = response.data.tags
        .filter((category: any) => category.products > 500)
        .map((category: any) => category.name);
      dispatch(setCategories(results));

      return {
        status: 'fulfilled',
        severity: 'success',
        message: `Les catégories ont été chargées et sont désormais dans le state. Il y a eu  ${tries} tentative(s) qui ont échouée(s).`,
      };
    } catch (error) {
      return rejectWithValue({
        severity: 'error',
        message: 'Erreur lors du chargement des données',
      });
    }
  }
);

export const admin_deleteAllCategories = createAsyncThunk(
  'admin/deleteAllCategories',
  async (_, { getState, dispatch }) => {
    try {
      const token = (getState() as RootState).user.token;
      const response = await axios.delete(`https://localhost:8000/api/foods-categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(admin_postCategories());
      return response.data.message;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return error.response?.data.message;
    }
  }
);

export const admin_postCategories = createAsyncThunk(
  'admin/postCategories',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const token = (getState() as RootState).user.token;
    const categories = (getState() as RootState).admin.categories.categoriesArray;
    const length = categories.length;

    for (let i = 0; i < length; i++) {
      try {
        await axios.post(
          `https://localhost:8000/api/foods-categories`,
          {
            title: categories[i],
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(setProgress(Math.round((i / length) * 100)));
      } catch (error) {
        if (!axios.isAxiosError(error)) throw error;
        return rejectWithValue({ severity: 'error', message: `Erreur à l'index ${i}` });
      }
    }
    return { severity: 'success', message: 'Les catégories ont été mises à jour avec succès.' };
  }
);
