import { Button, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import {
  selectHydrationDate,
  setDate,
  setQuantity,
  selectHydrationQuantity,
  setSelectedHydration,
  resetInputs,
} from '../../reducers/dashboard/hydration/hydrationSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import MessageBox from '../../shared/MessageBox/MessageBox';
import {
  deleteHydration,
  editHydration,
  postHydration,
} from '../../reducers/dashboard/hydration/hydrationMiddleware';
import CustomTable from '../../shared/CustomTable/CustomTable';
import { removeHydration, selectHydrations } from '../../reducers/user/userSlice';
import { selectIsEdit } from '../../reducers/UI/uiSlice';
import { useRef } from 'react';

export default function HydrationPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectHydrationDate);
  const quantity = useAppSelector(selectHydrationQuantity);
  const hydrations = useAppSelector(selectHydrations);
  const isEdit = useAppSelector(selectIsEdit);
  const formRef = useRef(null);

  return (
    <Container sx={{ mt: 2 }}>
      <MessageBox
        title="L'importance de bien s'hydrater"
        content="L'hydratation est essentielle pour maintenir une bonne santé. Le corps humain est composé à environ 60% d'eau et elle est nécessaire pour maintenir une bonne digestion, réguler la température corporelle, lubrifier les articulations et transporter les nutriments dans tout le corps. Il est recommandé de boire environ 2 litres d'eau par jour pour maintenir une hydratation adéquate. Cependant, cette quantité peut varier en fonction de votre âge, de votre poids, de votre niveau d'activité et des conditions climatiques. Si vous ne buvez pas assez d'eau, cela peut entraîner une déshydratation qui peut avoir des conséquences négatives sur votre santé, notamment des maux de tête, une fatigue excessive, des douleurs articulaires et musculaires, une diminution de la concentration et une augmentation de la fréquence cardiaque. Essayez de boire de l'eau régulièrement tout au long de la journée, même si vous n'avez pas soif. Vous pouvez également opter pour des alternatives saines comme les jus de fruits frais, les tisanes ou les smoothies."
      />

      {hydrations.length > 0 && (
        <CustomTable
          array={hydrations}
          onSelect={setSelectedHydration}
          onDelete={deleteHydration}
          resetInput={resetInputs}
          formRef={formRef}
        />
      )}
      <Box
        component="form"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          isEdit ? dispatch(editHydration()) : dispatch(postHydration());
        }}
        sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
      >
        <TextField
          onChange={(event) => dispatch(setQuantity(Number(event.target.value)))}
          value={quantity}
          label="Quantité (litre(s))"
          type="number"
          variant="outlined"
          sx={{ mb: 1, mt: 1 }}
        />
        <CustomDatePicker
          value={date}
          actionCreator={setDate}
        />
        <Button
          sx={{ m: 'auto' }}
          variant="contained"
          type="submit"
        >
          Valider
        </Button>
      </Box>
    </Container>
  );
}
