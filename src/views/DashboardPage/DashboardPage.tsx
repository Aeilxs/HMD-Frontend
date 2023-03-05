import Grid from './Grid/Grid';
import ActivitiesGraph from './ActivitiesGraph/ActivitiesGraph';
import HydrationsGraph from './HydrationsGraph/HydrationsGraph';
import SmokesGraph from './SmokesGraph/SmokesGraph';
import SleepGraph from './SleepsGraph/SleepsGraph';
import DrugsGraph from './DrugsGraph/DrugsGraph';
import FoodGraph from './FoodGraph/FoodGraph';
import {
  sleepChartData,
  smokeChartData,
  hydrationsChartData,
  activitiesChartData,
} from '../../utils/chartsData';

export default function DashboardPage(): JSX.Element {
  const { smokeDates, smokeAmounts } = smokeChartData();
  const { sleepDates, sleepQualities, sleepAmounts } = sleepChartData();
  const { hydrationsDates, hydrationAmounts } = hydrationsChartData();
  const { activitiesPercentages, activitiesLabels } = activitiesChartData();

  return (
    <Grid>
      <FoodGraph />
      <ActivitiesGraph
        labels={activitiesLabels}
        percentages={activitiesPercentages}
      />
      <HydrationsGraph
        dates={hydrationsDates}
        amounts={hydrationAmounts}
      />
      <SleepGraph
        dates={sleepDates}
        amounts={sleepAmounts}
        qualities={sleepQualities}
      />
      <DrugsGraph />
      <SmokesGraph
        dates={smokeDates}
        amounts={smokeAmounts}
      />
    </Grid>
  );
}
