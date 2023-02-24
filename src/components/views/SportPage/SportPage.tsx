import MessageBox from '../../UI/MessageBox/MessageBox';
import DurationSport from './DurationSport/DurationSport';
import IntensitySport from './IntensitySport/IntensitySport';
import TypeSport from './TypeSport/TypeSport';

import { Box, Button, Container } from '@mui/material';
import { useAppSelector } from '../../../redux/hooks';
import { selectDate, setDate } from '../../../features/dashboard/sportSlice';
import CustomDatePicker from '../../UI/CustomDatePicker/CustomDatePicker';

export default function SportPage(): JSX.Element {
 const date = useAppSelector(selectDate)
  return (
    <Container>
      <MessageBox
        title="En savoir plus"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac mauris sit amet velit tristique pretium ut sed eros. Sed vel efficitur mauris. Sed euismod aliquam libero id convallis."
        width={100}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', mx: 'auto', my: 2 }}>
        <TypeSport />
        <DurationSport />
        <IntensitySport />
        <CustomDatePicker
              value={date}
              actionCreator={setDate}
            />

        <Box sx={{ m: 'auto', mt: 2 }}>
          <Button variant="contained">Envoyer</Button>
        </Box>
      </Box>
    </Container>
  );
}
