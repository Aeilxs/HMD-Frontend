import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { ApiProps, Food, setIsLoading } from './foodSlice';
import { calcCalories } from '../../../utils/math';

export const fetchProducts = createAsyncThunk('food/fetchProducts', async (categoryName: string, { dispatch }) => {
  const category = categoryName.toLowerCase().replace(/\s+/g, '-');
  dispatch(setIsLoading(true));
  const response = await axios.get(`https://fr.openfoodfacts.org/categorie/${category}.json`);
  dispatch(setIsLoading(false));
  return response.data.products.map((product: ApiProps) => ({
    key: product.id,
    name: product.product_name_fr,
    calories: product['nutriments']['energy-kcal_100g'],
  }));
});

export const postFood = createAsyncThunk(
  'food/postFood',
  async (selectedFood: Food | null, { getState, dispatch, rejectWithValue }) => {
    const { date, quantity } = (getState() as RootState).food;
    if (!selectedFood) {
      return rejectWithValue({ severity: 'error', message: 'Veuillez saisir un aliment' });
    }
    const { name } = selectedFood;
    const token = (getState() as RootState).user.token;
    try {
      const response = await axios.post(
        'http://localhost:8000/api/users/alimentations',
        {
          caloricIntake: calcCalories({ ...selectedFood, quantity: Number(quantity) }),
          date: date,
          name: name,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return {
        data: response.data,
        severity: 'info',
        message: `Vos informations ont bien été mises à jour`,
      };
    } catch (error: any) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue({ severity: 'error', message: "Echec de l'ajout" });
    }
  }
);

export const editFood = createAsyncThunk(
  'food/editFood',
  async (selectedFood: Food | null, { getState, dispatch, rejectWithValue }) => {
    try {
      const { date, quantity, id } = (getState() as RootState).food;
      if (!selectedFood) {
        return rejectWithValue({ severity: 'error', message: 'Veuillez saisir un aliment' });
      }
      const { name } = selectedFood;
      const token = (getState() as RootState).user.token;
      const response = await axios.patch(
        `http://localhost:8000/api/users/alimentations/${id}`,

        { headers: { Authorization: `Bearer ${token}` } }
      );
      return {
        data: response.data,
        severity: 'info',
        message: `Votre aliment a bien été mis à jour`,
      };
    } catch (error: any) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue({ severity: 'error', message: 'Echec de la modification' });
    }
  }
);

export const deleteFood = createAsyncThunk(
  'food/deleteFood',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).user.token;
      const response = await axios.delete(`http://localhost:8000/api/users/alimentations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return {
        severity: 'info',
        message: `Votre aliment a bien été supprimé`,
      };
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue({ severity: 'error', message: 'Echec de la suppression' });
    }
  }
);
