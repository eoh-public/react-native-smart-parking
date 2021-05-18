import { EXIT_APP, SET_LOADING, exitApp, setLoading } from '../ui';

describe('Test ui actions', () => {
  let expectedAction;
  it('Test setLoading action', () => {
    const loading = true;
    expectedAction = {
      type: SET_LOADING,
      loading,
    };
    expect(setLoading(loading)).toEqual(expectedAction);
  });

  it('Test exitApp action', () => {
    const exit = true;
    expectedAction = {
      type: EXIT_APP,
      exit,
    };
    expect(exitApp(exit)).toEqual(expectedAction);
  });
});
