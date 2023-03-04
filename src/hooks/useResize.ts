import { useState, useEffect } from 'react';

export const useResize = () => {
  const [vwValue, setVwValue] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setVwValue(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [vwValue]);
  return vwValue;
};
