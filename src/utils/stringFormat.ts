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
