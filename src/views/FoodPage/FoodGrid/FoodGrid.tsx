import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { FoodOFFResponse, RequestStatus } from '../../../Interfaces/API_Interfaces';
import FoodCard from '../FoodCard/FoodCard';

interface FoodGridProps {
  array: FoodOFFResponse[];
  status: RequestStatus;
}

export default function FoodGrid({ array, status }: FoodGridProps): JSX.Element {
  console.log(array);
  return (
    <>
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
        {array.length > 0 &&
          array.map((cardProps: FoodOFFResponse) => (
            <FoodCard
              key={cardProps.id}
              {...cardProps}
            />
          ))}
      </Box>
      <Box></Box>
    </>
  );
}
