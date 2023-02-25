import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  setSelectedFood,
  Food,
  selectSelectedFood,
} from '../../../../features/dashboard/foodSlice';

import { Autocomplete, TextField } from '@mui/material';

interface FoodProps {
  foods: Food[];
}

export default function FoodSelect({ foods }: FoodProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedFood = useAppSelector(selectSelectedFood);
  return (
    <Autocomplete
      sx={{ my: 2 }}
      value={selectedFood}
      // Propriété "options" pour définir la liste d'options à afficher dans la liste déroulante
      options={foods.map((option) => ({ ...option }))}
      // Propriété "getOptionLabel" pour extraire la propriété "name" de chaque objet d'aliment et l'afficher dans la liste déroulante
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choisissez un aliment"
        />
      )}
      onChange={(event, value) => {
        if (value) dispatch(setSelectedFood(value));
      }}
      // Propriété "isOptionEqualToValue" pour comparer l'objet sélectionné avec les options disponibles en utilisant la propriété "name"
      isOptionEqualToValue={(option, value) => option.name === value.name}
    />
  );
}
