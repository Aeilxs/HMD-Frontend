import { Box, Button, Container, TextField } from '@mui/material';
import {
  selectDate,
  selectInfos,
  selectName,
  selectQuantity,
  setDate,
  setInfos,
  setName,
  setQuantity,
} from '../../reducers/dashboard/drug/drugSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import MessageBox from '../../shared/MessageBox/MessageBox';
import { postDrug } from '../../reducers/dashboard/drug/drugMiddleware';

export default function DrugPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectDate);
  const name = useAppSelector(selectName);
  const infos = useAppSelector(selectInfos);
  const quantity = useAppSelector(selectQuantity);

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
          dispatch(postDrug());
        }}
        sx={{ display: 'flex', flexDirection: 'column', mx: 'auto', my: 2 }}
      >
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
        <TextField
          label="Dose"
          variant="standard"
          sx={{ py: 3 }}
          value={quantity}
          onChange={(event) => dispatch(setQuantity(event.target.value))}
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
