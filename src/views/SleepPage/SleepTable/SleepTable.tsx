import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Button, IconButton } from '@mui/material';
import {Edit, Delete,Add} from '@mui/icons-material/';
import { selectSleeps } from '../../../reducers/user/userSlice';
import { dataSleepApi, resetInputs, setIsEdit, setSelectedSleep } from '../../../reducers/dashboard/sleep/sleepSlice';
import { deleteSleep } from '../../../reducers/dashboard/sleep/sleepMiddleware';

export default function SleepTable() {
  const dispatch = useAppDispatch();
  const sleeps = useAppSelector(selectSleeps);
  return (
    <TableContainer component={Paper} sx={{position:"relative", my:2}}>
        <Button variant="contained" startIcon={<Add />} sx={{position:'absolute', right:0}} onClick={() => {
          dispatch(setIsEdit(false))
          dispatch(resetInputs())
          }}>
        Add
      </Button>
      <Table
        sx={{ my:2, textAlign: "center"}}
      >
        <TableHead>
          <TableRow>
              <TableCell sx={{textAlign: "center"}}>ID</TableCell>
              <TableCell sx={{textAlign: "center"}}>DUREE</TableCell>
              <TableCell sx={{textAlign: "center"}}>QUALITE</TableCell>
              <TableCell sx={{textAlign: "center"}}>DATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sleeps.map((sleep) => (
            <TableRow key={sleep.id}>
              {Object.keys(sleep).map((key) => (
                <TableCell key={key} sx={{textAlign: "center"}}>{sleep[key as keyof dataSleepApi ]}</TableCell>
              ))}
              <TableCell>
                <IconButton aria-label="edit" sx={{backgroundColor:'#f79829', mr:2}} onClick={() => {
                    dispatch(setIsEdit(true))
                    dispatch(setSelectedSleep(sleep))
                    }}>
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete" sx={{backgroundColor:'red'}} onClick={() => dispatch(deleteSleep(sleep.id))}>
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
