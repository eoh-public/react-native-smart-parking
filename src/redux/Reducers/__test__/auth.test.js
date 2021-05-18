import reducer from '../auth';
import { INIT_AUTH } from '../../Actions/auth';

describe('Test auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      errorMsg: '',
      isLoggedIn: false,
      account: {
        token: '',
        user: {},
      },
    });
  });

  it('Test init auth success type', () => {
    expect(
      reducer(
        {},
        {
          type: INIT_AUTH.SUCCESS,
          data: { token: '_token', user: { id: 1 } },
        }
      )
    ).toEqual({
      account: {
        token: '_token',
        user: { id: 1 },
      },
    });
  });
});
