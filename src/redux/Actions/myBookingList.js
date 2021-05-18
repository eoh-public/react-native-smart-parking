import { reduxTypes } from '../../configs/Constants';

export const getViolationSuccess = (payload) => ({
  type: reduxTypes.GET_VIOLATION_SUCCESS,
  payload,
});
