export const removeLeftZero = (value: number) => {
  return value.toString().padStart(2, '0');
};

export const formatDateYYYYMMDD = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const convertUTCDateToLocalDate = (date: Date) => {
  const utcDate = new Date(date);

  const localDate = new Date(
    utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000
  );

  return localDate;
};
