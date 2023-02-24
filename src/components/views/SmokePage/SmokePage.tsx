import { Box, Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import MessageBox from '../../UI/MessageBox/MessageBox';
import 'dayjs/locale/fr';
import CustomDatePicker from '../../UI/CustomDatePicker/CustomDatePicker';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  selectSmokeDate,
  selectSmokeQuantity,
  setSmokeDate,
  setSmokeQuantity,
} from '../../../features/dashboard/smokeSlice';

export default function SmokePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const smokeInputAmount = useAppSelector(selectSmokeQuantity);
  const smokeDate = useAppSelector(selectSmokeDate);
  return (
    <Container sx={{ mt: 2 }}>
      <MessageBox
        title="Saviez vous que le tabagisme..."
        content="c'est tabou et qu'on en viendra tous à bout"
        width={100}
      />
      <Box
        component="form"
        sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
      >
        <CustomDatePicker
          value={smokeDate}
          actionCreator={setSmokeDate}
        />
        <TextField
          onChange={(event) => dispatch(setSmokeQuantity(Number(event.target.value)))}
          value={smokeInputAmount}
          label="Quantité de cigarettes"
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
