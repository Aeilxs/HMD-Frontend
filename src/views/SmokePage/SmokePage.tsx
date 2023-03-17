import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import MessageBox from '../../shared/MessageBox/MessageBox';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectSmokeMessage, selectSmokes } from '../../reducers/dashboard/smoke/smokeSlice';
import { deleteSmoke, editSmoke, postSmoke } from '../../reducers/dashboard/smoke/smokeMiddleware';
import CustomTable from '../../shared/CustomTable/CustomTable';
import { selectIsEdit, selectSmokeInputs, setInputValue } from '../../reducers/UI/uiSlice';
import { useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function SmokePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const smokes = useAppSelector(selectSmokes);
  const isEdit = useAppSelector(selectIsEdit);
  const { date, quantity } = useAppSelector(selectSmokeInputs);
  const { message, severity } = useAppSelector(selectSmokeMessage);
  const formRef = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue({ path: 'smokeInputs', name: event.target.name, value: event.target.value }));
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
        Tabagisme
      </Typography>
      <MessageBox
        title="Comment réduire sa consommation de cigarettes ?"
        content="Si vous cherchez à réduire votre consommation de cigarettes, voici quelques conseils utiles. Tout d'abord, établissez un plan et fixez-vous des objectifs réalisables pour réduire progressivement le nombre de cigarettes que vous fumez chaque jour. Essayez de vous rappeler les raisons pour lesquelles vous voulez arrêter de fumer ou réduire votre consommation et gardez ces raisons en tête. Évitez les déclencheurs qui vous incitent à fumer, comme le café ou l'alcool. Essayez également de remplacer la cigarette par des alternatives plus saines, comme des bonbons à la menthe ou des bâtons de cannelle. Enfin, n'hésitez pas à demander de l'aide et du soutien à votre entourage ou à un professionnel de la santé. Avec de la patience et de la persévérance, vous pouvez réussir à réduire votre consommation de cigarettes et à améliorer votre santé."
      />
      {smokes.length > 0 && (
        <CustomTable
          array={smokes}
          path="smokeInputs"
          onDelete={deleteSmoke}
          formRef={formRef}
        />
      )}
      <Box
        component="form"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          isEdit ? dispatch(editSmoke()) : dispatch(postSmoke());
        }}
        sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
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
          value={quantity}
          name="quantity"
          label="Quantité de cigarettes"
          type="number"
          variant="outlined"
          sx={{ mb: 1, mt: 1 }}
        />
        <CustomDatePicker
          value={date}
          path="smokeInputs"
          name="date"
          actionCreator={setInputValue}
        />
        <Button
          sx={{ mx: 'auto', my: 2 }}
          variant="contained"
          type="submit"
        >
          {isEdit ? 'Editer' : 'Ajouter'}
        </Button>
      </Box>
    </Container>
  );
}
