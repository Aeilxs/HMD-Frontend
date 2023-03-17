import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
// import { getFoodNameById, getUniqueFoods } from '../../utils/math';

import {
  resetFoodInputs,
  selectFoodMessage,
  selectFoodsList,
  selectIsLoading,
  selectSelectedFood,
} from '../../reducers/dashboard/food/foodSlice';
import { selectFoodInputs, selectIsEdit, setIsEdit, setInputValue } from '../../reducers/UI/uiSlice';
import { editFood, postFood } from '../../reducers/dashboard/food/foodMiddleware';

import MessageBox from '../../shared/MessageBox/MessageBox';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';

import FoodTable from './FoodTable/FoodTable';
import FoodSelector from './FoodSelector/FoodSelector';
import CategorySelector from './CategorySelector/CategorySelector';
import QuantitySelector from './QuantitySelector/QuantitySelector';

import { Box, Container, Button, Typography, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function FoodPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(selectIsEdit);
  const isLoading = useAppSelector(selectIsLoading);
  const foodsList = useAppSelector(selectFoodsList);
  const selectedFood = useAppSelector(selectSelectedFood);
  const { date, category } = useAppSelector(selectFoodInputs);
  // const uniqueFoods = getUniqueFoods(foodsList);
  const message = useAppSelector(selectFoodMessage);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue({ path: 'foodInputs', name: event.target.name, value: event.target.value }));
  };

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
    <Container sx={{ position: 'relative' }}>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard')}
        sx={{ position: 'absolute' }}
      >
        dashboard
      </Button>
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
      {/* {foods.length > 0 && <FoodTable />} */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: 'auto',
          mt: 5,
          p: '1em',
          boxSizing: 'border-box',
        }}
        onSubmit={(event) => {
          event.preventDefault();
          isEdit ? dispatch(editFood(selectedFood)) : dispatch(postFood(selectedFood));
          dispatch(resetFoodInputs());
          dispatch(setIsEdit(false));
        }}
      >
        {message.message && <Alert severity={message.severity}>{message.message}</Alert>}
        {isEdit ? (
          <Typography
            variant="h5"
            sx={{ marginBottom: '1em' }}
          >
            {/* Modification de l'aliment "{getFoodNameById()}" */}
          </Typography>
        ) : (
          <Typography
            variant="h5"
            sx={{ marginBottom: '1em' }}
          >
            Nouvel ajout :
          </Typography>
        )}
        <CategorySelector aliments={aliments} />
        {isLoading && <CircularProgress sx={{ m: 'auto', my: 1 }} />}
        {/* {!isLoading && foodsList.length > 0 && <FoodSelector foods={uniqueFoods} />} */}
        {selectedFood && <QuantitySelector />}
        <CustomDatePicker
          name="date"
          path="foodInputs"
          value={date}
          actionCreator={setInputValue}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
          <Button
            variant="contained"
            type="submit"
          >
            Ajouter un aliment
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
