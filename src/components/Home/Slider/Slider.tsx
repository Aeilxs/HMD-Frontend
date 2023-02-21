import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import './slider.scss';

type SliderProps = {
  images: string[];
};

const Slider = ({ images }: SliderProps) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const handleNextSlide = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };
  const handlePreviousSlide = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

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
        onClick={handlePreviousSlide}
      >
        <ArrowBackIosIcon />
      </Button>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <img
          src={images[currentImage]}
          style={{ height: '400px' }}
          className="active"
        />
      </Box>
      <Button
        variant="text"
        sx={{ position: 'absolute', top: '50%', right: '0', borderRadius: 0 }}
        onClick={handleNextSlide}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};
export default Slider;
