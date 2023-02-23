import {
    TextField,
  } from '@mui/material';

  export default function DurationSport(): JSX.Element {
    return (
          <TextField
            type="number"
            label="Temps de l'activité"
            variant="standard"
            sx={{ py: 3, mt: 3 }}
          />
    );
  }