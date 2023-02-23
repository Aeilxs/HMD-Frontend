import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormLabel,
} from '@mui/material';
import MessageBox from '../../UI/MessageBox/MessageBox';

export default function SportPage(): JSX.Element {
  const activities = ['course', 'marche', 'natation', 'velo', 'exercices'];
  return (
    <Container>
      <MessageBox
        title="En savoir plus"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac mauris sit amet velit tristique pretium ut sed eros. Sed vel efficitur mauris. Sed euismod aliquam libero id convallis."
        width={100}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', mx: 'auto', my: 2 }}>
        <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormLabel component="legend">Activités</FormLabel>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {activities.map((activity) => (
              <FormControlLabel
                key={activity}
                control={<Checkbox />}
                label={activity}
                sx={{ p: 0.2 }}
              />
            ))}
          </Box>
        </FormGroup>
        <TextField
          type="number"
          label="Temps de l'activité"
          variant="standard"
          sx={{ py: 3, mt: 3 }}
        />
        <FormControl sx={{ mt: 3 }}>
          <InputLabel>Intensité</InputLabel>
          <Select label="Intensité">
            <MenuItem value={10}>Faible</MenuItem>
            <MenuItem value={20}>Modérée</MenuItem>
            <MenuItem value={30}>Élevée</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '2em' }}>
          <Button variant="contained">Envoyer</Button>
        </Box>
      </Box>
    </Container>
  );
}
