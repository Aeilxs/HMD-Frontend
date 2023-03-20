import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Drug, AlertMessage } from '../../../Interfaces/API_Interfaces';
import { DrugState } from '../../../Interfaces/Reducers-Interfaces';
import { RootState } from '../../../store/store';
import { deleteDrug, editDrug, postDrug } from './drugMiddleware';

const initialState: DrugState = {
  message: { severity: 'info', message: '' },
  drugs: [],
};

export const drugSlice = createSlice({
  name: 'drug',
  initialState,
  reducers: {
    setDrugs: (state, action: PayloadAction<Drug[]>) => {
      return { ...state, drugs: action.payload };
    },
    resetState: () => initialState,
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

export const { setDrugs } = drugSlice.actions;

export const selectDrugMessage = (state: RootState) => state.drug.message;
export const selectDrugs = (state: RootState) => state.drug.drugs;

export default drugSlice.reducer;
