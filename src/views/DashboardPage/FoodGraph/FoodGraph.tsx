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
import { useRender } from '../../../hooks/useRender';

export default function FoodGraphs(): JSX.Element {
  const vwValue = useRender();
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Calories consommées',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <Box sx={{ gridColumn: '1 / span 2' }}>
      <Bar
        key={vwValue}
        data={data}
        options={options}
      />
    </Box>
  );
}
