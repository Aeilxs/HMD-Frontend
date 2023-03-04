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

export default function SmokePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const smokeInputAmount = useAppSelector(selectSmokeQuantity);
  const smokeDate = useAppSelector(selectSmokeDate);
  const smokes = useAppSelector(selectSmokes);
  const isEdit = useAppSelector(selectIsEdit);

  return (
    <Container sx={{ mt: 2 }}>
      <MessageBox
        title="Saviez vous que le tabagisme..."
        content="c'est tabou et qu'on en viendra tous à bout"
        width={100}
      />
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault()
          console.log('smoke submit')
          isEdit ? dispatch(editSmoke()) : dispatch(postSmoke());
        }}
        sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
      >
        {smokes.length > 0 && (
        <CustomTable
          array={smokes}
          onSelect={setSelectedSmoke}
          onDelete={deleteSmoke}
          resetInput={resetInputs}
        />
      )}
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
          type='submit'
        >
          Valider
        </Button>
      </Box>
    </Container>
  );
}
