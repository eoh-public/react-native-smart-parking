import { INIT_AUTH } from '../../Actions/auth';
import auth from '../auth';

const initialState = {
  errorMsg: '',
  isLoggedIn: false,
  account: {
    token: '',
    user: {},
  },
};

describe('todos auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  it('should handle INIT_AUTH', () => {
    const responseData = {
      token: 'fwqg4qg4q8g4q864gq84gqw',
      user: { name: 'test' },
    };

    initialState.account = responseData;

    expect(
      auth(initialState, {
        type: INIT_AUTH.SUCCESS,
        data: responseData,
      })
    ).toEqual(initialState);
  });
});
