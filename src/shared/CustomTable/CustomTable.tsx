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
import { resetInputValue, setInputValue, setIsEdit } from '../../reducers/UI/uiSlice';
import { RefObject } from 'react';
import { themeLight } from '../../theme/theme';
import { calcDate } from '../../utils/math';
import { Activity, Drug, Hydration, Sleep, Smoke } from '../../Interfaces/API_Interfaces';
import { PropertyPath } from '../../Interfaces/inputs';

type GenericProps = Sleep | Drug | Hydration | Smoke | Activity;

type CustomTableProps<GenericProps> = {
  array: GenericProps[];
  onDelete: Function;
  path: PropertyPath;
  formRef: RefObject<HTMLFormElement>;
};

export default function CustomTable({ array, onDelete, formRef, path }: CustomTableProps<GenericProps>) {
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
          dispatch(resetInputValue('sleepInputs'));
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
                  {key === 'date' ? calcDate(element.date) : element[key as keyof GenericProps]}
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
                  onClick={(event) => {
                    dispatch(setIsEdit(true));
                    for (const [key, value] of Object.entries(element)) {
                      dispatch(setInputValue({ path: path, name: key, value: value }));
                    }
                    formRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => dispatch(onDelete(Number(element.id)))}
                  aria-label="delete"
                  sx={{
                    backgroundColor: themeLight.palette.error.light,
                    '&:hover': { backgroundColor: themeLight.palette.error.dark },
                  }}
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
