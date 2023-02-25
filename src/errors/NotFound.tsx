import * as React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export default function NotFound(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Paper sx={{ p: 2 }}>
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
          Nous n'avons aucune ressource à cette adresse
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
