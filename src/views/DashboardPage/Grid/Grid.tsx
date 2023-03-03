import { Container } from '@mui/system';
import { useRender } from '../../../hooks/useRender';

interface GridProps {
  children: JSX.Element[];
}

export default function Grid({ children }: GridProps): JSX.Element {
  const vwValue = useRender();
  return (
    <Container
      key={vwValue}
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
