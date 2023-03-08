import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { getFoodNameById, getUniqueFoods } from '../../utils/math';

import {
  resetInputs,
  selectDate,
  selectFoodsList,
  selectIsLoading,
  selectSelectedFood,
  setDate,
} from '../../reducers/dashboard/food/foodSlice';
import { selectIsEdit, setIsEdit } from '../../reducers/UI/uiSlice';
import { editFood, postFood } from '../../reducers/dashboard/food/foodMiddleware';

import MessageBox from '../../shared/MessageBox/MessageBox';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';

import FoodTable from './FoodTable/FoodTable';
import FoodSelector from './FoodSelector/FoodSelector';
import CategorySelector from './CategorySelector/CategorySelector';
import QuantitySelector from './QuantitySelector/QuantitySelector';

import { Box, Container, Button, Typography, CircularProgress } from '@mui/material';
import { selectFoods } from '../../reducers/user/userSlice';

export default function FoodPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(selectIsEdit);
  const isLoading = useAppSelector(selectIsLoading);
  const foodsList = useAppSelector(selectFoodsList);
  const selectedFood = useAppSelector(selectSelectedFood);
  const date = useAppSelector(selectDate);
  const uniqueFoods = getUniqueFoods(foodsList);
  const foods = useAppSelector(selectFoods)

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

  return (
    <Container>
      <Typography
        variant="h1"
        sx={{ fontSize: '3em', textAlign: 'center', my: 5 }}
      >
        Alimentation
      </Typography>
      <MessageBox
          title="Saviez-vous que l'alimentation peut influencer votre humeur ?"
          content="Les aliments que nous consommons peuvent affecter notre état d'esprit et notre humeur. Des études ont montré que certains aliments peuvent stimuler la production de neurotransmetteurs tels que la sérotonine, qui peuvent améliorer notre bien-être émotionnel. Cependant, d'autres aliments peuvent avoir l'effet inverse et causer de l'anxiété, de la fatigue ou de l'irritabilité. Il est donc important de faire des choix alimentaires sains pour maintenir une humeur positive."
        />
      {foods.length > 0 && <FoodTable />}
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: 'auto',
          mt: 5,
          p: '1em',
          boxSizing: 'border-box',
        }}
        onSubmit={(event) => {
          event.preventDefault()
          isEdit ? dispatch(editFood(selectedFood)) : dispatch(postFood(selectedFood));
          dispatch(resetInputs());
          dispatch(setIsEdit(false))
        }}
      >
          {isEdit ? (
            <Typography variant="h5" sx={{ marginBottom: '1em' }}>Modification de l'aliment "{getFoodNameById()}"</Typography>
          ) : (
            <Typography variant="h5" sx={{ marginBottom: '1em' }}>Nouvel ajout :</Typography>
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
            type='submit'
          >
            Ajouter un aliment
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
