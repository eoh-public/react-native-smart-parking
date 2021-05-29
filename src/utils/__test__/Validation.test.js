import { isValidPhoneNumber, isValidateLicencePlate } from '../Validation';

it('Test isValidPhoneNumber', () => {
  expect(isValidPhoneNumber('0123456')).toBeFalsy();
  expect(isValidPhoneNumber('0981561234')).toBeTruthy();
});

test('test Validation, isValidateLicencePlate', () => {
  expect(isValidateLicencePlate('50A-123.23')).toBe(true);
  expect(isValidateLicencePlate('501-123.23')).toBe(false);
  expect(isValidateLicencePlate('50A-12323')).toBe(false);
  expect(isValidateLicencePlate('501123.23')).toBe(false);
  expect(isValidateLicencePlate('50112323')).toBe(false);
  expect(isValidateLicencePlate('0123')).toBe(false);
});
