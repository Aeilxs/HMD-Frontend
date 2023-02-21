import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface UserState {
  isLogged: boolean;
}

const initialState: UserState = {
  isLogged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

// export const {} = userSlice.actions;

export const selectIsLogged = (state: RootState) => state.user.isLogged;

export default userSlice.reducer;
