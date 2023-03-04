import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useResize } from '../../../hooks/useResize';
import { Paper } from '@mui/material';

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
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper
      elevation={2}
      sx={{ p: 2 }}
    >
      <Doughnut
        key={vwValue}
        options={options}
        height={100}
        data={data}
      />
    </Paper>
  );
}
