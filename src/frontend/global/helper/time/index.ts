export const WaitForMilliSecond = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};

export const GetMonthString = (monthIndex: number): string => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[monthIndex];
};
