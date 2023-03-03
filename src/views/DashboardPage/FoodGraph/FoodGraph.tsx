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

export default function FoodGraphs(): JSX.Element {
  const vwValue = useResize();
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Alimentation',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Calories consommées',
        data: [1800, 1900, 1700, 1500, 2500, 2300, 2400, 2000, 2000, 2100],
        backgroundColor: '#f79829',
      },
      {
        label: 'Apport journalier recommandé',
        data: [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <Box>
      <Bar
        key={vwValue}
        data={data}
        options={options}
      />
    </Box>
  );
}
