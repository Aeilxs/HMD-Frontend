import { Container } from '@mui/system';

interface GridProps {
  children: JSX.Element[];
}

export default function Grid({ children }: GridProps): JSX.Element {
  return (
    <Container
      sx={{
        mt: 2,
        display: ['flex', 'flex', 'grid'],
        flexDirection: 'column',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
      }}
    >
      {children}
    </Container>
  );
}
