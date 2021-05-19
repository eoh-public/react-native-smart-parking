import reducer from '../ui';
import { EXIT_APP, SET_LOADING } from '../../Actions/ui';

describe('Test auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      exitApp: false,
    });
  });

  it('Test EXIT_APP type', () => {
    expect(
      reducer(
        {
          loading: false,
          exitApp: false,
        },
        {
          type: EXIT_APP,
          exit: true,
        }
      )
    ).toEqual({
      loading: false,
      exitApp: true,
    });
  });

  it('Test SET_LOADING type', () => {
    expect(
      reducer(
        {
          loading: false,
          exitApp: false,
        },
        {
          type: SET_LOADING,
          loading: true,
        }
      )
    ).toEqual({
      loading: true,
      exitApp: false,
    });
  });
});
