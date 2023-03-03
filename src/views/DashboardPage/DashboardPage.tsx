import Grid from './Grid/Grid';
import ActivitiesGraph from './ActivitiesGraph/ActivitiesGraph';
import HydrationsGraph from './HydrationsGraph/HydrationsGraph';
import SmokesGraph from './SmokesGraph/SmokesGraph';
import SleepGraph from './SleepsGraph/SleepsGraph';
import DrugsGraph from './DrugsGraph/DrugsGraph';
import FoodGraph from './FoodGraph/FoodGraph';

export default function DashboardPage(): JSX.Element {
  return (
    <Grid>
      <FoodGraph />
      <ActivitiesGraph />
      <HydrationsGraph />
      <SmokesGraph />
      <SleepGraph />
      <DrugsGraph />
    </Grid>
  );
}
