import { dataDrugApi } from '../reducers/dashboard/drug/drugSlice';
import { dataHydrationApi } from '../reducers/dashboard/hydration/hydrationSlice';
import { dataSleepApi } from '../reducers/dashboard/sleep/sleepSlice';
import { dataSmokeApi } from '../reducers/dashboard/smoke/smokeSlice';
import { dataSportApi } from '../reducers/dashboard/sport/sportSlice';
import { calcDate } from './math';

export const sleepChartData = (sleeps: dataSleepApi[]) => {
  const dates: string[] = [];
  const amounts: number[] = [];
  const quality: number[] = [];
  sleeps.forEach((sleep) => {
    quality.push(sleep.quality);
    dates.push(calcDate(sleep.date));
    amounts.push(sleep.time);
  });
  return { sleepDates: dates, sleepAmounts: amounts, sleepQualities: quality };
};

export const smokeChartData = (smokes: dataSmokeApi[]) => {
  const dates: string[] = [];
  const amounts: number[] = [];
  smokes.forEach((smoke) => {
    amounts.push(smoke.quantity);
    dates.push(calcDate(smoke.date));
  });
  return mergeData(dates, amounts);
};

export const hydrationsChartData = (hydrations: dataHydrationApi[]) => {
  const dates: string[] = [];
  const amounts: number[] = [];
  hydrations.forEach((hydration) => {
    amounts.push(hydration.quantity * 100);
    dates.push(calcDate(hydration.date));
  });
  return mergeData(dates, amounts);
};

interface ActivityData {
  marche: number;
  footing: number;
  natation: number;
  velo: number;
  autre: number;
  [key: string]: number;
}

export const activitiesChartData = (activities: dataSportApi[]) => {
  if (activities.length === 0) return { activitiesLabels: false, activitiesPercentage: false };
  const labels: string[] = ['Marche', 'Footing', 'Natation', 'Velo', 'Autre'];
  const data: ActivityData = activities.reduce(
    (acc, cur) => {
      //@ts-ignore
      acc[cur.type.toLowerCase()] += cur.time;
      return acc;
    },
    { marche: 0, footing: 0, natation: 0, velo: 0, autre: 0 }
  );

  const percentages = labels.map((label) => {
    const time = data[label.toLowerCase()];
    const percentage = Math.round((time / activities.reduce((acc, cur) => acc + cur.time, 0)) * 100);
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

export const drugsChartData = (drugs: dataDrugApi[]) => {
  const rows: DrugChartData[] = [];
  drugs.forEach((drug) => {
    const { name, unit, quantity, date } = drug;
    rows.push({ id: drug.id, name, unit, quantity, date: calcDate(date) });
  });
  return rows;
};

export const foodChartData = () => {};

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
