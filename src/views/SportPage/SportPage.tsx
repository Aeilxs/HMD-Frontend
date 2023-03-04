import MessageBox from '../../shared/MessageBox/MessageBox';
import DurationSport from './DurationSport/DurationSport';
import IntensitySport from './IntensitySport/IntensitySport';
import TypeSport from './TypeSport/TypeSport';

import { Box, Button, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  resetInputs,
  selectDate,
  setDate,
  setSelectedSport,
} from '../../reducers/dashboard/sport/sportSlice';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import { deleteSport, editSport, postSport } from '../../reducers/dashboard/sport/sportMiddleware';
import CustomTable from '../../shared/CustomTable/CustomTable';
import { selectSports } from '../../reducers/user/userSlice';
import { selectIsEdit } from '../../reducers/UI/uiSlice';
import { useRef } from 'react';

export default function SportPage(): JSX.Element {
  const date = useAppSelector(selectDate);
  const dispatch = useAppDispatch();
  const sports = useAppSelector(selectSports);
  const isEdit = useAppSelector(selectIsEdit);
  const formRef = useRef(null);

  return (
    <Container>
      <MessageBox
        title="En savoir plus"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac mauris sit amet velit tristique pretium ut sed eros. Sed vel efficitur mauris. Sed euismod aliquam libero id convallis."
        width={100}
      />
      {sports.length > 0 && (
          <CustomTable
            array={sports}
            onSelect={setSelectedSport}
            onDelete={deleteSport}
            resetInput={resetInputs}
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
