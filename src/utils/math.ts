import { ConsommedFood } from '../reducers/dashboard/food/foodSlice';
import { dataUserApi } from '../reducers/UI/uiSlice';

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

export const calcTotalCalories = (foods: ConsommedFood[]): number => {
  return foods
    .map((food) => (Number(food.calories) / 100) * food.quantity)
    .reduce((acc, calories) => acc + calories, 0);
};
interface MBProps {
  weight: number;
  height: number;
  age: number;
  gender: 'Femme' | 'Homme';
}

export const calcMB = ({ weight, height, age, gender }: MBProps): number => {
  return gender === 'Homme'
    ? 13.707 * weight + 492.3 * height - 6.673 * age + 77.607
    : 9.74 * weight + 172.9 * height - 4.737 * age + 667.051;
};
