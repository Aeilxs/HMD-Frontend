import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { selectQuantity, setQuantity } from '../../../reducers/dashboard/foodSlice';

import { TextField } from '@mui/material';

export default function QuantitySelector(): JSX.Element {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(selectQuantity);
  return (
    <TextField
      sx={{ my: 2 }}
      label="Quantité (en g)"
      type="number"
      value={quantity}
      onChange={(event) => dispatch(setQuantity(Number(event.target.value)))}
    />
  );
}
