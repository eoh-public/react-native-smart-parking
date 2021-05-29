import { formatLicencePlate } from '../inputFormatUtils';

test('test inputFormatUtils, formatLicencePlate', () => {
  const result = '50A-123.23';
  expect(formatLicencePlate('50A-123.23')).toBe(result);
  expect(formatLicencePlate('50A123.23')).toBe(result);
  expect(formatLicencePlate('50A-12323')).toBe(result);
  expect(formatLicencePlate('50A12323')).toBe(result);
  expect(formatLicencePlate('50A1')).toBe('50A1');
  expect(formatLicencePlate('12345')).toBe('12345');
});
