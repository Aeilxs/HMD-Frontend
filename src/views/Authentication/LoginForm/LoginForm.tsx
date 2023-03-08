import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUser, setValue } from '../../../reducers/UI/uiSlice';
import { registerLoginUser } from '../../../reducers/user/userMiddleware';

import { Box, Button, FormControl, FormGroup, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface LoginFormProps {
  error: boolean;
}

function LoginForm({ error }: LoginFormProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(setValue({ name, value }));
  };

  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(registerLoginUser());
      }}
    >
      <FormControl
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: '3em', mb: 5, textAlign:'center' }}
        >
          Formulaire de connexion
        </Typography>
        <FormGroup>
          <TextField
            error={error}
            sx={{ py: 2 }}
            label="Email"
            name="email"
            placeholder="Entrez votre email"
            variant="standard"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <TextField
            error={error}
            sx={{ py: 2 }}
            label="Mot de passe"
            name="password"
            placeholder="Entrez votre mot de passe"
            variant="standard"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button
          sx={{
            backgroundColor: '#7bc1b7',
            '&:hover': { backgroundColor: '#6aa49c' },
          }}
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Envoyer
        </Button>
      </FormControl>
    </Box>
  );
}
export default LoginForm;
