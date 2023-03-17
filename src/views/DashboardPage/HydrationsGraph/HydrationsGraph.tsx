import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useResize } from '../../../hooks/useResize';

import { Box, Paper } from '@mui/material';

interface HydrationsGraphProps {
  dates: string[];
  amounts: number[];
}

export default function HydrationsGraph({ dates, amounts }: HydrationsGraphProps): JSX.Element {
  const vwValue = useResize();
  const [elevation, setElevation] = useState(2);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Hydratation',
      },
    },
  };

  const labels = dates;
  const data = {
    labels,
    datasets: [
      {
        label: "Quantité d'eau (litres)",
        data: amounts,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Box
      component={Paper}
      elevation={elevation}
      onMouseLeave={() => setElevation(2)}
      onMouseEnter={() => setElevation(8)}
      sx={{ p: 2, height: '100%', minHeight: '250px', cursor: 'pointer' }}
    >
      <Box
        component={Bar}
        key={vwValue}
        options={options}
        data={data}
      />
    </Box>
  );
}
