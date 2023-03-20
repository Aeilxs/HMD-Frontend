import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export default function NotFound(): JSX.Element {
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
          404 NOT FOUND
        </Typography>
        <Typography
          sx={{ m: 2 }}
          variant="body1"
        >
          Nous n'avons aucune ressource à cette adresse.
        </Typography>
        <Button
          onClick={() => navigate('/')}
          variant="contained"
        >
          Accueil
        </Button>
      </Paper>
    </Box>
  );
}
