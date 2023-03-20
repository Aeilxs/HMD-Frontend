import { Button, Container, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MessageBox from '../../shared/MessageBox/MessageBox';

export default function AdminPage(): JSX.Element {
  return (
    <Container>
      <MessageBox
        title="Administration"
        content="WIP"
      />
      <Button>update categories</Button>
    </Container>
  );
}
