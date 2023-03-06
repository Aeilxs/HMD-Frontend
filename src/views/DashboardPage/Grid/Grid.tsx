import { Container } from '@mui/system';
import { useResize } from '../../../hooks/useResize';
import { ReactNode } from 'react';
interface GridProps {
  children: ReactNode;
}

export default function Grid({ children }: GridProps): JSX.Element {
  const vwValue = useResize();
  return (
    <Container
      key={vwValue}
      sx={{
        my: 2,
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
