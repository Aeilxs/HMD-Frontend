import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { LoginResponse, UserDataResponse } from '../../Interfaces/API_Interfaces';
import { setSleeps } from '../dashboard/sleep/sleepSlice';
import { setActivities } from '../dashboard/activity/activitySlice';
import { setSmokes } from '../dashboard/smoke/smokeSlice';
import { setDrugs } from '../dashboard/drug/drugSlice';
import { setHydrations } from '../dashboard/hydration/hydrationSlice';
import { onSuccesAuthentication, setIsLogged, setUserData } from './userSlice';
import { setFoods } from '../dashboard/food/foodSlice';
import { resetInputValue, setInputValue } from '../UI/uiSlice';
import { calcAge, calcMB } from '../../utils/math';

export const registerLoginUser = createAsyncThunk(
  'ui/registerLoginUser',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { email, password } = (getState() as RootState).ui.authenticationInputs;
    try {
      const response = await axios.post<LoginResponse>('https://localhost:8000/api/login', {
        email: email,
        password: password,
      });
      dispatch(onSuccesAuthentication({ token: response.data.token, id: response.data.id }));
      dispatch(fetchUser());
      dispatch(setIsLogged());
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    } catch (error: any) {
      if (!axios.isAxiosError(error)) throw error;
      return rejectWithValue('Identifiants incorrect');
    }
  }
);

export const registerUser = createAsyncThunk('user/registerUser', async (_, { getState, rejectWithValue }) => {
  const { firstname, lastname, email, password, gender } = (getState() as RootState).ui.authenticationInputs;
  try {
    const response = await axios.post('https://localhost:8000/api/users', {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      gender: gender,
    });
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue('Tous les champs doivent être remplis');
  }
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { getState, dispatch, rejectWithValue }) => {
  const { token, id } = (getState() as RootState).user;
  try {
    const response = await axios.get<UserDataResponse>(`https://localhost:8000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setUserData(response.data));
    dispatch(setActivities(response.data.user.activities));
    dispatch(setSleeps(response.data.user.sleeps));
    dispatch(setSmokes(response.data.user.smokes));
    dispatch(setDrugs(response.data.user.drugs));
    dispatch(setHydrations(response.data.user.hydrations));
    dispatch(setFoods(response.data.user.foods));
    dispatch(
      setInputValue({
        path: 'profilInputs',
        name: 'dateOfBirth',
        value: response.data.user.dateOfBirth,
      })
    );
    dispatch(
      setInputValue({
        path: 'profilInputs',
        name: 'weight',
        value: response.data.user.weight.toString(),
      })
    );
    dispatch(
      setInputValue({
        path: 'profilInputs',
        name: 'size',
        value: response.data.user.size.toString(),
      })
    );

    return response.data.message;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({
      severity: 'error',
      message: "Nous n'avons pas pu récupérer vos données, réessayez plus tard.",
    });
  }
});

export const editProfil = createAsyncThunk('user/editProfil', async (_, { getState, dispatch, rejectWithValue }) => {
  const { token, id, gender } = (getState() as RootState).user;
  const { dateOfBirth, size, weight } = (getState() as RootState).ui.profilInputs;
  try {
    const response = await axios.patch(
      `https://localhost:8000/api/users/${id}`,
      {
        caloricNeed: calcMB({
          weight: Number(weight),
          size: Number(size),
          age: calcAge(dateOfBirth),
          gender: gender,
        }),
        dateOfBirth: dateOfBirth,
        weight: Number(weight),
        size: Number(size),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(resetInputValue('foodInputs'));
    dispatch(setUserData(response.data));
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    return rejectWithValue({ severity: 'error', message: 'Echec de la modification' });
  }
});
