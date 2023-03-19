import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { FoodOFFResponse } from '../../../Interfaces/API_Interfaces';
import FoodCard from '../FoodCard/FoodCard';

interface FoodGridProps {
  array: FoodOFFResponse[];
}

export default function FoodGrid({ array }: FoodGridProps): JSX.Element {
  return (
    <>
      {array.length > 0 && (
        <Box
          component={Paper}
          variant="outlined"
          sx={{
            my: 2,
            p: 1,
            display: 'grid',
            maxHeight: '600px',
            overflowY: 'scroll',
            '::-webkit-scrollbar': {
              width: '3px',
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: '#9E9E9E',
              borderRadius: '20px',
            },
            '::-webkit-scrollbar-track': {
              backgroundColor: 'none',
            },
            gridTemplateColumns: ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)'],
            gap: 1,
          }}
        >
          {array.map((card: FoodOFFResponse) => (
            <FoodCard
              key={card.id}
              {...card}
            />
          ))}
        </Box>
      )}
    </>
  );
}
