const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAIL = 'FAIL';
const RESET = 'RESET';

export const createRequestTypes = (base) => ({
  [REQUEST]: `${base}_${REQUEST}`,
  [SUCCESS]: `${base}_${SUCCESS}`,
  [FAIL]: `${base}_${FAIL}`,
  [RESET]: `${base}_${RESET}`,
});
