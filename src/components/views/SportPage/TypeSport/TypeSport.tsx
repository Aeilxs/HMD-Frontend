import { selectType, setType } from '../../../../features/dashboard/sportSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

import {
  FormControlLabel,
  FormLabel,
  RadioGroup,
  FormControl,
  Radio,
} from '@mui/material';

type Activity = 'course' | 'marche' | 'natation' | 'velo' | 'exercices';

export default function TypeSport(): JSX.Element {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectType);
  const activities = ['course', 'marche', 'natation', 'velo', 'exercices'];
  return (
    <FormControl>
      <FormLabel id="radio-group">Type de l'activité</FormLabel>
      <RadioGroup
        row
        aria-labelledby="radio-group"
        name="row-radio-group"
        value={type}
        onChange={(event) => dispatch(setType(event.target.value as Activity))}
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
