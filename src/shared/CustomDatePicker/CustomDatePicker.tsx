import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useAppDispatch } from '../../store/hooks';
import 'dayjs/locale/fr';
import { PropertyPath } from '../../Interfaces/inputs';

interface CustomDatePickerProps {
  label?: string;
  path: PropertyPath;
  value: null | string;
  name: string;
  actionCreator: Function;
}

export default function CustomDatePicker({
  label,
  path,
  value,
  actionCreator,
  name,
}: CustomDatePickerProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="fr"
    >
      <DatePicker
        label={label ?? 'Date'}
        value={value}
        onChange={(event) => {
          const selectedDate = event ? new Date(event) : null;
          if (selectedDate) {
            selectedDate.setDate(selectedDate.getDate() + 1);
            dispatch(
              actionCreator({
                path: path,
                name: name,
                value: selectedDate.toISOString().split('T')[0],
              })
            );
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
