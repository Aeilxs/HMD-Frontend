import { Box } from "@mui/material";
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm';

const AuthPage = () => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <LoginForm />
      <RegistrationForm />
    </Box>
  );
};

export default AuthPage;