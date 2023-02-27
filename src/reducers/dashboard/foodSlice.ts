import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store/store";

interface Nutriments {
  "energy-kcal": number;
}
interface ApiProps {
  id: string;
  product_name_fr: string;
  nutriments: Nutriments;
}

export interface Food {
  key: string;
  name: string;
  calories: number;
}

interface FoodState {
  date: string | null;
  category: string | null;
  foods: Food[];
  isLoading: boolean;
  selectedFood: Food | null;
  quantity: number | "";
}

const initialState: FoodState = {
  date: null,
  category: null,
  foods: [],
  isLoading: false,
  selectedFood: null,
  quantity: "",
};
// https://redux-toolkit.js.org/api/createAsyncThunk#providing-a-custom-dispatch-function
export const fetchProducts = createAsyncThunk(
  "food/fetchProducts",
  async (categoryName: string, { dispatch }) => {
    const category = categoryName.toLowerCase().replace(/\s+/g, "-");
    dispatch(setIsLoading(true));
    const response = await axios.get(
      `https://fr.openfoodfacts.org/categorie/${category}.json`
    );
    dispatch(setIsLoading(false));
    return response.data.products.map((product: ApiProps) => ({
      key: product.id,
      name: product.product_name_fr,
      calories: product["nutriments"]["energy-kcal"],
    }));
  }
);

export const FoodSlice = createSlice({
  name: "food",
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
        quantity: "",
      };
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },
    setSelectedFood: (state, action: PayloadAction<Food>) => {
      return { ...state, selectedFood: action.payload };
    },
    setQuantity: (state, action: PayloadAction<number | "">) => {
      return { ...state, quantity: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.foods = action.payload;
    });
  },
});

export const {
  setDate,
  setCategory,
  setIsLoading,
  setSelectedFood,
  setQuantity,
} = FoodSlice.actions;

export const selectDate = (state: RootState) => state.food.date;
export const selectCategory = (state: RootState) => state.food.category;
export const selectFoods = (state: RootState) => state.food.foods;
export const selectIsLoading = (state: RootState) => state.food.isLoading;
export const selectSelectedFood = (state: RootState) => state.food.selectedFood;
export const selectQuantity = (state: RootState) => state.food.quantity;

export default FoodSlice.reducer;
