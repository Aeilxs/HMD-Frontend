import MessageBox from '../../shared/MessageBox/MessageBox';

import { Box } from '@mui/system';
import { Button, Container, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 2, position: 'relative' }}>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard')}
        sx={{ position: 'absolute' }}
      >
        dashboard
      </Button>

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
        sx={{ my: 2, display: 'flex', flexDirection: 'column' }}
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {/* {message.message && <Alert severity={message.severity}>{message.message}</Alert>}
        <CustomDatePicker
          label="Date de naissance"
          value={dateOfBirth}
          actionCreator={setDateOfBirth}
        /> */}
        <TextField
          // onChange={(event) => dispatch(setWeight(Number(event.target.value)))}
          // value={weight}
          label="Poids (kg)"
          type="number"
          variant="outlined"
          sx={{ mb: 1, mt: 1 }}
        />
        <TextField
          // onChange={(event) => dispatch(setHeight(Number(event.target.value)))}
          // value={height}
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
