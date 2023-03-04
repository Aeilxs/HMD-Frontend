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
import { Box } from '@mui/system';
import { useResize } from '../../../hooks/useResize';
export default function SleepsGraph(): JSX.Element {
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

  const labels = ['28/02', '01/03', '05/03', '06/03', '07/03', '08/03', '09/03'];

  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Qualitée du sommeil',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: [1, 2, 3, 3, 2, 2, 1],
      },
      {
        type: 'bar' as const,
        label: 'Durée de la nuit (heures)',
        backgroundColor: 'rgb(53, 162, 235)',
        data: [8, 10, 7, 6, 5, 7, 7],
      },
    ],
  };

  return (
    <Box>
      <Chart
        key={vwValue}
        options={options}
        data={data}
        type="bar"
      />
    </Box>
  );
}
