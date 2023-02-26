import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
  selectDateOfBirth,
  selectHeight,
  selectWeight,
  setDateOfBirth,
  setHeight,
  setWeight,
} from '../../reducers/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import MessageBox from '../../shared/MessageBox/MessageBox';

export default function ProfilePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const dateOfBirth = useAppSelector(selectDateOfBirth);
  const weight = useAppSelector(selectWeight);
  const height = useAppSelector(selectHeight);
  return (
    <Container sx={{ mt: 2 }}>
      <MessageBox
        title="Pourquoi avons nous besoin de ces informations ?"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        width={100}
      />
      <Typography
        sx={{ mt: 2, mb: 2 }}
        variant="h3"
        align="center"
      >
        A propos de vous
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column' }}
        component="form"
      >
        <CustomDatePicker
          value={dateOfBirth}
          actionCreator={setDateOfBirth}
        />
        <TextField
          onChange={(event) => dispatch(setWeight(Number(event.target.value)))}
          value={weight}
          label="Poids (kg)"
          type="number"
          variant="outlined"
          sx={{ mb: 1, mt: 1 }}
        />
        <TextField
          onChange={(event) => dispatch(setHeight(Number(event.target.value)))}
          value={height}
          label="Taille (cm)"
          type="number"
          variant="outlined"
          sx={{ mb: 1 }}
        />
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
