import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { Food } from './foodSlice';
import { calcCalories, calcMB } from '../../../utils/math';
import { removeFood, setFood, updateFood } from '../../user/userSlice';

export const postFood = createAsyncThunk(
  'food/postFood',
  async (selectedFood: Food | null, { getState, dispatch }) => {
    try {
      const { date, quantity } = (getState() as RootState).food;
      if (!selectedFood) {
        throw new Error('Selected food is not set');
      }
      const { name } = selectedFood;
      const token = (getState() as RootState).user.token;
      const response = await axios.post(
        'http://localhost:8000/api/users/alimentations',
        {
          caloricNeed: calcMB({
            weight: (getState() as RootState).user.properties[0].weight,
            height: (getState() as RootState).user.properties[0].size,
            age: (getState() as RootState).user.properties[0].age,
            gender: (getState() as RootState).user.gender
          }),
          caloricIntake: calcCalories({ ...selectedFood, quantity: Number(quantity) }),
          date: date,
          name: name,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setFood(response.data));
      return response.data;
    }
    catch (error) {
      console.error(error);
    }
  }
);

export const editFood = createAsyncThunk('food/editFood',   async ( selectedFood: Food | null, { getState, dispatch }) => {
  try {
    const { date, quantity, id } = (getState() as RootState).food;
    console.log(id)
    if (!selectedFood) {
      throw new Error('Selected food is not set');
    }
    const { name } = selectedFood;
    const token = (getState() as RootState).user.token;
    const response = await axios.patch(
      `http://localhost:8000/api/users/alimentations/${id}`,
      {
        caloricNeed: calcMB({
          weight: (getState() as RootState).user.properties[0].weight,
          height: (getState() as RootState).user.properties[0].size,
          age: (getState() as RootState).user.properties[0].age,
          gender: (getState() as RootState).user.gender
        }),
        caloricIntake: calcCalories({ ...selectedFood, quantity: Number(quantity) }),
        date: date,
        name: name,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(updateFood(response.data));
    return response.data;
  }
  catch (error) {
    console.error(error);
  }
});


export const deleteFood = createAsyncThunk('food/deleteFood', async (id:number, { getState, dispatch }) => {
  try {
  const token = (getState() as RootState).user.token;
  const response = await axios.delete(
   `http://localhost:8000/api/users/alimentations/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(removeFood(id));
  return response.data;
  }
  catch (error) {
    console.error(error);
  }
});