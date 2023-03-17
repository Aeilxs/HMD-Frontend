import { useAppDispatch } from '../../../store/hooks';
import {} from '../../../reducers/dashboard/food/foodSlice';
import { Autocomplete, TextField } from '@mui/material';
import { fetchProducts } from '../../../reducers/dashboard/food/foodMiddleware';
import { setInputValue } from '../../../reducers/UI/uiSlice';

interface CategoryProps {
  aliments: string[];
}

export default function CategorySelector({ aliments }: CategoryProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Autocomplete
      sx={{ my: 2 }}
      value={null}
      // Propriété "options" pour définir la liste d'options à afficher dans la liste déroulante
      options={aliments.sort((a, b) => a.localeCompare(b))}
      // Propriété "getOptionLabel" pour extraire la valeur de chaque option et l'afficher dans la liste déroulante
      getOptionLabel={(option) => option}
      onChange={(event, value) => {
        if (value) {
          dispatch(setInputValue({ path: 'foodInputs', name: 'category', value: value }));
          dispatch(fetchProducts(value));
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
