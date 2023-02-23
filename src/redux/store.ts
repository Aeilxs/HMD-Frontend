import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from '../features/UI/uiSlice';
import userReducer from '../features/user/userSlice';
import drugReducer from '../features/dashboard/drugSlice';
import foodReducer from '../features/dashboard/foodSlice';
import hydrationReducer from '../features/dashboard/hydrationSlice';
import sleepReducer from '../features/dashboard/sleepSlice';
import smokeReducer from '../features/dashboard/smokeSlice';
import sportReducer from '../features/dashboard/sportSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    drug: drugReducer,
    food: foodReducer,
    hydration: hydrationReducer,
    sleep: sleepReducer,
    smoke: smokeReducer,
    sport: sportReducer,
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
