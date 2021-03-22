export const calcDistance = (rawDistance) => {
  if (rawDistance < 1000) {
    return `${Math.round(rawDistance)}m`;
  }
  return `${Math.round(rawDistance / 100) / 10}km`;
};
