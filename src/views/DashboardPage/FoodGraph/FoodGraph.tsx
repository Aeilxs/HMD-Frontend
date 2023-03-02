import { Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';

export default function FoodGraph(): JSX.Element {
  const [options, setOptions] = useState({
    chart: {
      id: 'food-chart',
    },
    xaxis: {
      categories: [
        '02/03',
        '03/02',
        '04/02',
        '05/02',
        '06/03',
        '07/04',
        '08/04',
        '09/04',
        '10/04',
        '11/04',
        '12/04',
        '13/04',
      ],
    },
    series: [
      {
        name: 'calories mangées',
        data: [1500, 1700, 2900, 2000, 2050, 2090, 2000, 1900, 1800, 1800, 1900, 2500],
      },
    ],
    yaxis: {
      min: 0,
      max: 3500,
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        // distributed: true,
        dataLabels: {
          hideOverflowingLabels: true,
          orientation: 'vertical',
          position: 'center',
        },
      },
    },
    // @see https://apexcharts.com/docs/options/tooltip/
    tooltip: {
      theme: 'dark', // light
    },
  });

  return (
    <Box sx={{ gridColumn: '1 / span 2' }}>
      <ReactApexChart
        // @ts-ignore
        options={options}
        series={options.series}
        type="bar"
        height={350}
      />
    </Box>
  );
}
