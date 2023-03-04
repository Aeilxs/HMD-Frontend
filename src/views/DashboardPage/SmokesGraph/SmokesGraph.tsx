import React from 'react';
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
import { Paper } from '@mui/material';

export default function SmokesGraph(): JSX.Element {
  const vwValue = useResize();
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const options = {
    responsive: true,
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

  const labels = ['28/02', '01/03', null, null, null, '05/03', '06/03', '07/03', '08/03', '09/03'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Quantité de cigarettes',
        data: [5, 7, 2, 20, 20, 10, 8, 7, 4, 3],
        backgroundColor: '#7bc1b7',
      },
    ],
  };

  return (
    <Paper
      elevation={2}
      sx={{ p: 2 }}
    >
      <Line
        key={vwValue}
        options={options}
        data={data}
      />
    </Paper>
  );
}
