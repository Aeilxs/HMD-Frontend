import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { postHydration } from './hydrationMiddleware';

export interface HydrationState {
  date: string | null;
  quantity: number | '';
}

export interface dataHydrationApi {
  id: number;
  quantity: number;
  date: string;
}

const initialState: HydrationState = {
  date: null,
  quantity: '',
};

export const hydrationSlice = createSlice({
  name: 'hydration',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      return { ...state, date: action.payload };
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      return { ...state, quantity: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postHydration.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(postHydration.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const { setDate, setQuantity } = hydrationSlice.actions;

export const selectHydrationDate = (state: RootState) => state.hydration.date;
export const selectHydrationQuantity = (state: RootState) => state.hydration.quantity;

export default hydrationSlice.reducer;
