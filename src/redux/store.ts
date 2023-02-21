import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from '../features/UI/uiSlice';
import loginReducer from '../features/login/loginSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    login : loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
