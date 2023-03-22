import { Box } from '@mui/system';
import { Autocomplete, CircularProgress, Container, TextField } from '@mui/material';
import { setInputValue } from '../../reducers/UI/uiSlice';
import MessageBox from '../../shared/MessageBox/MessageBox';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  deleteFood,
  fetchCategories,
  fetchProducts,
} from '../../reducers/dashboard/food/foodMiddleware';
import {
  selectFoods,
  selectOFFCategories,
  selectOFFFoods,
} from '../../reducers/dashboard/food/foodSlice';

import FoodForm from './FoodForm/FoodForm';
import CustomTable from '../../shared/CustomTable/CustomTable';
import { useRef } from 'react';
import SearchFoodForm from './SearchFoodForm/SearchFoodForm';

export default function FoodPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { foodsStatus } = useAppSelector(selectOFFFoods);
  const { categoriesArray, categoriesStatus } = useAppSelector(selectOFFCategories);
  const foods = useAppSelector(selectFoods);
  const formRef = useRef(null);

  //!\ TEMPORARY //
  // const categoriesArray = CATEGORIES_ARRAY_TEMP;
  if (categoriesStatus === 'idle') {
    dispatch(fetchCategories());
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setInputValue({ path: 'foodInputs', name: event.target.name, value: event.target.value })
    );
  };

  return (
    <Container sx={{ my: 2 }}>
      <MessageBox
        title="Alimentation"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, esse? Perferendis porro maiores eaque ipsa sit, architecto voluptatibus saepe totam dicta harum, id, possimus asperiores eligendi laudantium odio quo. Omnis."
      />
      {foods.length > 0 && (
        <CustomTable
          array={foods}
          path="foodInputs"
          onDelete={deleteFood}
          formRef={formRef}
        />
      )}
      <Box
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          if (foodsStatus === 'pending') return;
          dispatch(fetchProducts());
        }}
        component="form"
      >
        {/* TEMPORARY */}
        {categoriesStatus === 'pending' && (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        )}
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
        {categoriesArray.length > 0 && <SearchFoodForm />}
      </Box>
      <FoodForm />
    </Container>
  );
}
