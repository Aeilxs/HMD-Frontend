import { Box } from '@mui/system';
import { Alert, Autocomplete, Button, CircularProgress, Container, TextField } from '@mui/material';
import { selectFoodInputs, setInputValue } from '../../reducers/UI/uiSlice';
import MessageBox from '../../shared/MessageBox/MessageBox';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCategories, fetchProducts } from '../../reducers/dashboard/food/foodMiddleware';
import { selectFoodMessage, selectOFFCategories, selectOFFFoods } from '../../reducers/dashboard/food/foodSlice';
import FoodGrid from './FoodGrid/FoodGrid';
import { CATEGORIES_ARRAY_TEMP } from '../../utils/OFFCategories';

export default function FoodPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector(selectFoodInputs);
  const { severity, message } = useAppSelector(selectFoodMessage);
  const { foodsArray, foodsStatus } = useAppSelector(selectOFFFoods);
  const { categoriesArray: toto, categoriesStatus: toto2 } = useAppSelector(selectOFFCategories);

  //!\ TEMPORARY //
  const categoriesArray = CATEGORIES_ARRAY_TEMP;
  const categoriesStatus = 'fulfilled';
  // if (categoriesStatus === 'idle') {
  //   dispatch(fetchCategories());
  // }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue({ path: 'foodInputs', name: event.target.name, value: event.target.value }));
  };

  return (
    <Container sx={{ my: 2 }}>
      <MessageBox
        title="Alimentation"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, esse? Perferendis porro maiores eaque ipsa sit, architecto voluptatibus saepe totam dicta harum, id, possimus asperiores eligendi laudantium odio quo. Omnis."
      />
      <Box
        onSubmit={(event) => {
          console.log('SUBMIT: ', search);
          event.preventDefault();
          dispatch(fetchProducts());
        }}
        component="form"
      >
        {/* TEMPORARY */}
        {/* {categoriesStatus === 'pending' && (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        )} */}

        <Autocomplete
          sx={{ my: 2 }}
          options={categoriesArray}
          disabled={categoriesArray.length === 0}
          onInputChange={(_, newInputValue) => {
            dispatch(setInputValue({ path: 'foodInputs', name: 'category', value: newInputValue }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="category"
              label="Catégories"
            />
          )}
        />
        {categoriesArray.length > 0 && (
          <>
            <TextField
              name="search"
              fullWidth
              value={search}
              onChange={handleChange}
              label="Recherchez un aliment"
            />
            <FoodGrid
              array={foodsArray}
              status={foodsStatus}
            />
            <Button
              sx={{ my: 2, display: 'block', mx: 'auto' }}
              type="submit"
              disabled={foodsStatus === 'pending' ? true : false}
              variant="contained"
            >
              recherchez
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
