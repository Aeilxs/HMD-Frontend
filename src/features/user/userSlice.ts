import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface UserState {
  isLogged: boolean;
  dateOfBirth: string;
}

const initialState: UserState = {
  isLogged: true,
  dateOfBirth: '09/02/1994',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDateOfBirth: (state, action: any) => {
      // console.log('PAYLOAD: ', action.payload);
      // state.dateOfBirth = action.payload;
      return { ...state, dateOfBirth: action.payload };
    },
  },
});

export const { setDateOfBirth } = userSlice.actions;

export const selectIsLogged = (state: RootState) => state.user.isLogged;
export const selectDateOfBirth = (state: RootState) => state.user.dateOfBirth;

export default userSlice.reducer;
