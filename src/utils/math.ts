export const calcAge = (date: string): number => {
  const diff = Date.now() - new Date(date).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
};

export const calcDate = (oldDate:string): string => {
  const date = new Date(oldDate);
  return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear();
}