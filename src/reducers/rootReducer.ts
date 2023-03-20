import { combineReducers, createAction } from '@reduxjs/toolkit';
import activityReducer from './dashboard/activity/activitySlice';
import adminReducer from './admin/adminSlice';
import drugReducer from './dashboard/drug/drugSlice';
import foodReducer from './dashboard/food/foodSlice';
import hydrationReducer from './dashboard/hydration/hydrationSlice';
import sleepReducer from './dashboard/sleep/sleepSlice';
import smokeReducer from './dashboard/smoke/smokeSlice';
import uiReducer from './UI/uiSlice';
import userReducer from './user/userSlice';

const rootReducer = combineReducers({
  activity: activityReducer,
  admin: adminReducer,
  drug: drugReducer,
  food: foodReducer,
  hydration: hydrationReducer,
  sleep: sleepReducer,
  smoke: smokeReducer,
  ui: uiReducer,
  user: userReducer,
});

/**
 * The function return an array of actions that reset state for each reducers because I couldn't make it work in other way
 * I checked on the internet unfortunately but it seems to work fine !
 */
export const resetAllStates = () => {
  return ['ui', 'admin', 'user', 'drug', 'food', 'hydration', 'sleep', 'smoke', 'activity'].map((prefix) =>
    createAction(prefix + '/resetState')
  );
};

export default rootReducer;
