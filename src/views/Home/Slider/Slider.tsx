import { Box, Button } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Container } from '@mui/system';

interface Image {
  name: string;
  alt: string;
}

type SliderProps = {
  images: Image[];
};

function Slider({ images }: SliderProps) {
  const [currentImage, setCurrentImage] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [currentImage, images]);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center' }}>
          <Button
            variant="text"
            onClick={() => setCurrentImage((currentImage + 1) % images.length)}
          >
            <ArrowBackIosNew />
          </Button>
          <Box sx={{ height: ['200px', '400px', '450px', '500px'] }}>
            <Box
              component="img"
              src={images[currentImage].name}
              alt={images[currentImage].alt}
              sx={{ width: '100%', height: '100%' }}
              className="active"
            />
          </Box>
          <Button
            variant="text"
            onClick={() => setCurrentImage((currentImage - 1 + images.length) % images.length)}
          >
            <ArrowForwardIos />
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default Slider;
