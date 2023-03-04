import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import {
  resetInputs,
  selectDate,
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

export default function DrugPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectDate);
  const name = useAppSelector(selectName);
  const unit = useAppSelector(selectUnit);
  const infos = useAppSelector(selectInfos);
  const quantity = useAppSelector(selectQuantity);
  const isEdit = useAppSelector(selectIsEdit);
  const drugs = useAppSelector(selectDrugs)

  return (
    <Container sx={{ mt: 2 }}>
      <MessageBox
        title="En savoir plus"
        content="lorem lorem lorem lorem lorem lorem lorem"
        width={100}
      />
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          isEdit ? dispatch(editDrug()) : dispatch(postDrug());
        }}
        sx={{ display: 'flex', flexDirection: 'column', mx: 'auto', my: 2 }}
      >
        {drugs.length > 0 && (
        <CustomTable
          array={drugs}
          onSelect={setSelectedDrug}
          onDelete={deleteDrug}
          resetInput={resetInputs}
        />
      )}
        <CustomDatePicker
          value={date}
          actionCreator={setDate}
        />
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
          <FormControlLabel value="comprimés" control={<Radio />} label="Comprimé(s)" />
          <FormControlLabel value="cuillères" control={<Radio />} label="Cuillère(s)" />
          <FormControlLabel value="sachets" control={<Radio />} label="Sachet(s)" />
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
