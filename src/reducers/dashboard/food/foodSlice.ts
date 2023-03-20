import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AlertMessage,
  Food,
  FoodOFFResponse,
  RequestStatus,
} from '../../../Interfaces/API_Interfaces';
import { FoodState } from '../../../Interfaces/Reducers-Interfaces';
import { RootState } from '../../../store/store';
import { fetchCategories, fetchProducts } from './foodMiddleware';

const initialState: FoodState = {
  message: { severity: 'info', message: '' },
  categories: {
    categoriesStatus: 'idle',
    categoriesArray: [],
  },
  displayedFoods: {
    foodsStatus: 'idle',
    foodsArray: [],
  },
  foods: [],
};

export const FoodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoods: (state, action: PayloadAction<Food[]>) => {
      return { ...state, foods: action.payload };
    },
    setDisplayedFoods: (state, action: PayloadAction<FoodOFFResponse[]>) => {
      return { ...state, displayedFoods: { ...state.displayedFoods, foodsArray: action.payload } };
    },
    setCategories: (state, action) => {
      return { ...state, categories: { ...state.categories, categoriesArray: action.payload } };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        return {
          ...state,
          categories: { ...state.categories, categoriesStatus: 'pending' },
        };
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return {
          ...state,
          message: { severity, message },
          categories: { ...state.categories, categoriesStatus: 'fulfilled' },
        };
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return {
          ...state,
          message: { severity, message },
          categories: { ...state.categories, categoriesStatus: 'rejected' },
        };
      })
      .addCase(fetchProducts.pending, (state, action) => {
        return {
          ...state,
          displayedFoods: { ...state.displayedFoods, foodsStatus: 'pending' },
        };
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        return {
          ...state,
          displayedFoods: { ...state.displayedFoods, foodsStatus: 'fulfilled' },
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        return {
          ...state,
          displayedFoods: { ...state.displayedFoods, foodsStatus: 'rejected' },
        };
      });
  },
});

export const { setCategories, setDisplayedFoods } = FoodSlice.actions;

export const selectFoodsList = (state: RootState) => state.food.foods;
export const selectFoodMessage = (state: RootState) => state.food.message;
export const selectOFFCategories = (state: RootState) => state.food.categories;
export const selectOFFFoods = (state: RootState) => state.food.displayedFoods;

export default FoodSlice.reducer;
