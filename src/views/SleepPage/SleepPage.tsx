import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import {
  selectSleepDate,
  selectSleepQuality,
  selectSleepQuantity,
  setQuantity,
  setDate,
  setQuality,
  dataSleepApi,
  setSelectedSleep,
  resetInputs,
} from '../../reducers/dashboard/sleep/sleepSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import MessageBox from '../../shared/MessageBox/MessageBox';
import { deleteSleep, editSleep, postSleep } from '../../reducers/dashboard/sleep/sleepMiddleware';
import { selectSleeps } from '../../reducers/user/userSlice';
import { selectIsEdit } from '../../reducers/UI/uiSlice';
import CustomTable from '../../shared/CustomTable/CustomTable';
import { useRef } from 'react';

export default function SleepPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const sleepQuality = useAppSelector(selectSleepQuality);
  const sleepQuantity = useAppSelector(selectSleepQuantity);
  const sleepDate = useAppSelector(selectSleepDate);
  const isEdit = useAppSelector(selectIsEdit);
  const sleeps = useAppSelector(selectSleeps);
  const formRef = useRef(null);

  return (
    <Container sx={{ mt: 2 }}>
      <MessageBox
       title="Saviez-vous que le sommeil..."
       content="Le sommeil joue un rôle crucial dans notre santé globale. Il permet à notre corps de se reposer, de récupérer et de se régénérer, ce qui est essentiel pour maintenir un bon équilibre émotionnel et mental. Des études ont montré que le manque de sommeil peut causer une diminution de la concentration, de l'irritabilité et de l'anxiété. Il est donc important de faire en sorte de dormir suffisamment chaque nuit pour maintenir une bonne santé physique et mentale. Des astuces pour améliorer la qualité de votre sommeil incluent de maintenir une routine de sommeil régulière, de créer un environnement de sommeil confortable et de limiter les stimulants tels que la caféine et l'alcool avant de se coucher."
     />
      {sleeps.length > 0 && (
        <CustomTable
          array={sleeps}
          onSelect={setSelectedSleep}
          onDelete={deleteSleep}
          resetInput={resetInputs}
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
        <TextField
          onChange={(event) => dispatch(setQuantity(Number(event.target.value)))}
          value={sleepQuantity}
          label="Durée (heure)"
          type="number"
          variant="outlined"
          sx={{ mb: 1, mt: 1 }}
        />
        <CustomDatePicker
          value={sleepDate}
          actionCreator={setDate}
        />

        <InputLabel sx={{ my: 1, textAlign: 'center' }}>Qualité du sommeil</InputLabel>
        <Select
          value={sleepQuality}
          onChange={(event) => dispatch(setQuality(Number(event.target.value)))}
          sx={{ width: 'fit-content', m: 'auto', mx: 'auto', my: 1 }}
        >
          <MenuItem value={1}>&#128532;</MenuItem>
          <MenuItem value={2}>&#128528;</MenuItem>
          <MenuItem value={3}>&#128512;</MenuItem>
        </Select>
        <Button
          sx={{ m: 'auto' }}
          variant="contained"
          type="submit"
        >
          Envoyer
        </Button>
      </Box>
    </Container>
  );
}
