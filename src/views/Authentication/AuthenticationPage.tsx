import { useAppSelector } from '../../store/hooks';

import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import AuthFormToggle from './AuthFormToggle/AuthFormToggle';

import { Box, Paper } from '@mui/material';
import { selectAuthErrors } from '../../reducers/UI/uiSlice';
import { selectIsLogged, selectRoles } from '../../reducers/user/userSlice';
import { Navigate } from 'react-router-dom';

function AuthPage() {
  const isRegistered = useAppSelector((state) => state.ui.isRegistered);
  const errors = useAppSelector(selectAuthErrors);
  const { login: loginError, registration: registrationError } = errors;
  const isLogged = useAppSelector(selectIsLogged);
  const isAdmin = useAppSelector(selectRoles).includes('ROLE_ADMIN');
  return (
    <>
      {isLogged && <Navigate to={isAdmin ? '/admin' : '/dashboard'} />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: ['column', 'row'],
          height: '100%',
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: { xs: '100%', sm: '100%', md: '50%' },
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
            <RegistrationForm error={registrationError} />
          )}
        </Paper>
        <Paper
          elevation={5}
          sx={{
            width: { xs: '100%', sm: '100%', md: '50%' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {isRegistered ? (
            <LoginForm error={loginError} />
          ) : (
            <AuthFormToggle
              text="Vous avez déjà un compte ?"
              buttonText=" Connectez-vous"
            />
          )}
        </Paper>
      </Box>
    </>
  );
}

export default AuthPage;
