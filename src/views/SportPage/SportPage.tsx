import MessageBox from '../../shared/MessageBox/MessageBox';
import DurationSport from './DurationSport/DurationSport';
import IntensitySport from './IntensitySport/IntensitySport';
import TypeSport from './TypeSport/TypeSport';

import { Alert, Box, Button, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  resetSportInputs,
  selectDate,
  selectSportMessage,
  setDate,
  setSelectedSport,
} from '../../reducers/dashboard/sport/sportSlice';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import { deleteSport, editSport, postSport } from '../../reducers/dashboard/sport/sportMiddleware';
import CustomTable from '../../shared/CustomTable/CustomTable';
import { selectSports } from '../../reducers/user/userSlice';
import { selectIsEdit } from '../../reducers/UI/uiSlice';
import { useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function SportPage(): JSX.Element {
  const date = useAppSelector(selectDate);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sports = useAppSelector(selectSports);
  const isEdit = useAppSelector(selectIsEdit);
  const { message, severity } = useAppSelector(selectSportMessage);
  const formRef = useRef(null);

  return (
    <Container sx={{ mt: 2, position: 'relative' }}>
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
        Activité physique
      </Typography>
      <MessageBox
        title="Saviez-vous que le sport..."
        content="Le sport et l'activité physique sont connus pour leurs nombreux bienfaits pour la santé. Outre les avantages évidents pour la condition physique, les exercices physiques peuvent aider à réduire le stress, l'anxiété et la dépression en stimulant la production de neurotransmetteurs tels que la dopamine et la sérotonine. Le sport peut également améliorer la confiance en soi, l'estime de soi et la qualité du sommeil. Il est recommandé de pratiquer une activité physique régulière pour maintenir une bonne santé mentale et physique. Des activités comme la marche, la course, la natation ou le yoga peuvent être des options bénéfiques et accessibles pour tous les niveaux de condition physique."
      />
      {sports.length > 0 && (
        <CustomTable
          array={sports}
          onSelect={setSelectedSport}
          onDelete={deleteSport}
          resetInput={resetSportInputs}
          formRef={formRef}
        />
      )}
      <Box
        component="form"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          isEdit ? dispatch(editSport()) : dispatch(postSport());
        }}
        sx={{ display: 'flex', flexDirection: 'column', mx: 'auto', my: 2 }}
      >
        {message && (
          <Alert
            sx={{ my: 1 }}
            severity={severity}
          >
            {message}
          </Alert>
        )}
        <TypeSport />
        <DurationSport />
        <IntensitySport />
        <CustomDatePicker
          value={date}
          actionCreator={setDate}
        />

        <Box sx={{ m: 'auto', mt: 2 }}>
          <Button
            variant="contained"
            type="submit"
          >
            Envoyer
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
