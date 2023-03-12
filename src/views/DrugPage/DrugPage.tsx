import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import {
  resetInputs,
  selectDate,
  selectDrugMessage,
  selectInfos,
  selectName,
  selectQuantity,
  selectUnit,
  setDate,
  setInfos,
  setName,
  setQuantity,
  setSelectedDrug,
  setUnit,
} from '../../reducers/dashboard/drug/drugSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import MessageBox from '../../shared/MessageBox/MessageBox';
import { deleteDrug, editDrug, postDrug } from '../../reducers/dashboard/drug/drugMiddleware';
import { selectIsEdit } from '../../reducers/UI/uiSlice';
import CustomTable from '../../shared/CustomTable/CustomTable';
import { selectDrugs } from '../../reducers/user/userSlice';
import { useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function DrugPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const date = useAppSelector(selectDate);
  const name = useAppSelector(selectName);
  const unit = useAppSelector(selectUnit);
  const infos = useAppSelector(selectInfos);
  const quantity = useAppSelector(selectQuantity);
  const isEdit = useAppSelector(selectIsEdit);
  const drugs = useAppSelector(selectDrugs);
  const message = useAppSelector(selectDrugMessage);
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
        Traitement médical
      </Typography>
      <MessageBox
        title="L'importance de suivre ses traitements médicaux"
        content="Lorsqu'un professionnel de la santé prescrit un traitement médical, il est important de suivre attentivement les instructions pour maximiser les chances de guérison ou d'amélioration de votre santé. Cela peut inclure la prise régulière de médicaments, le suivi d'un régime alimentaire spécifique ou la participation à des séances de thérapie ou de réadaptation. Le non-respect de ces instructions peut entraîner des complications et des conséquences négatives sur la santé, y compris des effets secondaires indésirables ou une aggravation de l'état de santé. Si vous avez des préoccupations ou des questions concernant votre traitement, n'hésitez pas à en discuter avec votre médecin ou votre professionnel de la santé. Ensemble, vous pouvez travailler pour trouver un traitement efficace et adapté à votre situation individuelle."
      />
      {drugs.length > 0 && (
        <CustomTable
          array={drugs}
          onSelect={setSelectedDrug}
          onDelete={deleteDrug}
          resetInput={resetInputs}
          formRef={formRef}
        />
      )}
      <Box
        component="form"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          isEdit ? dispatch(editDrug()) : dispatch(postDrug());
        }}
        sx={{ display: 'flex', flexDirection: 'column', mx: 'auto', my: 2 }}
      >
        {message.message && <Alert severity={message.severity}>{message.message}</Alert>}
        <TextField
          label="Quel medicament prenez-vous ?"
          variant="standard"
          sx={{ py: 3 }}
          value={name}
          onChange={(event) => dispatch(setName(event.target.value))}
        />
        <FormControl component="fieldset">
          <label>Unité du médicament</label>
          <RadioGroup
            aria-label="unit"
            name="unit"
            value={unit}
            onChange={(event) => dispatch(setUnit(event.target.value))}
            row
          >
            <FormControlLabel
              value="comprimés"
              control={<Radio />}
              label="Comprimé(s)"
            />
            <FormControlLabel
              value="cuillères"
              control={<Radio />}
              label="Cuillère(s)"
            />
            <FormControlLabel
              value="sachets"
              control={<Radio />}
              label="Sachet(s)"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Dose"
          variant="standard"
          sx={{ py: 3 }}
          value={quantity}
          onChange={(event) => dispatch(setQuantity(Number(event.target.value)))}
        />
        <TextField
          label="Informations complementaires"
          variant="standard"
          sx={{ py: 3 }}
          value={infos}
          onChange={(event) => dispatch(setInfos(event.target.value))}
        />
        <CustomDatePicker
          value={date}
          actionCreator={setDate}
        />
        <Box sx={{ margin: 'auto', mt: '2em' }}>
          <Button
            type="submit"
            variant="contained"
          >
            Envoyer
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
