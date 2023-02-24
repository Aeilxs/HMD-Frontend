import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface HydrationState {
  date: string | null;
  quantity: number | '';
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
});

export const { setDate, setQuantity } = hydrationSlice.actions;

export const selectHydrationDate = (state: RootState) => state.hydration.date;
export const selectHydrationQuantity = (state: RootState) => state.hydration.quantity;

export default hydrationSlice.reducer;
