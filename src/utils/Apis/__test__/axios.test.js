import { replaceParams } from '../axios';
import { axiosPatch } from '../axios';

it('Test replaceParams', () => {
  expect(replaceParams('_test', { key: '_key' })).toEqual('_test');
});

it('Test axiosPatch', () => {
  const arroptions = [];
  expect(axiosPatch(arroptions)).toEqual({ _U: 0, _V: 0, _W: null, _X: null });
});
