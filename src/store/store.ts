import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from '../reducers/UI/uiSlice';
import userReducer from '../reducers/user/userSlice';
import drugReducer from '../reducers/dashboard/drug/drugSlice';
import foodReducer from '../reducers/dashboard/food/foodSlice';
import hydrationReducer from '../reducers/dashboard/hydration/hydrationSlice';
import sleepReducer from '../reducers/dashboard/sleep/sleepSlice';
import smokeReducer from '../reducers/dashboard/smoke/smokeSlice';
import sportReducer from '../reducers/dashboard/sport/sportSlice';

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
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
