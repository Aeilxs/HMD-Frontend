import { store } from '../store/store';
import { calcDate } from './math';

export const sleepChartData = () => {
  const sleeps = store.getState().user.sleeps;
  const dates: string[] = [];
  const amounts: number[] = [];
  const quality: number[] = [];
  sleeps.forEach((sleep) => {
    quality.push(sleep.quality);
    dates.push(calcDate(sleep.date));
    amounts.push(sleep.time);
  });
  return { dates: dates, amounts: amounts, quality: quality };
};

export const smokeChartData = () => {
  const smokes = store.getState().user.cigarettes;
  const dates: string[] = [];
  const amounts: number[] = [];
  smokes.forEach((smoke) => {
    amounts.push(smoke.quantity);
    dates.push(calcDate(smoke.date));
  });
  return { dates: dates, amounts: amounts };
};

export const hydrationsChartData = () => {
  const hydrations = store.getState().user.hydratations;
  const dates: string[] = [];
  const amounts: number[] = [];
  hydrations.forEach((hydration) => {
    amounts.push(hydration.quantity * 100);
    dates.push(calcDate(hydration.date));
  });
  return { dates: dates, amounts: amounts };
};

interface ActivityData {
  marche: number;
  footing: number;
  natation: number;
  velo: number;
  autre: number;
  [key: string]: number;
}

export const activitiesChartData = () => {
  const activities = store.getState().user.activities;
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
    const percentage = Math.round(
      (time / activities.reduce((acc, cur) => acc + cur.time, 0)) * 100
    );
    return percentage;
  });

  return { labels: labels, percentages: percentages };
};

export const foodChartData = () => {};
