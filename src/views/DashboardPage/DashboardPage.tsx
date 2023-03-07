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
  drugsChartData,
} from '../../utils/chartsData';
import { selectDrugs, selectHydrations, selectSleeps, selectSmokes, selectSports } from '../../reducers/user/userSlice';
import { useAppSelector } from '../../store/hooks';

export default function DashboardPage(): JSX.Element {
  const { activitiesPercentages, activitiesLabels } = activitiesChartData(useAppSelector(selectSports));
  const { sleepDates, sleepQualities, sleepAmounts } = sleepChartData(useAppSelector(selectSleeps));
  const hydrationData = hydrationsChartData(useAppSelector(selectHydrations));
  const smokeData = smokeChartData(useAppSelector(selectSmokes));
  const drugData = drugsChartData(useAppSelector(selectDrugs));
  return (
    <Grid>
      <FoodGraph />
      {activitiesPercentages && (
        <ActivitiesGraph
          labels={activitiesLabels}
          percentages={activitiesPercentages}
        />
      )}
      <HydrationsGraph
        dates={hydrationData.dates}
        amounts={hydrationData.data}
      />
      {sleepDates.length > 0 && (
        <SleepGraph
          dates={sleepDates}
          amounts={sleepAmounts}
          qualities={sleepQualities}
        />
      )}
      <DrugsGraph rows={drugData} />
      <SmokesGraph
        dates={smokeData.dates}
        amounts={smokeData.data}
      />
    </Grid>
  );
}
