import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectDuration, setDuration } from '../../../reducers/dashboard/sportSlice';

import { TextField } from '@mui/material';

export default function DurationSport(): JSX.Element {
  const dispatch = useAppDispatch();
  const duration = useAppSelector(selectDuration);
  return (
    <TextField
      type="number"
      value={duration}
      onChange={(event) => dispatch(setDuration(Number(event.target.value)))}
      label="Durée de l'activité"
      variant="standard"
      sx={{ py: 3, mt: 3 }}
    />
  );
}
