import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import {
  selectSleepDate,
  selectSleepQuality,
  selectSleepQuantity,
  setQuantity,
  setDate,
  setQuality,
} from '../../reducers/dashboard/sleepSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import MessageBox from '../../shared/MessageBox/MessageBox';

export default function SleepPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const sleepQuality = useAppSelector(selectSleepQuality);
  const sleepQuantity = useAppSelector(selectSleepQuantity);
  const sleepDate = useAppSelector(selectSleepDate);

  return (
    <Container sx={{ mt: 2 }}>
      <MessageBox
        title="Les bienfaits du sommeil"
        content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quasi natus eligendi delectus iste deserunt cumque totam ut eius nemo dolor obcaecati esse, corrupti eaque, architecto praesentium minus autem magnam!"
        width={100}
      />
      <Box
        sx={{ my: 2, display: 'flex', flexDirection: 'column' }}
        component="form"
      >
        <TextField
          onChange={(event) => dispatch(setQuantity(Number(event.target.value)))}
          value={sleepQuantity}
          label="Durée (heure)"
          type="number"
          variant="outlined"
          sx={{ mb: 1, mt: 1 }}
        />
        <CustomDatePicker
          value={sleepDate}
          actionCreator={setDate}
        />

        <InputLabel sx={{ my: 1, textAlign: 'center' }}>Qualité du sommeil</InputLabel>
        <Select
          value={sleepQuality}
          onChange={(event) => dispatch(setQuality(Number(event.target.value)))}
          sx={{ width: 'fit-content', m: 'auto', mx: 'auto', my: 1 }}
        >
          <MenuItem value={1}>&#128532;</MenuItem>
          <MenuItem value={2}>&#128528;</MenuItem>
          <MenuItem value={3}>&#128512;</MenuItem>
        </Select>
        <Button
          sx={{ m: 'auto' }}
          variant="contained"
        >
          Envoyer
        </Button>
      </Box>
    </Container>
  );
}
