import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { resetInputValue } from '../../UI/uiSlice';
import { setCategories, setDisplayedFoods, setFoods } from './foodSlice';
import { formatCategory } from '../../../utils/stringFormat';
import { FoodCategoryApiResponse, FoodOFFResponse } from '../../../Interfaces/API_Interfaces';

export const fetchCategories = createAsyncThunk('food/fetchCategories', async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.get<FoodCategoryApiResponse>(`https://localhost:8000/api/foods-categories`);
    const results = response.data.categories.map((category) => category.title);
    dispatch(setCategories(results));
    return response.data.message;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({
      severity: 'error',
      message:
        "Nous n'avons pas réussi à récupérer les données provenant de https://fr.openfoodfacts.org/decouvrir leurs services sont peut être indisponibles ou votre aliment n'était pas rentré dans la base de donnée. Vous pouvez vous rendre sur le site d'Open Food Facts afin de rajouter vous même des aliments !",
    });
  }
);

export const fetchProducts = createAsyncThunk(
  'food/fetchProducts',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const { search, page, category } = (getState() as RootState).ui.foodInputs;

    try {
      const response = await axios.get(
        `https://fr.openfoodfacts.org/cgi/search.pl?search_terms=${search}&tagtype_0=categories&tag_contains_0=contains&tag_0=${formatCategory(
          category
        )}&json=1&page=${page}`
      );
      const results: FoodOFFResponse[] = response.data.products
        .filter(
          (product: any) => product.product_name_fr !== '' && product.product_name_fr !== undefined
        )
        .map((product: any) => ({
          id: product.id,
          brands: product.brands || 'Pas de marque disponible',
          infos: product.nutrient_levels,
          name: product.product_name_fr,
          kcal: product.nutriments['energy-kcal'],
          imgSrc: product.image_url || 'https://cdn-icons-png.flaticon.com/512/3875/3875172.png',
          url: product.url,
        }));
      dispatch(resetInputValue('foodInputs'));
      dispatch(setDisplayedFoods(results));
    } catch (error) {
      console.error(error);
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue({
        severity: 'error',
        message:
          "Nous n'avons pas réussi à récupérer les données provenant de https://fr.openfoodfacts.org/decouvrir leurs services sont peut être indisponibles ou votre aliment n'était pas rentré dans la base de donnée. Vous pouvez vous rendre sur le site d'Open Food Facts afin de rajouter vous même des aliments !",
      });
    }
  }
);

export const deleteFood = createAsyncThunk(
  'food/deleteFood',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).user.token;
      const response = await axios.delete<FoodApiResponse>(
        `https://localhost:8000/api/foods/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(resetInputValue('foodInputs'));
      dispatch(setFoods(response.data.foods));
      return response.data.message;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue(error.response?.data.message);
    }
  }
);

// const response = await axios.get(`https://fr.openfoodfacts.org/categorie/${category}.json`);
