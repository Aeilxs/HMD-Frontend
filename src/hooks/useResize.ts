import { useState, useEffect } from 'react';

export const useResize = () => {
  const [vwValue, setVwValue] = useState(window.innerWidth);
  const [vhValue, setVhValue] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setVwValue(window.innerWidth);
      setVhValue(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [vwValue, vhValue]);
  return { vw: vwValue, vh: vhValue };
};
