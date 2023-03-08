import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useResize } from '../../../hooks/useResize';
import { Box, Paper } from '@mui/material';

interface SmokesGraphProps {
  dates: string[];
  amounts: number[];
}

export default function SmokesGraph({ dates, amounts }: SmokesGraphProps): JSX.Element {
  const [elevation, setElevation] = useState(2);
  const vwValue = useResize();
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tabagisme',
      },
    },
  };

  const labels = dates;
  const data = {
    labels,
    datasets: [
      {
        label: 'Quantité de cigarettes',
        data: amounts,
        backgroundColor: '#7bc1b7',
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
        component={Line}
        key={vwValue}
        options={options}
        data={data}
      />
    </Box>
  );
}
