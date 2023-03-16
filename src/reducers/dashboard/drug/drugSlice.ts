import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessage } from '../../../Interfaces/AlertMessage';
import { DrugResponse } from '../../../Interfaces/API_Interfaces';
import { RootState } from '../../../store/store';
import { deleteDrug, editDrug, postDrug } from './drugMiddleware';

export interface drugState {
  id: null | number;
  message: AlertMessage;
  date: string | null;
  name: string;
  unit: string;
  quantity: number | '';
  infos: string;
}

const initialState: drugState = {
  id: null,
  message: { severity: 'info', message: '' },
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
    setSelectedDrug: (state, action: PayloadAction<DrugResponse>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postDrug.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity: severity, message: message } };
      })
      .addCase(postDrug.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity: severity, message: message } };
      })
      .addCase(editDrug.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity: severity, message: message } };
      })
      .addCase(editDrug.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity: severity, message: message } };
      })
      .addCase(deleteDrug.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity: severity, message: message } };
      })
      .addCase(deleteDrug.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity: severity, message: message } };
      });
  },
});

export const { setSelectedDrug } = drugSlice.actions;

export const selectDrugMessage = (state: RootState) => state.drug.message;

export default drugSlice.reducer;
