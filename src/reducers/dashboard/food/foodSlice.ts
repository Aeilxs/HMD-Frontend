import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { fetchProducts, postFood } from './foodMiddleware';

export interface Nutriments {
  'energy-kcal_100g': number;
}
export interface ApiProps {
  id: string;
  product_name_fr: string;
  nutriments: Nutriments;
}
export interface dataFoodApi {
  id: number;
  name: string;
  caloricNeed: number;
  caloricIntake: number;
  date: string;
}
export interface ConsommedFood {
  key: string;
  name: string;
  calories: number;
  quantity: number;
}

export interface Food {
  key: string;
  name: string;
  calories: number;
}

interface FoodState {
  id: number | null;
  date: string | null;
  category: string | null;
  foods: Food[];
  isLoading: boolean;
  selectedFood: Food | null;
  consommedFoods: ConsommedFood[];
  quantity: number | '';
}

const initialState: FoodState = {
  id: null,
  date: null,
  category: null,
  foods: [],
  isLoading: false,
  selectedFood: null,
  consommedFoods: [],
  quantity: '',
};

export const FoodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      return { ...state, date: action.payload };
    },
    setCategory: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        category: action.payload,
        selectedFood: null,
        quantity: '',
      };
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },
    setSelectedFood: (state, action: PayloadAction<Food>) => {
      return { ...state, selectedFood: action.payload };
    },
    setQuantity: (state, action: PayloadAction<number | ''>) => {
      return { ...state, quantity: action.payload };
    },
    setId: (state, action: PayloadAction<number>) => {
      return { ...state, id: action.payload };
    },
    setConsommedFoods: (state) => {
      if (state.selectedFood && state.quantity) {
        return {
          ...state,
          consommedFoods: [...state.consommedFoods, { ...state.selectedFood, quantity: state.quantity }],
        };
      }
    },
    resetInputs: (state) => {
      return { ...state, ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.foods = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {})
      .addCase(postFood.fulfilled, (state, action) => {
        return { ...state, selectedFood: action.payload };
      })
      .addCase(postFood.rejected, (state, action) => {});
  },
});

export const {
  setDate,
  setCategory,
  setIsLoading,
  setSelectedFood,
  setQuantity,
  setConsommedFoods,
  resetInputs,
  setId,
} = FoodSlice.actions;

export const selectDate = (state: RootState) => state.food.date;
export const selectCategory = (state: RootState) => state.food.category;
export const selectFoodsList = (state: RootState) => state.food.foods;
export const selectIsLoading = (state: RootState) => state.food.isLoading;
export const selectSelectedFood = (state: RootState) => state.food.selectedFood;
export const selectQuantity = (state: RootState) => state.food.quantity;
export const selectConsommedFoods = (state: RootState) => state.food.consommedFoods;
export const selectId = (state: RootState) => state.food.id;

export default FoodSlice.reducer;
