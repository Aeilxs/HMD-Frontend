import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { resetInputValue } from '../../UI/uiSlice';

export const fetchCategories = createAsyncThunk('food/fetchCategories', async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.get(`https://fr.openfoodfacts.org/categories.json`);
    console.log(response.data);
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
    const { search, page } = (getState() as RootState).ui.foodInputs;
    const category = ''; //! a retirer

    try {
      const response = await axios.get(
        `https://fr.openfoodfacts.org/cgi/search.pl?search_terms=${search}&tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&json=1&page=${page}`
      );

      const results = response.data.products.map((product: any) => ({
        name: product.product_name_fr,
      }));
      console.log(results);
      dispatch(resetInputValue('foodInputs'));
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
