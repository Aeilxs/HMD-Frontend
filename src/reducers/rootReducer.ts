import { combineReducers, createAction } from '@reduxjs/toolkit';
import uiReducer from './UI/uiSlice';
import userReducer from './user/userSlice';
import drugReducer from './dashboard/drug/drugSlice';
import foodReducer from './dashboard/food/foodSlice';
import hydrationReducer from './dashboard/hydration/hydrationSlice';
import sleepReducer from './dashboard/sleep/sleepSlice';
import smokeReducer from './dashboard/smoke/smokeSlice';
import activityReducer from './dashboard/activity/activitySlice';

const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  drug: drugReducer,
  food: foodReducer,
  hydration: hydrationReducer,
  sleep: sleepReducer,
  smoke: smokeReducer,
  activity: activityReducer,
});

/**
 * The function return an array of action creator that reset state for each reducers because I couldn't make it work in other way
 * I checked on the internet unfortunately but it seems to work fine !
 */
export const resetAllStates = () => {
  return ['ui', 'user', 'drug', 'food', 'hydration', 'sleep', 'smoke', 'activity'].map((prefix) =>
    createAction(prefix + '/resetState')
  );
};

export default rootReducer;
