import { Alert, Button, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import {
  setQuality,
  setSelectedSleep,
  resetSleepInputs,
  selectSleepMessage,
} from '../../reducers/dashboard/sleep/sleepSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import MessageBox from '../../shared/MessageBox/MessageBox';
import { deleteSleep, editSleep, postSleep } from '../../reducers/dashboard/sleep/sleepMiddleware';
import { selectSleeps } from '../../reducers/user/userSlice';
import { selectIsEdit, selectSleepInputs, setInputValue } from '../../reducers/UI/uiSlice';
import CustomTable from '../../shared/CustomTable/CustomTable';
import { useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import SleepQualitySelect from './Select/SleepQualitySelect';

export default function SleepPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { duration, quality, date } = useAppSelector(selectSleepInputs);
  const isEdit = useAppSelector(selectIsEdit);
  const sleeps = useAppSelector(selectSleeps);
  const { message, severity } = useAppSelector(selectSleepMessage);
  const formRef = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue({ path: 'sleepInputs', name: event.target.name, value: event.target.value }));
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard')}
        sx={{ position: 'absolute' }}
      >
        dashboard
      </Button>
      <Typography
        variant="h1"
        sx={{ fontSize: '3em', textAlign: 'center', my: 5 }}
      >
        Sommeil
      </Typography>
      <MessageBox
        title="Saviez-vous que le sommeil..."
        content="Le sommeil joue un rôle crucial dans notre santé globale. Il permet à notre corps de se reposer, de récupérer et de se régénérer, ce qui est essentiel pour maintenir un bon équilibre émotionnel et mental. Des études ont montré que le manque de sommeil peut causer une diminution de la concentration, de l'irritabilité et de l'anxiété. Il est donc important de faire en sorte de dormir suffisamment chaque nuit pour maintenir une bonne santé physique et mentale. Des astuces pour améliorer la qualité de votre sommeil incluent de maintenir une routine de sommeil régulière, de créer un environnement de sommeil confortable et de limiter les stimulants tels que la caféine et l'alcool avant de se coucher."
      />
      {sleeps.length > 0 && (
        <CustomTable
          array={sleeps}
          onSelect={setSelectedSleep}
          onDelete={deleteSleep}
          resetInput={resetSleepInputs}
          formRef={formRef}
        />
      )}
      <Box
        sx={{ my: 2, display: 'flex', flexDirection: 'column' }}
        component="form"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          isEdit ? dispatch(editSleep()) : dispatch(postSleep());
        }}
      >
        {message && (
          <Alert
            sx={{ my: 1 }}
            severity={severity}
          >
            {message}
          </Alert>
        )}
        <TextField
          onChange={handleChange}
          name="duration"
          value={duration}
          label="Durée (minutes)"
          type="number"
          variant="outlined"
          sx={{ mb: 1, mt: 1 }}
        />
        <SleepQualitySelect
          quality={quality}
          onChange={handleChange}
        />
        <CustomDatePicker
          value={date}
          name="date"
          path="sleepInputs"
          actionCreator={setInputValue}
        />
        <Button
          sx={{ m: 'auto', my: 1 }}
          variant="contained"
          type="submit"
        >
          Envoyer
        </Button>
      </Box>
    </Container>
  );
}
