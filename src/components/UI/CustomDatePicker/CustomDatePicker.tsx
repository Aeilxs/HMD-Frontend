import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import 'dayjs/locale/fr';

interface CustomDatePickerProps {
  value: null | string;
  actionCreator: Function;
}

export default function CustomDatePicker({
  value,
  actionCreator,
}: CustomDatePickerProps): JSX.Element {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="fr"
    >
      <DatePicker
        label="Date"
        value={value}
        onChange={(event) => {
          actionCreator(event);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
