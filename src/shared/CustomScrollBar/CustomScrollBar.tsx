import { Container } from '@mui/material';
import { ReactNode } from 'react';

interface CustomScrollBarProps {
  children: ReactNode;
}

function CustomScrollBar({ children }: CustomScrollBarProps): JSX.Element {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '82vh',
        overflowY: 'scroll',
        '::-webkit-scrollbar': {
          width: '0.4em',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#BDBDBD',
          borderRadius: '20px',
        },
      }}
    >
      {children}
    </Container>
  );
}

export default CustomScrollBar;
