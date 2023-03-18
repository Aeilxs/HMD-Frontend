import { Box } from '@mui/system';
import { Button, Container, TextField } from '@mui/material';
import { selectFoodInputs, setInputValue } from '../../reducers/UI/uiSlice';
import MessageBox from '../../shared/MessageBox/MessageBox';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../reducers/dashboard/food/foodMiddleware';

export default function FoodPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector(selectFoodInputs);

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
        sx={{ display: 'flex' }}
        onSubmit={(event) => {
          console.log('SUBMIT: ', search);
          event.preventDefault();
          dispatch(fetchProducts());
        }}
        component="form"
      >
        <TextField
          name="search"
          value={search}
          onChange={handleChange}
          label="Recherchez un aliment"
        />
        <Button type="submit">submit</Button>
      </Box>
    </Container>
  );
}
