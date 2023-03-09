import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessage } from '../../../shared/Interfaces/AlertMessage';
import { RootState } from '../../../store/store';
import { deleteFood, editFood, fetchProducts, postFood } from './foodMiddleware';

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
  message: AlertMessage;
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
  message: { severity: 'info', message: '' },
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
      .addCase(postFood.fulfilled, (state, action) => {
        console.log(action.payload)
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, selectedFood: action.payload.data,  message: { severity: severity, message: message } };
      })
      .addCase(postFood.rejected, (state, action) => {
        console.log(action.payload)
          const { severity, message } = action.payload as AlertMessage;
          return { ...state,  message: { severity: severity, message: message } };
        })
      .addCase(editFood.fulfilled, (state, action) => {
        console.log(action.payload)
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, selectedFood: action.payload.data,  message: { severity: severity, message: message } };
      })
      .addCase(editFood.rejected, (state, action) => {
        console.log(action.payload)
        const { severity, message } = action.payload as AlertMessage;
        return { ...state,  message: { severity: severity, message: message } };
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        console.log(action.payload)
        const { severity, message } = action.payload as AlertMessage;
        return { ...state,  message: { severity: severity, message: message } };
      })
      .addCase(deleteFood.rejected, (state, action) => {
        console.log(action.payload)
        const { severity, message } = action.payload as AlertMessage;
        return { ...state,  message: { severity: severity, message: message } };
      });
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
export const selectFoodMessage = (state: RootState) => state.food.message;

export default FoodSlice.reducer;
