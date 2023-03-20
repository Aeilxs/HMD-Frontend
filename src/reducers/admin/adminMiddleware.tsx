import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export const registerLoginUser = createAsyncThunk('admin/updateCategories', async (_, { getState }) => {
  try {
    const token = (getState() as RootState).user.token;
    const response = await axios.get(`https://fr.openfoodfacts.org/categories.json`);
    const results = response.data.tags
      .filter((category: any) => category.products > 500)
      .map((category: any) => category.name);

    if (results.length === 0) {
      console.warn('ARRAY VIDE');
      return;
    }
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    console.warn(error);
  }
});
