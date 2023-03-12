import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { selectFirstName } from '../../../reducers/user/userSlice';
import { useAppSelector } from '../../../store/hooks';

function WelcomeMessage() {
  const firstname = useAppSelector(selectFirstName);
  return (
    <Box sx={{ m: 4, textAlign: 'center', width: '100%', gridColumn: '1 /2 span', mt: '3em' }}>
      <Typography
        variant="h2"
        fontSize="3em"
        fontWeight="bold"
        gutterBottom
        sx={{ color: 'primary.main' }}
      >
        Bienvenue sur votre tableau de bord {firstname} !
      </Typography>
      <Typography
        variant="body1"
        fontSize="1.5em"
        sx={{ mt: 2, maxWidth: '60ch', mx: 'auto' }}
      >
        Nous vous invitons à renseigner vos premières données de santé pour pouvoir suivre votre
        évolution.
      </Typography>
    </Box>
  );
}

export default WelcomeMessage;
