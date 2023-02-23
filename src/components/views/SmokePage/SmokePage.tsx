import { FormControl } from '@mui/material';
import { Container } from '@mui/system';
import MessageBox from '../../UI/MessageBox/MessageBox';

export default function SmokePage(): JSX.Element {
  return (
    <Container sx={{ mt: 2 }}>
      <MessageBox
        title="Saviez vous que le tabagisme..."
        content="c'est tabou et qu'on en viendra tous à bout"
        width={100}
      />
      <FormControl></FormControl>
    </Container>
  );
}
