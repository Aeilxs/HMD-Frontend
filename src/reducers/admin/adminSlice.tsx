import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessage, RequestStatus } from '../../Interfaces/API_Interfaces';
import { AdminState } from '../../Interfaces/Reducers-Interfaces';

import { RootState } from '../../store/store';
import { admin_fetchCategories, admin_postCategories } from './adminMiddleware';

const initialState: AdminState = {
  categories: {
    isUpdated: false,
    categoriesArray: [],
    message: {
      severity: 'info',
      message: '',
    },
    categoriesStatus: 'idle',
    tries: 0,
  },
  postCategories: {
    message: { severity: 'info', message: '' },
    categoriesPostStatus: 'idle',
    progress: 0,
  },
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    incrementTries: (state) => {
      return {
        ...state,
        categories: { ...state.categories, tries: state.categories.tries + 1 },
      };
    },
    setIsCategoriesUpdated: (state, action: PayloadAction<boolean>) => {
      return { ...state, categories: { ...state.categories, isUpdated: action.payload } };
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        categories: { ...state.categories, categoriesArray: action.payload },
      };
    },
    setProgress: (state, action: PayloadAction<number>) => {
      return { ...state, postCategories: { ...state.postCategories, progress: action.payload } };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_fetchCategories.pending, (state) => {
        return {
          ...state,
          categories: {
            ...state.categories,
            message: { severity: 'info', message: 'En cours de chargement.' },
            categoriesStatus: 'pending',
          },
        };
      })
      .addCase(admin_fetchCategories.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        const status = action.payload.status as RequestStatus;
        return {
          ...state,
          categories: {
            ...state.categories,
            message: { severity, message },
            categoriesStatus: status,
          },
        };
      })
      .addCase(admin_fetchCategories.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return {
          ...state,
          categories: {
            ...state.categories,
            message: { severity, message },
            categoriesStatus: 'rejected',
          },
        };
      })
      .addCase(admin_postCategories.pending, (state, action) => {
        return { ...state, postCategories: { ...state.postCategories, categoriesPostStatus: 'pending' } };
      })
      .addCase(admin_postCategories.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return {
          ...state,
          postCategories: {
            ...state.postCategories,
            message: { severity, message },
            categoriesPostStatus: 'fulfilled',
          },
        };
      })
      .addCase(admin_postCategories.rejected, (state) => {
        return { ...state, postCategories: { ...state.postCategories, categoriesPostStatus: 'rejected' } };
      });
  },
});

export const { setCategories, incrementTries, setProgress, setIsCategoriesUpdated } = adminSlice.actions;

export const admin_selectCategoriesStatus = (state: RootState) => state.admin.categories.categoriesStatus;
export const admin_selectTries = (state: RootState) => state.admin.categories.tries;
export const admin_selectCategoriesMessage = (state: RootState) => state.admin.categories.message;
export const admin_selectProgress = (state: RootState) => state.admin.postCategories.progress;
export const admin_selectPostCategoriesMessage = (state: RootState) => state.admin.postCategories.message;
export const admin_selectPostCategoriesStatus = (state: RootState) => state.admin.postCategories.categoriesPostStatus;
export const admin_selectIsUpdated = (state: RootState) => state.admin.categories.isUpdated;

export default adminSlice.reducer;
