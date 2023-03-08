import { useNavigate } from 'react-router-dom';
import { Fingerprint, PersonAdd } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import Slider from './Slider/Slider';
import img1 from '../../assets/salad.png';
import img2 from '../../assets/sleep.png';
import img3 from '../../assets/no-smoking.png';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleForm } from '../../reducers/UI/uiSlice';
import { selectIsLogged } from '../../reducers/user/userSlice';

function Home() {
  const images = [
    {
      name: img1,
      alt: 'img1',
    },
    {
      name: img2,
      alt: 'img2',
    },
    {
      name: img3,
      alt: 'img3',
    },
  ];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(selectIsLogged);

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{ fontSize: '3em', fontWeight: 'bold' }}
          variant="h1"
          gutterBottom
        >
          Health Monitoring Dashboard
        </Typography>
        <Typography
          sx={{ mb: 4 }}
          variant="subtitle1"
          gutterBottom
        >
          La santé à portée de main : notre dashboard vous accompagne au quotidien. Alors n'hésitez plus, prenez le
          contrôle de votre santé et améliorez votre bien-être.
        </Typography>
      </Box>
      <Slider images={images} />

      <Box sx={{ display: 'flex', justifyContent: 'center', m: 5 }}>
        {!isLogged ? (
          <>
            <Button
              sx={{ mx: 1 }}
              variant="contained"
              onClick={() => {
                dispatch(toggleForm(false));
                navigate('/authentification');
              }}
            >
              <PersonAdd />
              Sign up
            </Button>
            <Button
              sx={{ mx: 1 }}
              variant="contained"
              onClick={() => {
                dispatch(toggleForm(true));
                navigate('/authentification');
              }}
            >
              <Fingerprint />
              Login
            </Button>
          </>
        ) : (
          <Button
            sx={{ mx: 1 }}
            variant="contained"
            onClick={() => {
              navigate('/dashboard');
            }}
          >
            Accéder au dashboard
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Home;
