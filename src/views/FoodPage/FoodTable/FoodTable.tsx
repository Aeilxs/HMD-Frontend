import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setIsEdit } from '../../../reducers/UI/uiSlice';
import { selectFoods } from '../../../reducers/user/userSlice';
import { deleteFood } from '../../../reducers/dashboard/food/foodMiddleware';
import { resetInputs, setId } from '../../../reducers/dashboard/food/foodSlice';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Button,
  } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';


export default function FoodTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const foods = useAppSelector(selectFoods);

  return (
   <TableContainer component={Paper} sx={{position:'relative'}}>
    <Button variant="contained" startIcon={<Add />} sx={{position:'absolute', right:0}} onClick={() => {
          dispatch(setIsEdit(false))
          dispatch(resetInputs())
          }}>
        Add
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign:'center' }}>Nom de l'aliment</TableCell>
            <TableCell sx={{ textAlign:'center' }}>Calories consommées</TableCell>
            <TableCell sx={{ textAlign:'center' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {foods.map((food) => (
          <TableRow key={food.id}>
            <TableCell sx={{ textAlign:'center' }}>{food.name}</TableCell>
            <TableCell sx={{ textAlign:'center' }}>{food.caloricIntake}</TableCell>
            <TableCell sx={{ textAlign:'center' }}>
                <IconButton aria-label="delete" sx={{backgroundColor:'red'}} onClick={() => dispatch(deleteFood(food.id))}>
                  <Delete />
                </IconButton>
                <IconButton aria-label="edit" sx={{backgroundColor:'#f79829', ml:2}} onClick={() => {
                    dispatch(setIsEdit(true))
                    dispatch(setId(food.id))
                    }}>
                  <Edit />
                </IconButton>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
