import { useAppSelector } from '../../../redux/hooks';
import {
  Food,
  selectFoods,
  selectIsLoading,
  selectSelectedFood,
} from '../../../features/dashboard/foodSlice';

import Category from './Category/Category';
import FoodSelect from './Food/Food';
import QuantitySelect from './Quantity/Quantity';

import { Box, Container, Button, Typography, CircularProgress } from '@mui/material';

export default function FoodPage(): JSX.Element {
  const foods = useAppSelector(selectFoods);
  const isLoading = useAppSelector(selectIsLoading);
  const selectedFood = useAppSelector(selectSelectedFood);

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
      food.name && array.find((element) => element.name === food.name) === food
  );

  return (
    <Container>
      <Typography
        variant="h1"
        sx={{ fontSize: '3em', textAlign: 'center', my: 5 }}
      >
        Alimentation
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
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
          <Category aliments={aliments} />
          {isLoading && <CircularProgress sx={{ m: 'auto' }} />}
          {!isLoading && foods.length > 0 && <FoodSelect foods={uniqueFoods} />}
          {selectedFood !== null && <QuantitySelect />}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
        <Button variant="contained">Envoyer</Button>
      </Box>
    </Container>
  );
}
