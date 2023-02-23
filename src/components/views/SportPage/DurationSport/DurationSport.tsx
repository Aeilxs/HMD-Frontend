import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectDuration, setDuration } from '../../../../features/dashboard/sportSlice';

import { TextField } from '@mui/material';

export default function DurationSport(): JSX.Element {
  const dispatch = useAppDispatch();
  const duration = useAppSelector(selectDuration);
  return (
    <TextField
      type="number"
      value={duration}
      onChange={(event) => dispatch(setDuration(Number(event.target.value)))}
      label="Temps de l'activité"
      variant="standard"
      sx={{ py: 3, mt: 3 }}
    />
  );
}
