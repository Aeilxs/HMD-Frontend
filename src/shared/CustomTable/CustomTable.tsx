import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import {Edit, Delete,Add} from '@mui/icons-material/';
import { dataSleepApi } from '../../reducers/dashboard/sleep/sleepSlice';
import { dataDrugApi } from '../../reducers/dashboard/drug/drugSlice';
import { dataProfilApi } from '../../reducers/dashboard/profil/profilSlice';
import { dataHydrationApi } from '../../reducers/dashboard/hydration/hydrationSlice';
import { dataSmokeApi } from '../../reducers/dashboard/smoke/smokeSlice';
import { dataSportApi } from '../../reducers/dashboard/sport/sportSlice';
import { setIsEdit } from '../../reducers/UI/uiSlice';
import { useAppDispatch } from '../../store/hooks';


type GenericProps = dataSleepApi | dataDrugApi | dataProfilApi | dataHydrationApi | dataSmokeApi | dataSportApi ;

type TableProps<GenericProps> = {
  array : GenericProps[];
  onSelect : Function;
  onDelete : Function;
  resetInput : Function
}

export default function CustomTable({array, onSelect, onDelete, resetInput} : TableProps<GenericProps>) {
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper} sx={{position:"relative", my:2}}>
        <Button variant="contained" startIcon={<Add />} sx={{position:'absolute', right:0}} onClick={() => {
          dispatch(setIsEdit(false))
          dispatch(resetInput())
          }}>
        Add
      </Button>
      <Table
        sx={{ my:2, textAlign: "center"}}
      >
        <TableHead>
          <TableRow>
          {Object.keys(array[0]).map((key) => (
              <TableCell key={key} sx={{textAlign:'center'}}>{key.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {array.map((element) => (
            <TableRow key={element.id}>
              {Object.keys(element).map((key) => (
                <TableCell key={key} sx={{textAlign: "center"}}>{element[key as keyof GenericProps]}</TableCell>
              ))}
              <TableCell>
                <IconButton aria-label="edit" sx={{backgroundColor:'#f79829', mr:2}} onClick={() => {
                    dispatch(setIsEdit(true))
                    dispatch(onSelect(element as GenericProps))
                    }}>
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete" sx={{backgroundColor:'red'}} onClick={() => dispatch(onDelete(element.id))}>
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
