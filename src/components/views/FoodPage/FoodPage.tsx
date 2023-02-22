import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MessageBox from '../../UI/MessageBox/MessageBox';

export default function FoodPage(): JSX.Element {
  const aliments = [
    {
      category: 'Fruits',
      items: [
        { name: 'Pommes', calories: 52 },
        { name: 'Bananes', calories: 89 },
        { name: 'Oranges', calories: 47 },
      ],
    },
    {
      category: 'Légumes et dérivés',
      items: [
        { name: 'Brocoli', calories: 34 },
        { name: 'Carottes', calories: 41 },
        { name: 'Courgettes', calories: 17 },
      ],
    },
    {
      category: 'Viandes',
      items: [
        { name: 'Poulet', calories: 239 },
        { name: 'Boeuf', calories: 250 },
        { name: 'Porc', calories: 275 },
      ],
    },
    {
      category: 'Poissons',
      items: [
        { name: 'Saumon', calories: 206 },
        { name: 'Thon', calories: 118 },
        { name: 'Cabillaud', calories: 82 },
      ],
    },
    {
      category: 'Oeufs',
      items: [
        { name: 'Oeuf entier', calories: 78 },
        { name: "Blanc d'oeuf", calories: 17 },
        { name: "Jaune d'oeuf", calories: 59 },
      ],
    },
    {
      category: 'Produits laitiers',
      items: [
        { name: 'Lait', calories: 103 },
        { name: 'Fromage', calories: 402 },
        { name: 'Yaourt', calories: 63 },
      ],
    },
    {
      category: 'Féculents',
      items: [
        { name: 'Riz', calories: 130 },
        { name: 'Pain', calories: 266 },
        { name: 'Pâtes', calories: 131 },
      ],
    },
    {
      category: 'Boissons',
      items: [
        { name: 'Eau', calories: 0 },
        { name: 'Café', calories: 2 },
        { name: 'Soda', calories: 140 },
      ],
    },
  ];

  return (
    <>
      <Typography
        variant="h1"
        sx={{ fontSize: '3em', textAlign: 'center', my: 5 }}
      >
        Alimentation
      </Typography>
      <Container sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <MessageBox
          title="En savoir plus"
          content="lorem lorem lorem lorem lorem lorem lorem lorem"
          width={100}
        />
        {aliments.map((alimentCategory) => (
          <Box
            key={alimentCategory.category}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: 'calc(100%/3)',
              p: '1em',
              boxSizing: 'border-box',
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: '2em' }}
            >
              {alimentCategory.category}
            </Typography>
            <Autocomplete
              options={alimentCategory.items}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choisissez un aliment"
                />
              )}
            />
          </Box>
        ))}
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
        <Button variant="contained">Envoyer</Button>
      </Box>
    </>
  );
}
