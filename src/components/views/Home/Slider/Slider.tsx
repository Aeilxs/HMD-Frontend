import { Box, Button } from '@mui/material';
import {ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { useEffect, useState } from 'react';

interface Image {
  name: string;
  alt: string;
}

type SliderProps = {
  images: Image[];
};

function Slider ({ images }: SliderProps) {
  const [currentImage, setCurrentImage] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [currentImage, images]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <Button
        variant="text"
        sx={{ position: 'absolute', top: '50%', left: '0', borderRadius: 0 }}
        onClick={() => setCurrentImage((currentImage + 1) % images.length)}
      >
        <ArrowBackIosNew />
      </Button>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <img
          src={images[currentImage].name}
           alt={images[currentImage].alt}
          style={{ height: '400px' }}
          className="active"
        />
      </Box>
      <Button
        variant="text"
        sx={{ position: 'absolute', top: '50%', right: '0', borderRadius: 0 }}
        onClick={() => setCurrentImage((currentImage - 1 + images.length) % images.length)}
      >
        <ArrowForwardIos />
      </Button>
    </Box>
  );
};
export default Slider;
