import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useAppDispatch } from '../../store/hooks';
import 'dayjs/locale/fr';

interface CustomDatePickerProps {
  label?: string;
  value: null | string;
  actionCreator: Function;
}

export default function CustomDatePicker({ label, value, actionCreator }: CustomDatePickerProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="fr"
    >
      <DatePicker
        label={label ?? 'Date'}
        value={value}
        onChange={(event) => dispatch(actionCreator(event?.toString()))}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
