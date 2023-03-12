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
  foodChartData,
} from '../../utils/chartsData';
import {
  selectDrugs,
  selectFirstName,
  selectFoods,
  selectHydrations,
  selectSleeps,
  selectSmokes,
  selectSports,
} from '../../reducers/user/userSlice';
import { useAppSelector } from '../../store/hooks';
import IndicatorsPage from './IndicatorBoxes/IndicatorBoxes';
import WelcomeMessage from './WelcomeMessage/WelcomeMessage';

export default function DashboardPage(): JSX.Element {
  const { activitiesPercentages, activitiesLabels } = activitiesChartData(
    useAppSelector(selectSports)
  );
  const { sleepDates, sleepQualities, sleepAmounts } = sleepChartData(useAppSelector(selectSleeps));
  const hydrationData = hydrationsChartData(useAppSelector(selectHydrations));
  const smokeData = smokeChartData(useAppSelector(selectSmokes));
  const drugData = drugsChartData(useAppSelector(selectDrugs));
  const { foodLabels, foodIntakes, foodNeeds } = foodChartData(useAppSelector(selectFoods));

  const displayMessage =
    drugData.length === 0 &&
    smokeData.dates.length === 0 &&
    foodLabels.length === 0 &&
    !activitiesLabels &&
    hydrationData.dates.length === 0 &&
    sleepDates.length === 0;

  return (
    <Grid>
      <IndicatorsPage />
      {foodLabels.length !== 0 && (
        <FoodGraph
          dates={foodLabels}
          foodIntakes={foodIntakes.data}
          foodNeeds={foodNeeds.data}
        />
      )}
      {activitiesPercentages && (
        <ActivitiesGraph
          labels={activitiesLabels}
          percentages={activitiesPercentages}
        />
      )}
      {hydrationData.dates.length !== 0 && (
        <HydrationsGraph
          dates={hydrationData.dates}
          amounts={hydrationData.data}
        />
      )}
      {sleepDates.length > 0 && (
        <SleepGraph
          dates={sleepDates}
          amounts={sleepAmounts}
          qualities={sleepQualities}
        />
      )}
      {drugData.length !== 0 && <DrugsGraph rows={drugData} />}
      {smokeData.dates.length !== 0 && (
        <SmokesGraph
          dates={smokeData.dates}
          amounts={smokeData.data}
        />
      )}
      {displayMessage && <WelcomeMessage />}
    </Grid>
  );
}
