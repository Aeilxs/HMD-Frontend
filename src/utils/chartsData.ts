import { store } from '../store/store';
import { calcDate } from './math';

export const sleepChartData = () => {
  const sleeps = store.getState().user.sleeps;
  const dates: string[] = [];
  const amount: number[] = [];
  const quality: number[] = [];
  sleeps.forEach((sleep) => {
    quality.push(sleep.quality);
    dates.push(calcDate(sleep.date));
    amount.push(sleep.time);
  });
  return { dates: dates, amount: amount, quality: quality };
};

export const foodChartData = () => {};
export const activitiesChartData = () => {};
export const hydrationsChartData = () => {};
export const smokeChartData = () => {};
