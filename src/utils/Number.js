export const roundDecimal = (number, fixed = 1, suffix = '') => {
  return `${number.toFixed(fixed)} ${suffix}`;
};
