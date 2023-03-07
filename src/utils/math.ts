import { ConsommedFood } from '../reducers/dashboard/food/foodSlice';
import {dataFoodApi} from '../reducers/dashboard/food/foodSlice';
import {dataSleepApi} from '../reducers/dashboard/sleep/sleepSlice';
import {dataHydrationApi} from '../reducers/dashboard/hydration/hydrationSlice';
import {dataSmokeApi} from '../reducers/dashboard/smoke/smokeSlice';
import {dataSportApi} from '../reducers/dashboard/sport/sportSlice';
import {dataDrugApi} from '../reducers/dashboard/drug/drugSlice';


export const calcAge = (date: string): number => {
  const diff = Date.now() - new Date(date).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
};

export const calcDate = (oldDate: string): string => {
  const date = new Date(oldDate);
  return (
    ('0' + date.getDate()).slice(-2) +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    date.getFullYear()
  );
};

export const calcCalories = (food: ConsommedFood): number => (Math.ceil((Number(food.calories) / 100) * food.quantity));
export interface MBProps {
  weight: number | '';
  height: number | '';
  age: number | null;
  gender: 'Femme' | 'Homme' | '';
}

export const calcMB = ( {weight, height, age, gender }: MBProps): number | undefined => {
  if (weight === '' || height === '' || age === null || gender === "") {
    console.log("RETURN VIDE");
    return;
  };
  return gender === 'Homme'
    ? Math.ceil(13.707 * weight + 492.3 * height - 6.673 * age + 77.607)
    : Math.ceil(9.74 * weight + 172.9 * height - 4.737 * age + 667.051);
};

export const sortByDate = (array: dataSmokeApi[] | dataFoodApi[] | dataSportApi[] | dataSleepApi[] | dataHydrationApi[] | dataDrugApi[]) => {
  return array.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}