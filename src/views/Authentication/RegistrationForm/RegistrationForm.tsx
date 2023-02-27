import {selectUser, setGender, setValue } from '../../../reducers/UI/uiSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import SendIcon from '@mui/icons-material/Send';
import {
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

function RegistrationForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (event.target.value === 'Femme' || event.target.value === 'Homme') {
      dispatch(setGender(event.target.value));
    }
    dispatch(setValue({ name, value }));
  };

  return (
    <Box component="form" onSubmit={(event) => {
      event.preventDefault();
    }}>
      <FormControl
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 3, sm: 3, md: 0 },
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: '3em', mb: 5 }}
        >
          Formulaire d'inscription
        </Typography>
        <FormGroup>
          <TextField
            sx={{ py: 2 }}
            label="Prenom"
            name="firstname"
            placeholder="Entrez votre prénom"
            variant="standard"
            type="text"
            value={user.firstname}
            onChange={handleChange}
          />
          <TextField
            sx={{ py: 2 }}
            label="Nom"
            name="lastname"
            placeholder="Entrez votre nom"
            variant="standard"
            type="text"
            value={user.lastname}
            onChange={handleChange}
          />
          <TextField
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
            sx={{ py: 2 }}
            label="Mot de passe"
            name="password"
            placeholder="Entrez un mot de passe"
            variant="standard"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <FormControl>
            <FormLabel sx={{ textAlign: 'start' }}>Genre</FormLabel>
            <RadioGroup
              row
              value={user.gender}
              onChange={handleChange}
              name="gender"
            >
              <FormControlLabel
                value="Femme"
                control={<Radio />}
                label="Femme"
              />
              <FormControlLabel
                value="Homme"
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
