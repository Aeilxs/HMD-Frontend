import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export default function AccessDenied(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}
    >
      <Paper sx={{ p: 5, m: 'auto' }}>
        <Typography
          sx={{ fontWeight: 'bold' }}
          variant="h2"
        >
          403 ACCES DENIED
        </Typography>
        <Typography
          sx={{ m: 2 }}
          variant="body1"
        >
          Vous n'avez pas la permission d'accéder à cette page. Veuillez vous connecter au préalable.
        </Typography>
        <Button
          sx={{ mr: 1 }}
          onClick={() => navigate('/')}
          variant="contained"
        >
          Accueil
        </Button>
        <Button
          onClick={() => navigate('/authentification')}
          variant="contained"
        >
          Connexion
        </Button>
      </Paper>
    </Box>
  );
}
