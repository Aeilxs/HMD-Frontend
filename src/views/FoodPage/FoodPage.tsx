import { Button, Container } from '@mui/material';
import { setInputValue } from '../../reducers/UI/uiSlice';
import { useAppDispatch } from '../../store/hooks';

export default function FoodPage(): JSX.Element {
  const dispatch = useAppDispatch();

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setInputValue({ path: 'foodInputs', name: event.target.name, value: event.target.value }));
  // };

  return (
    <Container sx={{ position: 'relative' }}>
      <Button>test</Button>
      toto
    </Container>
  );
}

// const aliments = [
//   'Fruits frais',
//   'Légumes frais',
//   'Viandes',
//   'Oeufs',
//   'Poissons',
//   'Produits laitiers',
//   'Féculents',
//   'Boissons',
//   'Sauces',
// ];
