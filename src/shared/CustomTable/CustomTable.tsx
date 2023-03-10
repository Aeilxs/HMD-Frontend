import { useAppDispatch } from '../../store/hooks';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material/';
import { dataSleepApi } from '../../reducers/dashboard/sleep/sleepSlice';
import { dataDrugApi } from '../../reducers/dashboard/drug/drugSlice';
import { dataProfilApi } from '../../reducers/dashboard/profil/profilSlice';
import { dataHydrationApi } from '../../reducers/dashboard/hydration/hydrationSlice';
import { dataSmokeApi } from '../../reducers/dashboard/smoke/smokeSlice';
import { dataSportApi } from '../../reducers/dashboard/sport/sportSlice';
import { setIsEdit } from '../../reducers/UI/uiSlice';
import { RefObject, useState } from 'react';
import { themeLight } from '../../theme/theme';

type GenericProps = dataSleepApi | dataDrugApi | dataProfilApi | dataHydrationApi | dataSmokeApi | dataSportApi;

type TableProps<GenericProps> = {
  array: GenericProps[];
  onSelect: Function;
  onDelete: Function;
  resetInput: Function;
  formRef: RefObject<HTMLFormElement>;
};

export default function CustomTable({ array, onSelect, onDelete, resetInput, formRef }: TableProps<GenericProps>) {
  const editColor = themeLight.palette.warning.main;
  const deleteColor = themeLight.palette.error.dark;
  const dispatch = useAppDispatch();

  return (
    <TableContainer
      component={Paper}
      sx={{ position: 'relative', my: 2 }}
    >
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ position: 'absolute', right: 0 }}
        onClick={() => {
          dispatch(setIsEdit(false));
          dispatch(resetInput());
          formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Add
      </Button>
      <Table sx={{ my: 2, textAlign: 'center' }}>
        <TableHead>
          <TableRow>
            {Object.keys(array[0]).map((key) => (
              <TableCell
                key={key}
                sx={{ textAlign: 'center' }}
              >
                {key.toUpperCase()}
              </TableCell>
            ))}
            <TableCell sx={{ textAlign: 'center' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {array.map((element) => (
            <TableRow key={element.id}>
              {Object.keys(element).map((key) => (
                <TableCell
                  key={key}
                  sx={{ textAlign: 'center' }}
                >
                  {element[key as keyof GenericProps]}
                </TableCell>
              ))}
              <TableCell sx={{ textAlign: 'right' }}>
                <IconButton
                  aria-label="edit"
                  sx={{
                    mr: 2,
                    backgroundColor: themeLight.palette.warning.light,
                    '&:hover': { backgroundColor: themeLight.palette.warning.main },
                  }}
                  onClick={() => {
                    dispatch(setIsEdit(true));
                    dispatch(onSelect(element as GenericProps));
                    formRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  sx={{
                    backgroundColor: themeLight.palette.error.light,
                    '&:hover': { backgroundColor: themeLight.palette.error.dark },
                  }}
                  onClick={() => dispatch(onDelete(element.id))}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
