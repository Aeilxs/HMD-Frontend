import { FormControlLabel, FormLabel, RadioGroup, FormControl, Radio } from '@mui/material';

interface TypeSportProps {
  handleChange: Function;
  type: 'footing' | 'marche' | 'natation' | 'velo' | 'autre' | '';
}

export default function TypeSport({ handleChange, type }: TypeSportProps): JSX.Element {
  const activities = ['course', 'marche', 'natation', 'velo', 'autre'];
  return (
    <FormControl>
      <FormLabel id="radio-group">Type de l'activité</FormLabel>
      <RadioGroup
        row
        name="type"
        value={type}
        onChange={(event) => handleChange(event)}
      >
        {activities.map((activity) => (
          <FormControlLabel
            key={activity}
            value={activity}
            control={<Radio />}
            label={activity}
            sx={{ p: 0.5 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
