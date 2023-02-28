import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store/store';
import { setLoginError, setValue } from '../UI/uiSlice';

// action de connexion
export const registerLoginUser = createAsyncThunk(
  'ui/registerLoginUser',
  async (_, { getState, dispatch }) => {
    try {
      const { email, password } = (getState() as RootState).ui.user;
      const response = await axios.post('https://localhost:8000/api/login', {
        username: email,
        password: password,
      });
      dispatch(setLoginError(false));
      dispatch(setValue({ value: '', name: 'email' }));
      dispatch(setValue({ value: '', name: 'password' }));
      return response.data.token;
    } catch (error) {
      dispatch(setLoginError(true));
      throw error;
    }
  }
);

// action d'inscription
// export const registerUser = createAsyncThunk(
//   "user/registerUser",
//   async (_, { getState }) => {
//     const { firstname, lastname, email, password, gender } = (getState() as RootState).ui.user;
//     const response = await axios.post("http://localhost:8000/api/users", {
//       firstname: firstname,
//       lastname: lastname,
//       email: email,
//       password: password,
//       gender: gender,
//     });
//     return response.data;
//   }
// );

// action de récuperation des données médicamenteuses
export const fetchDrugs = createAsyncThunk(
  "user/fetchDrugs",
  async (_, { getState }) => {
    const token = (getState() as RootState).user.token;
    const response = await axios.get(
      `http://localhost:8000/api/users/1/medications`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);
