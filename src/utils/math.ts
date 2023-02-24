export const calcAge = (date: string): number => {
  const diff = Date.now() - new Date(date).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
};
