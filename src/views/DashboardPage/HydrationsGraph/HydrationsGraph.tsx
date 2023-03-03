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
import { Box } from '@mui/system';
import { useResize } from '../../../hooks/useResize';
export default function HydrationsGraph(): JSX.Element {
  const vwValue = useResize();
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const options = {
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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 2',
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Box>
      <Bar
        key={vwValue}
        options={options}
        height={500}
        width={vwValue / 2}
        data={data}
      />
    </Box>
  );
}
