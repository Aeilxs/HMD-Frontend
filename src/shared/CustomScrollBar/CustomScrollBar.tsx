import { Container } from '@mui/material';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useResize } from '../../hooks/useResize';

interface CustomScrollBarProps {
  children: ReactNode;
}

function CustomScrollBar({ children }: CustomScrollBarProps): JSX.Element {
  const vwValue = useResize();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setHasOverflow(container.scrollHeight > container.clientHeight);

      const observer = new MutationObserver(() => {
        setHasOverflow(container.scrollHeight > container.clientHeight);
      });
      // observe mutations
      observer.observe(container, { childList: true, subtree: true });
      // stop the observe when component unmount
      return () => observer.disconnect();
    }
  }, [vwValue, children]);

  const scrollbar = {
    height: '82vh',
    overflowY: 'scroll',
    '::-webkit-scrollbar': {
      width: '0.7em',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: '#9E9E9E',
      borderRadius: '20px',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: '#BDBDBD',
    },
  };

  const noscroll = {
    height: '82vh',
    overflowY: 'hidden',
  };

  return (
    <Container
      key={vwValue}
      disableGutters
      maxWidth={false}
      ref={containerRef}
      sx={hasOverflow ? scrollbar : noscroll}
    >
      {children}
    </Container>
  );
}

export default CustomScrollBar;
