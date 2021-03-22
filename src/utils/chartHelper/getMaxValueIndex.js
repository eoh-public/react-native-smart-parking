export const getMaxValueIndex = (data) => {
  let max = {};
  let _index = 0;
  for (let i = 0; i < data.length; i++) {
    if (!max.y || data[i].y > max.y) {
      max = { ...data[i] };
      _index = i;
    }
  }
  return { _index, max };
};
