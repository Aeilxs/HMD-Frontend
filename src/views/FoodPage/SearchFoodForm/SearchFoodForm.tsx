import { Button, LinearProgress, TextField } from '@mui/material';
import { fetchCategories } from '../../../reducers/dashboard/food/foodMiddleware';
import { selectOFFCategories, selectOFFFoods } from '../../../reducers/dashboard/food/foodSlice';
import { selectFoodInputs, setInputValue } from '../../../reducers/UI/uiSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import FoodGrid from '../FoodGrid/FoodGrid';

export default function SearchFoodForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector(selectFoodInputs);
  const { foodsArray, foodsStatus } = useAppSelector(selectOFFFoods);
  const { categoriesStatus } = useAppSelector(selectOFFCategories);

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
    <>
      <TextField
        name="search"
        fullWidth
        value={search}
        onChange={handleChange}
        label="Recherchez un aliment"
      />
      {foodsStatus === 'pending' ? (
        <LinearProgress sx={{ my: 2, p: 1, borderRadius: '20px' }} />
      ) : (
        <FoodGrid array={foodsArray} />
      )}
      <Button
        sx={{ my: 2, display: 'block', mx: 'auto' }}
        type="submit"
        disabled={foodsStatus === 'pending' ? true : false}
        variant="contained"
      >
        recherchez
      </Button>
    </>
  );
}
