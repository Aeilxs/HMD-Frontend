import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface SelectSleepQualityProps {
  quality: number | '';
  onChange: Function;
}

export default function SleepQualitySelect({ quality, onChange: handleChange }: SelectSleepQualityProps): JSX.Element {
  const qualityLevels = ['Mauvaise', 'Normale', 'Bonne'];
  return (
    <FormControl sx={{ my: 3 }}>
      <InputLabel>Qualité</InputLabel>
      <Select
        label="Qualité"
        value={quality}
        name="quality"
        onChange={(event) => handleChange(event)}
      >
        {qualityLevels.map((quality, i) => (
          <MenuItem
            key={quality}
            value={++i}
          >
            {quality}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
