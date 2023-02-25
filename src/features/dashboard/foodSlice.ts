import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../redux/store';

export interface Food {
    key: string;
    name: string;
    calories:number;
  }

interface FoodSlice {
  category: string | null;
  foods: Food[];
  isLoading:boolean;
  selectedFood: Food | null;
  quantity:number | '';
}

const initialState: FoodSlice = {
  category: null,
  foods:[],
  isLoading:false,
  selectedFood: null,
  quantity:''
};
// https://redux-toolkit.js.org/api/createAsyncThunk#providing-a-custom-dispatch-function
export const fetchCategories = createAsyncThunk(
    'alimentation/fetchCategories',
    async (category:string, {dispatch}) => {
        dispatch(setIsLoading(true))
      const response = await axios.get(`https://fr.openfoodfacts.org/categorie/${category}.json`);
      dispatch(setIsLoading(false))
      return response.data.products.map((product: any) => ({
        key: product.id,
        name: product.product_name_fr,
        calories: product["nutriments"]["energy-kcal"],
      }))
    }
  );

export const FoodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
        return {...state, category:action.payload, selectedFood: null, quantity:''}
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
        return {...state, isLoading:action.payload}
    },
    setSelectedFood: (state, action: PayloadAction<Food>) => {
        return {...state, selectedFood:action.payload}
    },
    setQuantity: (state, action: PayloadAction<number|''>) => {
        return {...state, quantity:action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.foods = action.payload;
      })
  },
});

export const { setCategory,setIsLoading, setSelectedFood,setQuantity } = FoodSlice.actions;

export const selectCategory = (state: RootState) => state.food.category;
export const selectFoods = (state: RootState) => state.food.foods;
export const selectIsLoading = (state: RootState) => state.food.isLoading;
export const selectSelectedFood = (state: RootState) => state.food.selectedFood;
export const selectQuantity = (state: RootState) => state.food.quantity;

export default FoodSlice.reducer;