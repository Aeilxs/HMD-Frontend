import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useResize } from '../../../hooks/useResize';
import { Box, Paper } from '@mui/material';

interface ActivitiesGraphProps {
  labels: string[];
  percentages: number[];
}

export default function ActivitiesGraph({ labels, percentages }: ActivitiesGraphProps): JSX.Element {
  const [elevation, setElevation] = useState(2);
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
    labels: labels,
    datasets: [
      {
        label: 'Représentation en pourcentage',
        data: percentages,
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
    <Box
      component={Paper}
      onMouseEnter={() => setElevation(8)}
      onMouseLeave={() => setElevation(2)}
      elevation={elevation}
      sx={{ cursor: 'pointer', p: 2, height: '100%', minHeight: '250px', textAlign: 'right' }}
    >
      <Box
        component={Doughnut}
        key={vwValue}
        options={options}
        height={100}
        data={data}
      />
    </Box>
  );
}
