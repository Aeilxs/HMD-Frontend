import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  Food,
  selectConsommedFoods,
  selectDate,
  selectFoods,
  selectIsLoading,
  selectSelectedFood,
  setConsommedFoods,
  setDate,
} from '../../reducers/dashboard/food/foodSlice';

import CategorySelector from './CategorySelector/CategorySelector';
import FoodSelector from './FoodSelector/FoodSelector';
import QuantitySelector from './QuantitySelector/QuantitySelector';

import { Box, Container, Button, Typography, CircularProgress } from '@mui/material';
import MessageBox from '../../shared/MessageBox/MessageBox';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import { calcTotalCalories } from '../../utils/math';

export default function FoodPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const foods = useAppSelector(selectFoods);
  const isLoading = useAppSelector(selectIsLoading);
  const selectedFood = useAppSelector(selectSelectedFood);
  const date = useAppSelector(selectDate);
  const consommedFoods = useAppSelector(selectConsommedFoods)

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
  const uniqueFoods: Food[] = foods.filter(
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          width: '50%',
          p: '1em',
          boxSizing: 'border-box',
        }}
      >
        <CategorySelector aliments={aliments} />
        {isLoading && <CircularProgress sx={{ m: 'auto' }} />}
        {!isLoading && foods.length > 0 && <FoodSelector foods={uniqueFoods} />}
        {selectedFood && <QuantitySelector />}
        <CustomDatePicker
          value={date}
          actionCreator={setDate}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(setConsommedFoods());
            }}
          >
            Enregistrer et ajouter un aliment
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
          <Button variant="contained" onClick={() => {
            console.log(calcTotalCalories(consommedFoods))
          }}>Enregistrer et retourner sur le dashboard</Button>
        </Box>
      </Box>
    </Container>
  );
}
