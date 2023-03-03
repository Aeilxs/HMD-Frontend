import Grid from './Grid/Grid';
import ActivitiesGraph from './ActivitiesGraph/ActivitiesGraph';
import HydrationsGraph from './HydrationsGraph/HydrationsGraph';
import SmokesGraph from './SmokesGraph/SmokesGraph';
import SleepGraph from './SleepsGraph/SleepsGraph';
import DrugsGraph from './DrugsGraph/DrugsGraph';
import FoodGraph from './FoodGraph/FoodGraph';
import { Paper } from '@mui/material';

export default function DashboardPage(): JSX.Element {
  const elevation = 3;
  return (
    <Grid>
      <Paper
        elevation={elevation}
        sx={{ p: 2, gridColumn: '1 / span 2' }}
      >
        <FoodGraph />
      </Paper>
      <Paper
        elevation={elevation}
        sx={{ p: 2 }}
      >
        <ActivitiesGraph />
      </Paper>
      <Paper
        elevation={elevation}
        sx={{ p: 2 }}
      >
        <HydrationsGraph />
      </Paper>
      <Paper
        elevation={elevation}
        sx={{ p: 2 }}
      >
        <SleepGraph />
      </Paper>
      <Paper
        elevation={elevation}
        sx={{ p: 2 }}
      >
        <DrugsGraph />
      </Paper>
      <Paper
        elevation={elevation}
        sx={{ p: 2 }}
      >
        <SmokesGraph />
      </Paper>
    </Grid>
  );
}
