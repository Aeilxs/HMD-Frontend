import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectEmail, selectPassword, setValue } from '../../../reducers/UI/uiSlice';

import { Box, Button, FormControl, FormGroup, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function LoginForm() {
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectEmail);
  const password = useAppSelector(selectPassword);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(setValue({ name, value }));
  };

  return (
    <Box component="form" onSubmit={(event) => {
      event.preventDefault();
      console.log(email, password);
    } }>
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
          sx={{ fontSize: '3em', mb: 5 }}
        >
          Formulaire de connexion
        </Typography>
        <FormGroup>
          <TextField
            sx={{ py: 2 }}
            label="Email"
            name="email"
            placeholder="Entrez votre email"
            variant="standard"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <TextField
            sx={{ py: 2 }}
            label="Mot de passe"
            name="password"
            placeholder="Entrez votre mot de passe"
            variant="standard"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button
          sx={{ backgroundColor: '#7bc1b7', '&:hover': { backgroundColor: '#6aa49c' } }}
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
