import { FoodOFFInfoEnum } from '../Interfaces/API_Interfaces';

export const calcDate = (oldDate: string): string => {
  const date = new Date(oldDate);
  return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
};

/**
 * Returns a formatted category string:
 *  - converts to lowercase
 *  - replaces spaces with hyphens (-)
 *  - removes French accents
 *  - replaces apostrophes with hyphens (-)
 */
export function formatCategory(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/'/g, '-');
}

export function formatFoodCardEnum(input: FoodOFFInfoEnum): string {
  const validValues: FoodOFFInfoEnum[] = ['high', 'low', 'moderate'];
  if (validValues.includes(input)) {
    switch (input) {
      case 'high':
        return '🔴';
      case 'low':
        return '🟢';
      case 'moderate':
        return '🟡';
    }
  }
  return '❔';
}
