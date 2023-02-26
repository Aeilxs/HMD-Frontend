import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  fetchCategories,
  selectCategory,
  setCategory,
} from '../../../../features/dashboard/foodSlice';

import { Autocomplete, TextField } from '@mui/material';

interface CategoryProps {
  aliments: string[];
}
export default function CategorySelector({ aliments }: CategoryProps): JSX.Element {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  return (
    <Autocomplete
      sx={{ my: 2 }}
      value={category}
      // Propriété "options" pour définir la liste d'options à afficher dans la liste déroulante
      options={aliments.sort((a, b) => a.localeCompare(b))}
      // Propriété "getOptionLabel" pour extraire la valeur de chaque option et l'afficher dans la liste déroulante
      getOptionLabel={(option) => option}
      onChange={(event, value) => {
        if (value) {
          dispatch(setCategory(value));
          dispatch(fetchCategories(value));
        }
      }}
      // Propriété "isOptionEqualToValue" pour comparer l'option sélectionnée avec les options disponibles en utilisant la valeur
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choisissez une catégorie"
        />
      )}
    />
  );
}
