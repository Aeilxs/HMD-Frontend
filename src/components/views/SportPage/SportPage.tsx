import {
  Box,
  Button,
  Container,
} from '@mui/material';
import MessageBox from '../../UI/MessageBox/MessageBox';
import DurationSport from './DurationSport/DurationSport';
import IntensitySport from './IntensitySport/IntensitySport';
import TypeSport from './TypeSport/TypeSport';

export default function SportPage(): JSX.Element {
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
        <Box sx={{ m: 'auto', mt:2 }}>
          <Button variant="contained">Envoyer</Button>
        </Box>
      </Box>
    </Container>
  );
}
