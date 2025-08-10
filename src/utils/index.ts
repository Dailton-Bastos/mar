export const removeLeftZero = (value: number) => {
  return value.toString().padStart(2, '0');
};
