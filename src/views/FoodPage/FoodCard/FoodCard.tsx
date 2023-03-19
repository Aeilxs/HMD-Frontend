import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FoodOFFResponseInfo } from '../../../Interfaces/API_Interfaces';
import { setInputValue } from '../../../reducers/UI/uiSlice';
import { useAppDispatch } from '../../../store/hooks';
import { formatFoodCardEnum } from '../../../utils/stringFormat';

interface FoodCardProps {
  id: string;
  name: string;
  brands: string;
  infos: FoodOFFResponseInfo;
  kcal: number;
  imgSrc: string;
  url: string;
}

export default function FoodCard({ id, brands, infos, name, kcal, imgSrc, url }: FoodCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Box
        component="img"
        sx={{ height: '200px', objectFit: 'cover', borderRadius: '10px' }}
        src={imgSrc}
      />
      <CardContent
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          {brands}
        </Typography>
        <Typography
          variant="h5"
          component="div"
        >
          {name}
        </Typography>
        <Typography
          sx={{ mb: 1.5 }}
          color="text.secondary"
        >
          {`Graisses: ${formatFoodCardEnum(infos.fat)}`}
          <br />
          {`Sucres:   ${formatFoodCardEnum(infos.sugars)}`}
          <br />
          {`Sel:      ${formatFoodCardEnum(infos.salt)}`}
        </Typography>
        <Typography variant="body2">{kcal}kcal / 100 grammes</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ mx: 'auto' }}
          onClick={() => {
            dispatch(setInputValue({ path: 'foodInputs', name: 'name', value: name }));
            dispatch(setInputValue({ path: 'foodInputs', name: 'kcal_100g', value: kcal.toString() }));
          }}
        >
          Ajouter
        </Button>
        <Button
          size="small"
          sx={{ mx: 'auto' }}
          onClick={() => window.open(url)}
        >
          Open Food Facts
        </Button>
      </CardActions>
    </Card>
  );
}
