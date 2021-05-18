import { initAuth, INIT_AUTH } from '../auth';

it('Test initAuth action', () => {
  const params = {};
  const expectedAction = {
    type: INIT_AUTH.REQUEST,
    params,
  };
  expect(initAuth(params)).toEqual(expectedAction);
});
