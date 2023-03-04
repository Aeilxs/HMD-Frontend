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

export const foodChartData = () => {};
export const activitiesChartData = () => {};
export const hydrationsChartData = () => {};
