import { isValidPhoneNumber } from '../Validation';

it('Test isValidPhoneNumber', () => {
  expect(isValidPhoneNumber('0123456')).toBeFalsy();
  expect(isValidPhoneNumber('0981561234')).toBeTruthy();
});
