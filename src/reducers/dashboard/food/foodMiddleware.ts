import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { resetInputValue } from '../../UI/uiSlice';
import { setCategories, setDisplayedFoods } from './foodSlice';
import { formatCategory } from '../../../utils/stringFormat';
import { FoodOFFResponse } from '../../../Interfaces/API_Interfaces';

export const fetchCategories = createAsyncThunk('food/fetchCategories', async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.get(`https://fr.openfoodfacts.org/categories.json`);
    const results = response.data.tags
      .filter((category: any) => category.products > 500)
      .map((category: any) => category.name);
    if (results.length === 0) {
      return rejectWithValue({
        severity: 'error',
        message: "Nous n'avons pas réussi à récupérer les catégories provenant de https://fr.openfoodfacts.org/",
      });
    }
    dispatch(setCategories(results));
    return {
      severity: 'success',
      message: 'Vous pouvez sélectionner une catégorie désormais !',
    };
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({
      severity: 'error',
      message:
        "Nous n'avons pas réussi à récupérer les données provenant de https://fr.openfoodfacts.org/decouvrir leurs services sont peut être indisponibles ou votre aliment n'était pas rentré dans la base de donnée. Vous pouvez vous rendre sur le site d'Open Food Facts afin de rajouter vous même des aliments !",
    });
  }
});

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
      console.log(response.data);
      const results: FoodOFFResponse[] = response.data.products
        .filter((product: any) => product.product_name_fr !== '' && product.product_name_fr !== undefined)
        .map((product: any) => ({
          id: product.id,
          brands: product.brands || 'Pas de marque disponible',
          infos: product.nutrient_levels,
          name: product.product_name_fr,
          kcal: product.nutriments['energy-kcal'],
          imgSrc: product.image_small_url || 'https://cdn-icons-png.flaticon.com/512/3875/3875172.png',
        }));
      console.log(results);
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

// const response = await axios.get(`https://fr.openfoodfacts.org/categorie/${category}.json`);
