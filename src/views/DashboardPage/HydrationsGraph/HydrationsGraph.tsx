import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useResize } from '../../../hooks/useResize';
import { Paper } from '@mui/material';
import { hydrationsChartData } from '../../../utils/chartsData';
export default function HydrationsGraph(): JSX.Element {
  const vwValue = useResize();
  const { dates, amounts } = hydrationsChartData();

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
        label: "Quantité d'eau (cl)",
        data: amounts,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Paper
      elevation={2}
      sx={{ p: 2, height: '100%', minHeight: '250px' }}
    >
      <Bar
        key={vwValue}
        options={options}
        data={data}
      />
    </Paper>
  );
}
