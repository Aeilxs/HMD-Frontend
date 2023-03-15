import { selectAuthenticationInputs, setValue } from '../../../reducers/UI/uiSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import SendIcon from '@mui/icons-material/Send';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { registerUser } from '../../../reducers/user/userMiddleware';

interface RegistrationFormProps {
  error: string;
}

function RegistrationForm({ error }: RegistrationFormProps) {
  const dispatch = useAppDispatch();
  const inputValue = useAppSelector(selectAuthenticationInputs);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue({ path: 'authenticationInputs', name: event.target.name, value: event.target.value }));
  };

  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(registerUser());
      }}
    >
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 3, sm: 3, md: 0 },
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: '3em', mb: 5, textAlign: 'center' }}
        >
          Formulaire d'inscription
        </Typography>
        <FormGroup>
          {error && (
            <Alert
              sx={{ my: 1 }}
              severity="error"
            >
              {error}
            </Alert>
          )}
          <TextField
            error={error ? true : false}
            sx={{ py: 2 }}
            label="Prenom"
            name="firstname"
            placeholder="Entrez votre prénom"
            variant="standard"
            type="text"
            value={inputValue.firstname}
            onChange={handleChange}
          />
          <TextField
            error={error ? true : false}
            sx={{ py: 2 }}
            label="Nom"
            name="lastname"
            placeholder="Entrez votre nom"
            variant="standard"
            type="text"
            value={inputValue.lastname}
            onChange={handleChange}
          />
          <TextField
            error={error ? true : false}
            sx={{ py: 2 }}
            label="Email"
            name="email"
            placeholder="Entrez votre email"
            variant="standard"
            type="email"
            value={inputValue.email}
            onChange={handleChange}
          />
          <TextField
            error={error ? true : false}
            sx={{ py: 2 }}
            label="Mot de passe"
            name="password"
            placeholder="Entrez un mot de passe"
            variant="standard"
            type="password"
            value={inputValue.password}
            onChange={handleChange}
          />
          <FormControl>
            <FormLabel sx={{ textAlign: 'start' }}>Genre</FormLabel>
            <RadioGroup
              row
              value={inputValue.gender}
              onChange={handleChange}
              name="gender"
            >
              <FormControlLabel
                value="femme"
                control={<Radio />}
                label="Femme"
              />
              <FormControlLabel
                value="homme"
                control={<Radio />}
                label="Homme"
              />
            </RadioGroup>
          </FormControl>
        </FormGroup>
        <Button
          sx={{ backgroundColor: '#7bc1b7', mt: 3, '&:hover': { backgroundColor: '#6aa49c' } }}
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
export default RegistrationForm;
