import { cancelBooking, CANCEL_BOOKING } from '../local';

it('Test cancelBooking action', () => {
  const payload = true;
  const expectedAction = {
    type: CANCEL_BOOKING,
    payload,
  };
  expect(cancelBooking(payload)).toEqual(expectedAction);
});
