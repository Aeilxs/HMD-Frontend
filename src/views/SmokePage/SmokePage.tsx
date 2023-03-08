import { Box, Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import MessageBox from '../../shared/MessageBox/MessageBox';
import 'dayjs/locale/fr';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  resetInputs,
  selectSmokeDate,
  selectSmokeQuantity,
  setSelectedSmoke,
  setSmokeDate,
  setSmokeQuantity,
} from '../../reducers/dashboard/smoke/smokeSlice';
import { deleteSmoke, editSmoke, postSmoke } from '../../reducers/dashboard/smoke/smokeMiddleware';
import { selectSmokes } from '../../reducers/user/userSlice';
import CustomTable from '../../shared/CustomTable/CustomTable';
import { selectIsEdit } from '../../reducers/UI/uiSlice';
import { useRef } from 'react';

export default function SmokePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const smokeInputAmount = useAppSelector(selectSmokeQuantity);
  const smokeDate = useAppSelector(selectSmokeDate);
  const smokes = useAppSelector(selectSmokes);
  const isEdit = useAppSelector(selectIsEdit);
  const formRef = useRef(null);

  return (
    <Container sx={{ mt: 2 }}>
      <MessageBox
        title="Saviez vous que la fumée d'une cigarette..."
        content="contient plus de 7 000 substances chimiques. Parmi ces substances, 69 sont reconnues comme cancérogènes. La fumée aspirée circule dans le corps humain et touche presque chacun des organes. C'est pourquoi le tabagisme affecte autant la santé et le bien-être des fumeurs. La fumée affecte aussi la santé des non-fumeurs qui y sont exposés.
        Les autres produits du tabac, comme les cigares et les cigarillos, ou l'utilisation d'une pipe à eau présentent aussi des risques importants pour la santé. Ce ne sont pas des options plus sécuritaires que de fumer la cigarette."
      />
      {smokes.length > 0 && (
        <CustomTable
          array={smokes}
          onSelect={setSelectedSmoke}
          onDelete={deleteSmoke}
          resetInput={resetInputs}
          formRef={formRef}
        />
      )}
      <Box
        component="form"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          console.log('smoke submit');
          isEdit ? dispatch(editSmoke()) : dispatch(postSmoke());
        }}
        sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
      >
        <CustomDatePicker
          value={smokeDate}
          actionCreator={setSmokeDate}
        />
        <TextField
          onChange={(event) => dispatch(setSmokeQuantity(Number(event.target.value)))}
          value={smokeInputAmount}
          label="Quantité de cigarettes"
          type="number"
          variant="outlined"
          sx={{ mb: 1, mt: 1 }}
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
