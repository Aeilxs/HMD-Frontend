import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { selectDateOfBirth, setDateOfBirth } from '../../../features/user/userSlice';
import { useAppSelector } from '../../../redux/hooks';
import CustomDatePicker from '../../UI/CustomDatePicker/CustomDatePicker';
import MessageBox from '../../UI/MessageBox/MessageBox';

export default function ProfilePage(): JSX.Element {
  const dateOfBirth = useAppSelector(selectDateOfBirth);
  return (
    <Container>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{ mb: 2 }}
          variant="h3"
        >
          A propos de vous
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: ['column', 'row'] }}>
          <Box
            component="form"
            sx={{ width: '50%', display: 'flex', flexDirection: 'column', mb: 2, mr: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Taille (cm)"
              type="number"
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <TextField
              id="outlined-basic"
              label="Poids (kg)"
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <CustomDatePicker
              value={dateOfBirth}
              actionCreator={setDateOfBirth}
            />
            <Box sx={{ m: 'auto', mt: 2 }}>
              <Button variant="contained">Envoyer</Button>
            </Box>
          </Box>
          <Box sx={{ width: '50%' }}>
            <MessageBox
              title="Pourquoi avons nous besoin de ces informations ?"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              width={100}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
