import { roundDecimal } from '../Number';

it('test roundDecimal function', () => {
  expect(roundDecimal(1000)).toBe('1000.0 ');
});
