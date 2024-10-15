export const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const substractItems = <T,>(arr: T[], item?: T[]) => {
  return item ? arr.filter((i) => !item.includes(i)) : arr;
};
