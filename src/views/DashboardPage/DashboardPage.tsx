import Grid from './Grid/Grid';
import ActivitiesGraph from './Activities/ActivitiesGraph';
import HydrationsGraph from './Hydrations/HydrationsGraph';
import SmokesGraph from './Smokes/SmokesGraph';
import SleepGraph from './Sleeps/SleepsGraph';
import DrugsGraph from './Drugs/DrugsGraph';
import FoodGraph from './Food/FoodGraph';

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
