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
import { sleepChartData } from '../../../utils/chartsData';
export default function SleepsGraph(): JSX.Element {
  const vwValue = useResize();
  const { dates, quality, amounts } = sleepChartData();

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
        data: quality,
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
      sx={{ p: 2 }}
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
