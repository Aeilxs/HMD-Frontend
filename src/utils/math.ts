import { store } from '../store/store';
import { ConsommedFood, Food } from '../reducers/dashboard/food/foodSlice';
import { dataSleepApi } from '../reducers/dashboard/sleep/sleepSlice';
import { dataHydrationApi } from '../reducers/dashboard/hydration/hydrationSlice';
import { dataSmokeApi } from '../reducers/dashboard/smoke/smokeSlice';
import { dataSportApi } from '../reducers/dashboard/sport/sportSlice';
import { dataDrugApi } from '../reducers/dashboard/drug/drugSlice';

export const calcAge = (date: string): number => {
  const diff = Date.now() - new Date(date).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
};

export const calcDate = (oldDate: string): string => {
  const date = new Date(oldDate);
  return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
};

export const calcCalories = (food: ConsommedFood): number => Math.ceil((Number(food.calories) / 100) * food.quantity);
export interface MBProps {
  weight: number | '';
  height: number | '';
  age: number | null;
  gender: 'Femme' | 'Homme' | '';
}

export const calcMB = ({ weight, height, age, gender }: MBProps): number | undefined => {
  if (weight === '' || height === '' || age === null || gender === '') {
    return;
  }
  return gender === 'Homme'
    ? Math.ceil(13.707 * weight + 492.3 * height - 6.673 * age + 77.607)
    : Math.ceil(9.74 * weight + 172.9 * height - 4.737 * age + 667.051);
};

type GenericProps = dataSleepApi | dataDrugApi | dataHydrationApi | dataSmokeApi | dataSportApi;

export const sortByDate = (array: GenericProps[]): GenericProps[] => {
  return array.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getFoodNameById = (): string => {
  const foods = store.getState().user.caloricAlimentations;
  const id = store.getState().food.id;
  return foods.find((food) => food.id === id)?.name || 'Aliment inconnu';
};

/**
 * Retourne un tableau d'aliments unique en fonction du nom
 *
 * @param {Food[]} foodsList - Le tableau d'aliments à filtrer
 * @returns {Food[]} Le tableau d'aliments unique en fonction de leur nom
 */
export const getUniqueFoods = (foodsList: Food[]): Food[] => {
  return foodsList.filter(
    (food, index, array) => food.name && food.calories && array.find((element) => element.name === food.name) === food
  );
};
