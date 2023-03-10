import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectDateOfBirth,
  setDateOfBirth,
  selectHeight,
  selectWeight,
  setHeight,
  setWeight,
} from '../../reducers/dashboard/profil/profilSlice';

import MessageBox from '../../shared/MessageBox/MessageBox';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';

import { Box } from '@mui/system';
import { Alert, AlertTitle, Button, Container, TextField, Typography } from '@mui/material';
import { editProfil, postProfil } from '../../reducers/dashboard/profil/profilMiddleware';
import { selectProperties } from '../../reducers/user/userSlice';

export default function ProfilePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const dateOfBirth = useAppSelector(selectDateOfBirth);
  const weight = useAppSelector(selectWeight);
  const height = useAppSelector(selectHeight);
  const properties = useAppSelector(selectProperties);

  return (
    <Container sx={{ mt: 2 }}>
      {properties.length === 0 && (
        <Alert
          severity="info"
          sx={{ mb: 2 }}
        >
          <AlertTitle>Informations manquantes</AlertTitle>
          Veuillez compléter vos informations pour accéder à la page alimentation.
        </Alert>
      )}

      <Typography
        sx={{ mt: 2, mb: 2 }}
        variant="h3"
        align="center"
      >
        A propos de vous
      </Typography>
      <MessageBox
        title="Pourquoi avons-nous besoin de ces informations ?"
        content="Afin de fournir des données précises et personnalisées pour votre santé, nous avons besoin de certaines informations de base, telles que votre âge, votre taille et votre date de naissance. Ces informations sont utilisées pour effectuer des calculs et des analyses qui nous permettent de surveiller votre santé de manière efficace. Nous prenons la protection de vos données personnelles très au sérieux et nous utilisons ces informations uniquement à des fins de santé et de bien-être."
      />
      <Box
        sx={{ display: 'flex', flexDirection: 'column' }}
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          properties.length > 0 ? dispatch(editProfil(properties[0].id)) : dispatch(postProfil());
        }}
      >
        <CustomDatePicker
          label="Date de naissance"
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
          type="submit"
        >
          Envoyer
        </Button>
      </Box>
    </Container>
  );
}
