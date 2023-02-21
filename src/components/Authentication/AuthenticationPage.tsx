import { Box, Button, Paper, Typography } from '@mui/material';
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleForm } from '../../features/UI/uiSlice';

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const isRegistered = useAppSelector((state) => state.ui.isRegistered);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <Paper
        elevation={5}
        sx={{
          width: '50%',
          backgroundColor: '#7bc1b7',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isRegistered ? (
          <Box sx={{ textAlign: 'center', padding: '1.5em' }}>
            <Typography
              variant="h1"
              sx={{ fontSize: '3em', mb: 5 }}
            >
              Nouveau membre ?
            </Typography>
            <Button
              sx={{ backgroundColor: '#f79829', '&:hover': { backgroundColor: '#dd7a08' } }}
              variant="contained"
              onClick={() => dispatch(toggleForm())}
            >
              Inscrivez vous
            </Button>
          </Box>
        ) : (
          <RegistrationForm />
        )}
      </Paper>
      <Paper
        elevation={5}
        sx={{
          width: '50%',
          backgroundColor: '#7bc1b7',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isRegistered ? (
          <LoginForm />
        ) : (
          <Box sx={{ textAlign: 'center', padding: '1.5em' }}>
            <Typography
              variant="h1"
              sx={{ fontSize: '3em', mb: 5 }}
            >
              Vous avez déjà un compte ?
            </Typography>
            <Button
              sx={{ backgroundColor: '#f79829', '&:hover': { backgroundColor: '#dd7a08' } }}
              variant="contained"
              onClick={() => dispatch(toggleForm())}
            >
              {' '}
              Connectez-vous
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AuthPage;
