import { Box, Paper } from '@mui/material';
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import { useAppSelector } from '../../redux/hooks';
import AuthFormToggle from './AuthFormToggle';

function AuthPage() {
  const isRegistered = useAppSelector((state) => state.ui.isRegistered);
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs:'column', sm: 'column', md: 'row' }, height: '100%' }}>
      <Paper
        elevation={5}
        sx={{
          width: { xs:'100%', sm: '100%', md: '50%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isRegistered ? (
           <AuthFormToggle
           text=" Nouveau membre ?"
           buttonText="Inscrivez vous"
           />
        ) : (
          <RegistrationForm />
        )}
      </Paper>
      <Paper
        elevation={5}
        sx={{
          width: { xs:'100%', sm: '100%', md: '50%' },
          // backgroundColor: '#7bc1b7',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height:'100%'
        }}
      >
        {isRegistered ? (
          <LoginForm />
        ) : (
          <AuthFormToggle
          text="Vous avez déjà un compte ?"
          buttonText=" Connectez-vous"
          />
        )}
      </Paper>
    </Box>
  );
}

export default AuthPage;
