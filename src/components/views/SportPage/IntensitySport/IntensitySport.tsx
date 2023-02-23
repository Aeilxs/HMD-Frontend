import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
  } from '@mui/material';
  export default function IntensitySport(): JSX.Element {
    return (
          <FormControl sx={{ mt: 3 }}>
            <InputLabel>Intensité</InputLabel>
            <Select label="Intensité">
              <MenuItem value={10}>Faible</MenuItem>
              <MenuItem value={20}>Modérée</MenuItem>
              <MenuItem value={30}>Élevée</MenuItem>
            </Select>
          </FormControl>
    );
  }