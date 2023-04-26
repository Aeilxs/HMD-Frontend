import { Activity, Drug, Food, Hydration, Sleep, Smoke } from '../Interfaces/API_Interfaces';
import { calcDate } from './stringFormat';

export const sleepChartData = (sleeps: Sleep[]) => {
  const dates: string[] = [];
  const amounts: number[] = [];
  const quality: number[] = [];
  sleeps.forEach((sleep) => {
    quality.push(sleep.quality);
    dates.push(calcDate(sleep.date));
    amounts.push(sleep.duration);
  });
  return { sleepDates: dates, sleepAmounts: amounts, sleepQualities: quality };
};

export const smokeChartData = (smokes: Smoke[]) => {
  const dates: string[] = [];
  const amounts: number[] = [];
  smokes.forEach((smoke) => {
    amounts.push(smoke.quantity);
    dates.push(calcDate(smoke.date));
  });
  return mergeData(dates, amounts);
};

export const hydrationsChartData = (hydrations: Hydration[]) => {
  const dates: string[] = [];
  const amounts: number[] = [];
  hydrations.forEach((hydration) => {
    amounts.push(hydration.quantity);
    dates.push(calcDate(hydration.date));
  });
  return mergeData(dates, amounts);
};

/**
 * Inteface for the array passed to the chart component
 */
interface ActivityData {
  marche: number;
  footing: number;
  natation: number;
  velo: number;
  autre: number;
  [key: string]: number;
}

export const activitiesChartData = (activities: Activity[]) => {
  if (activities.length === 0) return { activitiesLabels: false, activitiesPercentage: false };
  const labels: string[] = ['Marche', 'Footing', 'Natation', 'Velo', 'Autre'];
  const data: ActivityData = activities.reduce(
    (acc, cur) => {
      // @ts-ignore
      acc[cur.type.toLowerCase()] += cur.duration;
      return acc;
    },
    { marche: 0, footing: 0, natation: 0, velo: 0, autre: 0 }
  );

  const percentages = labels.map((label) => {
    const time = data[label.toLowerCase()];
    const percentage = Math.round((time / activities.reduce((acc, cur) => acc + cur.duration, 0)) * 100);
    return percentage;
  });
  return { activitiesLabels: labels, activitiesPercentages: percentages };
};

export interface DrugChartData {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  date: string;
}

export const drugsChartData = (drugs: Drug[]) => {
  const rows: DrugChartData[] = [];
  drugs.forEach((drug) => {
    const { name, unit, quantity, date } = drug;
    rows.push({ id: drug.id, name, unit, quantity, date: calcDate(date) });
  });
  return rows;
};

export const foodChartData = (foods: Food[]) => {
  const dates: string[] = [];
  const caloricIntakes: number[] = [];
  foods.forEach((food) => {
    caloricIntakes.push(food.caloric_intake);
    dates.push(calcDate(food.date));
  });
  return mergeData(dates, caloricIntakes);
};

const mergeData = (dates: string[], data: number[]) => {
  const mergedData: Record<string, number> = {};
  for (let i = 0; i < dates.length; i++) {
    const currentDate = dates[i];
    const currentData = data[i];
    if (mergedData[currentDate]) {
      mergedData[currentDate] += currentData;
    } else {
      mergedData[currentDate] = currentData;
    }
  }
  const mergedDates = Object.keys(mergedData);
  const mergedDataArray = Object.values(mergedData);
  return { dates: mergedDates, data: mergedDataArray };
};
