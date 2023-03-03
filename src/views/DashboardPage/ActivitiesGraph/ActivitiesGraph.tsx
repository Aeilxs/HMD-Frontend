import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { Box } from '@mui/system';
import { useResize } from '../../../hooks/useResize';

export default function ActivitiesGraph(): JSX.Element {
  const vwValue = useResize();

  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Activité physique',
      },
    },
  };
  const data = {
    labels: ['Course', 'Marche', 'Natation', 'Vélo', 'Autre'],
    datasets: [
      {
        label: 'Représentation en pourcentage',
        data: [2, 9, 3, 5, 2],
        backgroundColor: ['#f1fa8c80', '#ff555580', '#8be9fd80', '#ff79c680', '#7bc1b780'],
        borderColor: '#000',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      <Doughnut
        key={vwValue}
        options={options}
        data={data}
      />
    </Box>
  );
}
