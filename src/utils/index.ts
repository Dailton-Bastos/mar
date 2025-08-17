export const removeLeftZero = (value: number) => {
  return value.toString().padStart(2, '0');
};

export const formatDateYYYYMMDD = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const formatDate = (date: Date) => {
  const newDate = new Date(date);

  const hour = newDate.getHours();

  const GTM = 3;

  if (hour - GTM <= 0) {
    newDate.setDate(newDate.getDate() - 1);

    return newDate;
  }

  return newDate;
};
