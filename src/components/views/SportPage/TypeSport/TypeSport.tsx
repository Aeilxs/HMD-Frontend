import {
    Box,
    FormControlLabel,
    FormGroup,
    Checkbox,
    FormLabel,
  } from '@mui/material';


  export default function TypeSport(): JSX.Element {
    const activities = ['course', 'marche', 'natation', 'velo', 'exercices'];
    return (
          <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel component="legend">Activités</FormLabel>
            <Box sx={{ display: 'flex', flexDirection: ['column', 'row'] }}>
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
    );
  }