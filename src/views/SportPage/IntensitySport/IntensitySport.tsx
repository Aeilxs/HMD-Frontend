import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectIntensity, setIntensity } from '../../../reducers/dashboard/sport/sportSlice';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Intensity = 'Faible' | 'Modérée' | 'Élevée';

export default function IntensitySport(): JSX.Element {
  const dispatch = useAppDispatch();
  const intensity = useAppSelector(selectIntensity);
  const intensityLevels = ['Faible', 'Modérée', 'Élevée'];
  return (
    <FormControl sx={{ my: 3 }}>
      <InputLabel>Intensité</InputLabel>
      <Select
        label="Intensité"
        value={intensity}
        onChange={(event) => dispatch(setIntensity(event.target.value as Intensity))}
      >
        {intensityLevels.map((intensity) => (
          <MenuItem
            key={intensity}
            value={intensity}
          >
            {intensity}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
