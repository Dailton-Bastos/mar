export const removeLeftZero = (value: number) => {
  return value.toString().padStart(2, '0');
};

export const formatDateYYYYMMDD = (date: Date) => {
  return date.toISOString().split('T')[0];
};
