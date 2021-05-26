import { replaceParams } from '../axios';

it('Test replaceParams', () => {
  expect(replaceParams('_test', { key: '_key' })).toEqual('_test');
});
