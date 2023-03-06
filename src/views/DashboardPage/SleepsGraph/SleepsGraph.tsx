import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useResize } from '../../../hooks/useResize';
import { Paper } from '@mui/material';

interface SleepsGraphProps {
  dates: string[];
  amounts: number[];
  qualities: number[];
}

export default function SleepsGraph({ dates, amounts, qualities }: SleepsGraphProps): JSX.Element {
  const vwValue = useResize();

  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  );
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sommeil',
      },
    },
  };

  const labels = dates;
  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Qualitée du sommeil',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: qualities,
      },
      {
        type: 'bar' as const,
        label: 'Durée de la nuit (heures)',
        backgroundColor: 'rgb(53, 162, 235)',
        data: amounts,
      },
    ],
  };

  return (
    <Paper
      elevation={2}
      sx={{ p: 2, height: '100%', minHeight: '250px' }}
    >
      <Chart
        key={vwValue}
        options={options}
        data={data}
        type="bar"
      />
    </Paper>
  );
}
