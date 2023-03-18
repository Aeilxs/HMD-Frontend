import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessage } from '../../../Interfaces/API_Interfaces';
import { RootState } from '../../../store/store';

export interface Nutriments {
  'energy-kcal_100g': number;
}
export interface ApiProps {
  id: string;
  product_name_fr: string;
  nutriments: Nutriments;
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
  message: AlertMessage;
  displayedFoods: [];
  foods: Food[];
}

const initialState: FoodState = {
  message: { severity: 'info', message: '' },
  displayedFoods: [],
  foods: [],
};

export const FoodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoods: (state, action: PayloadAction<Food[]>) => {
      return { ...state, foods: action.payload };
    },
  },
  extraReducers: (builder) => {
    // .addCase(postFood.fulfilled, (state, action) => {
    //   const { severity, message } = action.payload as AlertMessage;
    //   return { ...state, selectedFood: action.payload.data, message: { severity, message } };
    // })
    // .addCase(postFood.rejected, (state, action) => {
    //   const { severity, message } = action.payload as AlertMessage;
    //   return { ...state, message: { severity, message } };
    // })
    // .addCase(editFood.fulfilled, (state, action) => {
    //   const { severity, message } = action.payload as AlertMessage;
    //   return { ...state, selectedFood: action.payload.data, message: { severity, message } };
    // })
    // .addCase(editFood.rejected, (state, action) => {
    //   const { severity, message } = action.payload as AlertMessage;
    //   return { ...state, message: { severity, message } };
    // })
    // .addCase(deleteFood.fulfilled, (state, action) => {
    //   const { severity, message } = action.payload as AlertMessage;
    //   return { ...state, message: { severity, message } };
    // })
    // .addCase(deleteFood.rejected, (state, action) => {
    //   const { severity, message } = action.payload as AlertMessage;
    //   return { ...state, message: { severity, message } };
    // });
  },
});

export const {} = FoodSlice.actions;

export const selectFoodsList = (state: RootState) => state.food.foods;
export const selectFoodMessage = (state: RootState) => state.food.message;

export default FoodSlice.reducer;
