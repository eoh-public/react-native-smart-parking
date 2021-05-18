import { getViolationSuccess } from '../myBookingList';
import { reduxTypes } from '../../../configs/Constants';

it('create action getViolationSuccess', () => {
  const payload = {};
  const expectedAction = {
    type: reduxTypes.GET_VIOLATION_SUCCESS,
    payload,
  };
  expect(getViolationSuccess(payload)).toEqual(expectedAction);
});
