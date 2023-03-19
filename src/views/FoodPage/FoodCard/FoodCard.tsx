import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FoodOFFResponseInfo } from '../../../Interfaces/API_Interfaces';

interface FoodCardProps {
  id: string;
  name: string;
  brands: string;
  infos: FoodOFFResponseInfo;
  kcal: number;
  imgSrc: string;
}

export default function FoodCard({ id, brands, infos, name, kcal, imgSrc }: FoodCardProps): JSX.Element {
  return (
    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box
        component="img"
        sx={{ height: '200px' }}
        src={imgSrc}
      />
      <CardContent>
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
          {`graisses: ${infos.fat}`}
          <br />
          {`sel: ${infos.salt}`}
          <br />
          {`sucres: ${infos.sugars}`}
        </Typography>
        <Typography variant="body2">{kcal}kcal / 100 grammes</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ mx: 'auto' }}
        >
          Ajouter
        </Button>
        <Button
          size="small"
          sx={{ mx: 'auto' }}
        >
          Open Food Facts
        </Button>
      </CardActions>
    </Card>
  );
}
