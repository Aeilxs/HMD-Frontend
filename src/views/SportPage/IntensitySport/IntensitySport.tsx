import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface IntensitySportProps {
  handleChange: Function;
  value: string | number;
}

export default function IntensitySport({ handleChange, value }: IntensitySportProps): JSX.Element {
  const intensityLevels = ['Faible', 'Modérée', 'Élevée'];
  return (
    <FormControl sx={{ my: 3 }}>
      <InputLabel>Intensité</InputLabel>
      <Select
        label="Intensité"
        value={value}
        name="intensity"
        onChange={(event) => handleChange(event)}
      >
        {intensityLevels.map((intensity, i) => (
          <MenuItem
            key={intensity}
            value={++i}
          >
            {intensity}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
