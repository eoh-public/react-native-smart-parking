import reducer from '../local';
import { CANCEL_BOOKING } from '../../Actions/local';

describe('Test local reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      cancelBooking: false,
    });
  });

  it('Test cancel booking', () => {
    expect(
      reducer(
        {},
        {
          type: CANCEL_BOOKING,
          payload: true,
        }
      )
    ).toEqual({
      cancelBooking: true,
    });
  });
});
