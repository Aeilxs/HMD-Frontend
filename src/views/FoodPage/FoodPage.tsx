import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  Food,
  resetInputs,
  selectDate,
  selectFoodsList,
  selectIsLoading,
  selectSelectedFood,
  setConsommedFoods,
  setDate,
} from '../../reducers/dashboard/food/foodSlice';
import { selectIsEdit } from '../../reducers/UI/uiSlice';
import { selectFoods } from '../../reducers/user/userSlice';
import { editFood, postFood } from '../../reducers/dashboard/food/foodMiddleware';

import MessageBox from '../../shared/MessageBox/MessageBox';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';

import FoodTable from './FoodTable/FoodTable';
import FoodSelector from './FoodSelector/FoodSelector';
import CategorySelector from './CategorySelector/CategorySelector';
import QuantitySelector from './QuantitySelector/QuantitySelector';

import { Box, Container, Button, Typography, CircularProgress } from '@mui/material';

export default function FoodPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const foodsList = useAppSelector(selectFoodsList);
  const isLoading = useAppSelector(selectIsLoading);
  const selectedFood = useAppSelector(selectSelectedFood);
  const date = useAppSelector(selectDate);
  const foods = useAppSelector(selectFoods);
  const isEdit = useAppSelector(selectIsEdit);

  const aliments = [
    'Fruits frais',
    'Légumes frais',
    'Viandes',
    'Oeufs',
    'Poissons',
    'Produits laitiers',
    'Féculents',
    'Boissons',
    'Sauces',
  ];

  /**
   * Retourne un tableau d'aliments unique en fonction du nom
   *
   * @param {Food[]} foods - Le tableau d'aliments à filtrer
   * @returns {Food[]} Le tableau d'aliments unique en fonction de leur nom
   */
  const uniqueFoods: Food[] = foodsList.filter(
    (food, index, array) =>
      food.name && food.calories && array.find((element) => element.name === food.name) === food
  );

  return (
    <Container>
      <Typography
        variant="h1"
        sx={{ fontSize: '3em', textAlign: 'center', my: 5 }}
      >
        Alimentation
      </Typography>
      <MessageBox
        title="Lorem ipsum"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quibusdam, deleniti ipsa repudiandae neque, autem quidem, voluptates corporis numquam eius ducimus expedita voluptatum! Dolor sapiente odio provident iste voluptatem! Asperiores."
        width={100}
      />
      <FoodTable />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: 'auto',
          mt: 5,
          p: '1em',
          boxSizing: 'border-box',
        }}
      >
        {isEdit ? (
          <Typography variant="subtitle1">Edition :</Typography>
        ) : (
          <Typography variant="subtitle1">Nouvel ajout :</Typography>
        )}
        <CategorySelector aliments={aliments} />
        {isLoading && <CircularProgress sx={{ m: 'auto' }} />}
        {!isLoading && foodsList.length > 0 && <FoodSelector foods={uniqueFoods} />}
        {selectedFood && <QuantitySelector />}
        <CustomDatePicker
          value={date}
          actionCreator={setDate}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
          <Button
            variant="contained"
            onClick={() => {
              console.log(foods);
              dispatch(setConsommedFoods());
              isEdit ? dispatch(editFood(selectedFood)) : dispatch(postFood(selectedFood));
              dispatch(resetInputs());
            }}
          >
            Enregistrer et ajouter un aliment
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
