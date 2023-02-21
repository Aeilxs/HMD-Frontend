import { useState } from 'react';
import { Box, Button } from "@mui/material";
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm';

const AuthPage = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <Box sx={{ width: '50%', backgroundColor: '#ffcccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {hasAccount ? (
          <Box>
            <h1>Nouveau membre ?</h1>
            <Button variant='contained' onClick={() => setHasAccount(!hasAccount)}>Inscrivez vous</Button>
          </Box>
        ) : (
          <RegistrationForm />
        )}
      </Box>
      <Box sx={{ width: '50%', backgroundColor: '#ffcccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {hasAccount ? (
          <LoginForm />
        ) : (
            <Box>
                <h1>Vous avez déjà un compte ?</h1>
                <Button variant='contained' onClick={() => setHasAccount(!hasAccount)}> Connectez-vous</Button>
            </Box>
        )}
      </Box>
    </Box>
  );
};

export default AuthPage;