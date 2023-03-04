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
import { smokeChartData } from '../../../utils/chartsData';

export default function SmokesGraph(): JSX.Element {
  const vwValue = useResize();
  const { dates, amounts } = smokeChartData();
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
