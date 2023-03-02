import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from '../reducers/UI/uiSlice';
import userReducer from '../reducers/user/userSlice';
import drugReducer from '../reducers/dashboard/drugSlice';
import foodReducer from '../reducers/dashboard/foodSlice';
import hydrationReducer from '../reducers/dashboard/hydrationSlice';
import sleepReducer from '../reducers/dashboard/sleepSlice';
import smokeReducer from '../reducers/dashboard/smokeSlice';
import sportReducer from '../reducers/dashboard/sportSlice';
import profilReducer from '../reducers/dashboard/profilSlice';

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
    profil: profilReducer,
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
