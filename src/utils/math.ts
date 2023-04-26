import { Activity, Drug, Food, Hydration, Sleep, Smoke } from '../Interfaces/API_Interfaces';

export const calcAge = (date: string): number => {
  const diff = Date.now() - new Date(date).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
};
interface caloriesProps {
  kcal: number;
  quantity: number;
}
export const calcCalories = ({ kcal, quantity }: caloriesProps): number => Math.ceil((kcal / 100) * quantity);
export interface MBProps {
  weight: number | '';
  size: number | '';
  age: number | null;
  gender: 'femme' | 'homme' | null;
}

export const calcMB = ({ weight, size, age, gender }: MBProps): number | undefined => {
  if (weight === '' || size === '' || age === null || gender === null) {
    return;
  }
  console.log(weight, size, age, gender);
  return gender === 'homme'
    ? Math.ceil(13.707 * weight + 492.3 * (size / 100) - 6.673 * age + 77.607)
    : Math.ceil(9.74 * weight + 172.9 * (size / 100) - 4.737 * age + 667.051);
};
