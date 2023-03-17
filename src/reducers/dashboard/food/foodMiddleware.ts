import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { ApiProps, Food } from './foodSlice';
import { calcCalories } from '../../../utils/math';

export const fetchProducts = createAsyncThunk('food/fetchProducts', async (_, { dispatch, rejectWithValue }) => {
  try {
    //
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({
      severity: 'error',
      message: "Nous n'avons pas réussi à récupérer les données provenant de https://fr.openfoodfacts.org/decouvrir ",
    });
  }
});

// const response = await axios.get(`https://fr.openfoodfacts.org/categorie/${category}.json`);
