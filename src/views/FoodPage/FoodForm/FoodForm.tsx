import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { selectFoodInputs, setInputValue } from '../../../reducers/UI/uiSlice';
import CustomDatePicker from '../../../shared/CustomDatePicker/CustomDatePicker';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export default function FoodForm(): JSX.Element {
  const { kcal_100g, name, quantity, date } = useAppSelector(selectFoodInputs);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue({ path: 'foodInputs', name: event.target.name, value: event.target.value }));
  };
  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <TextField
        sx={{ my: 2 }}
        value={name}
        label="Aliment - Repas"
      />
      <TextField
        sx={{ mb: 2 }}
        value={quantity}
        name="quantity"
        type="number"
        onChange={handleChange}
        label="Quantité (grammes)"
      />
      <TextField
        sx={{ mb: 2 }}
        type="number"
        name="kcal_100g"
        value={kcal_100g}
        onChange={handleChange}
        label="Calories /100g"
      />
      <CustomDatePicker
        path="foodInputs"
        value={date}
        name="date"
        actionCreator={setInputValue}
      />

      <Button
        sx={{ mt: 2, mx: 'auto' }}
        type="submit"
        variant="contained"
      >
        Ajouter
      </Button>
    </Box>
  );
}
