import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store/store';
import { setLoginError, setValue } from '../UI/uiSlice';
// import { createMemoryHistory } from '@remix-run/router';

// action de connexion
export const registerLoginUser = createAsyncThunk(
  'ui/registerLoginUser',
  async (_, { getState, dispatch }) => {
    try {
      const { email, password } = (getState() as RootState).ui.user;
      const response = await axios.post('http://localhost:8000/api/login', {
        username: email,
        password: password,
      });
      // const history = createMemoryHistory();
      // history.replace('/');
      // console.log(history);
      dispatch(setLoginError(false));
      dispatch(setValue({ value: '', name: 'email' }));
      dispatch(setValue({ value: '', name: 'password' }));
      dispatch(fetchUser(response.data.token));
      return response.data.token;
    } catch (error) {
      dispatch(setLoginError(true));
    }
  }
);
// action d'inscription
export const registerUser = createAsyncThunk('user/registerUser', async (_, { getState }) => {
  console.log('middleware registerUser');
  const { firstname, lastname, email, password, gender } = (getState() as RootState).ui.user;
  const response = await axios.post('http://localhost:8000/api/users', {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    gender: gender,
  });
  return response.data;
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (token: string) => {
  const response = await axios.get(`http://localhost:8000/api/users/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});
