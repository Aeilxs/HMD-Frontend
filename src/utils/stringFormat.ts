export const calcDate = (oldDate: string): string => {
  const date = new Date(oldDate);
  return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
};

/**
 * return input :
 *  - toLowerCase()
 *  - replace spaces with: -
 *  - remove french accents
 */
export function formatCategory(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
