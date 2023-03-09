import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { editDrug, postDrug } from './drugMiddleware';

export interface drugState {
  id: null | number;
  date: string | null;
  name: string;
  unit: string;
  quantity: number | '';
  infos: string;
}

export interface dataDrugApi {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  date: string;
}

const initialState: drugState = {
  id: null,
  date: null,
  name: '',
  unit: '',
  quantity: '',
  infos: '',
};

export const drugSlice = createSlice({
  name: 'drug',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      return { ...state, date: action.payload };
    },
    setName: (state, action: PayloadAction<string>) => {
      return { ...state, name: action.payload };
    },
    setUnit: (state, action: PayloadAction<string>) => {
      return { ...state, unit: action.payload };
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      return { ...state, quantity: action.payload };
    },
    setInfos: (state, action: PayloadAction<string>) => {
      return { ...state, infos: action.payload };
    },
    setSelectedDrug: (state, action: PayloadAction<dataDrugApi>) => {
      return { ...state, ...action.payload };
    },
    resetInputs: (state) => {
      return { ...state, date: null, name: '', unit: '', quantity: '', infos: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postDrug.fulfilled, (state, action) => {})
      .addCase(postDrug.rejected, () => {})
      .addCase(editDrug.fulfilled, (state, action) => {
        return { ...state, isEdit: false };
      })
      .addCase(editDrug.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const { setDate, setName, setUnit, setQuantity, setInfos, setSelectedDrug, resetInputs } = drugSlice.actions;

export const selectDate = (state: RootState) => state.drug.date;
export const selectName = (state: RootState) => state.drug.name;
export const selectUnit = (state: RootState) => state.drug.unit;
export const selectQuantity = (state: RootState) => state.drug.quantity;
export const selectInfos = (state: RootState) => state.drug.infos;

export default drugSlice.reducer;
