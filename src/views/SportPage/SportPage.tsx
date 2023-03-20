import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { deleteSport, editSport, postSport } from '../../reducers/dashboard/activity/sportMiddleware';
import { selectActivityInputs, selectIsEdit, setInputValue } from '../../reducers/UI/uiSlice';
import { selectActivities, selectActivityMessage } from '../../reducers/dashboard/activity/activitySlice';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';

import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import CustomTable from '../../shared/CustomTable/CustomTable';
import IntensitySport from './IntensitySport/IntensitySport';
import MessageBox from '../../shared/MessageBox/MessageBox';
import TypeSport from './TypeSport/TypeSport';

export default function SportPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { date, intensity, duration, type } = useAppSelector(selectActivityInputs);
  const { message, severity } = useAppSelector(selectActivityMessage);
  const activities = useAppSelector(selectActivities);
  const isEdit = useAppSelector(selectIsEdit);
  const formRef = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue({ path: 'activityInputs', name: event.target.name, value: event.target.value }));
  };

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
        content="et l'activité physique sont connus pour leurs nombreux bienfaits pour la santé. Outre les avantages évidents pour la condition physique, les exercices physiques peuvent aider à réduire le stress, l'anxiété et la dépression en stimulant la production de neurotransmetteurs tels que la dopamine et la sérotonine. Le sport peut également améliorer la confiance en soi, l'estime de soi et la qualité du sommeil. Il est recommandé de pratiquer une activité physique régulière pour maintenir une bonne santé mentale et physique. Des activités comme la marche, la course, la natation ou le yoga peuvent être des options bénéfiques et accessibles pour tous les niveaux de condition physique."
      />
      {activities.length > 0 && (
        <CustomTable
          array={activities}
          path="activityInputs"
          onDelete={deleteSport}
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
        {message && <Alert severity={severity}>{message}</Alert>}
        <TypeSport
          type={type}
          handleChange={handleChange}
        />
        <TextField
          type="number"
          name="duration"
          value={duration}
          onChange={handleChange}
          label="Durée de l'activité"
          variant="standard"
          sx={{ py: 3, mt: 3 }}
        />
        <IntensitySport
          value={intensity}
          handleChange={handleChange}
        />
        <CustomDatePicker
          value={date}
          path="activityInputs"
          name="date"
          actionCreator={setInputValue}
        />
        <Box sx={{ m: 'auto', mt: 2 }}>
          <Button
            variant="contained"
            type="submit"
          >
            {isEdit ? 'Editer' : 'Ajouter'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
