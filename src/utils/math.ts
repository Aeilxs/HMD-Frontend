import { Activity, Drug, Food, Hydration, Sleep, Smoke } from '../Interfaces/API_Interfaces';

export const calcAge = (date: string): number => {
  const diff = Date.now() - new Date(date).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
};

// export const calcCalories = (food: ConsommedFood): number =>
//   Math.ceil((Number(food.calories) / 100) * food.quantity);
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

// export const getFoodNameById = (): string => {
//   const foods = store.getState().user.foods;
//   const id = store.getState().food.id;
//   return foods.find((food) => food.id === id)?.name || 'Aliment inconnu';
// };

/**
 * Retourne un tableau d'aliments unique en fonction du nom
 *
 * @param {Food[]} foodsList - Le tableau d'aliments à filtrer
 * @returns {Food[]} Le tableau d'aliments unique en fonction de leur nom
 */
export const getUniqueFoods = (foodsList: Food[]): Food[] => {
  return foodsList.filter(
    (food, index, array) =>
      food.name &&
      food.caloricIntake &&
      array.find((element) => element.name === food.name) === food
  );
};
