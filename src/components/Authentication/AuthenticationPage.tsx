import { Box, Container, Paper } from '@mui/material';
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import { useAppSelector } from '../../redux/hooks';
import AuthToggleMessage from './AuthToggleMessage';

function AuthPage() {
  const isRegistered = useAppSelector((state) => state.ui.isRegistered);
  return (
    <Container sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
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
           <AuthToggleMessage text="Nouveau membre ?" buttonText="Inscrivez-vous"/>
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
         <AuthToggleMessage text="Vous avez déjà un compte ?" buttonText="Connectez-vous"/>
        )}
      </Paper>
    </Container>
  );
}

export default AuthPage;
