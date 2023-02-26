import { Button, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import {
  selectHydrationDate,
  setDate,
  setQuantity,
  selectHydrationQuantity,
} from '../../reducers/dashboard/hydrationSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import MessageBox from '../../shared/MessageBox/MessageBox';

export default function HydrationPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectHydrationDate);
  const quantity = useAppSelector(selectHydrationQuantity);
  return (
    <Container sx={{ mt: 2 }}>
      <MessageBox
        title="Pourquoi s'hydrater ?"
        content="L'eau contenue dans le cerveau (85%) lui permet de mieux fonctionner. Un état de déshydratation peut de ce fait impacter les fonctions cognitives et l'humeur. Ces changements d'humeur se caractérisent par un état de fatigue, de colère, de tension, de perte de mémoire ou de dépression. Ainsi, pour avoir un cerveau fonctionnant correctement et être de bonne humeur, il faut boire beaucoup d'eau."
        width={100}
      />
      <Box
        component="form"
        sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
      >
        <CustomDatePicker
          value={date}
          actionCreator={setDate}
        />
        <TextField
          onChange={(event) => dispatch(setQuantity(Number(event.target.value)))}
          value={quantity}
          label="Quantité (litre(s))"
          type="number"
          variant="outlined"
          sx={{ mb: 1, mt: 1 }}
        />
        <Button
          sx={{ m: 'auto' }}
          variant="contained"
        >
          Valider
        </Button>
      </Box>
    </Container>
  );
}
