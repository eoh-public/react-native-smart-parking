import reducer from '../myBookingList';
import { reduxTypes, BOOKING_STATUS } from '../../../configs/Constants';

describe('Test myBookingList reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({ violationsData: null });
  });

  it('get violation success', () => {
    expect(
      reducer([], {
        type: reduxTypes.GET_VIOLATION_SUCCESS,
        payload: [],
      })
    ).toEqual({ violationsData: undefined });
    expect(
      reducer([], {
        type: reduxTypes.GET_VIOLATION_SUCCESS,
        payload: [
          {
            id: 2879,
            parking_name: 'Night Parking',
            parking_address: 'Chung Cư Thanh Đa',
            grand_total: '251500.00',
            arrive_at: '2021-05-17T02:06:20Z',
            leave_at: null,
            start_count_up: true,
            total_violating_time: 1640,
            is_paid: false,
            status: BOOKING_STATUS.ON_GOING,
          },
          {
            id: 2879,
            parking_name: 'Night Parking',
            parking_address: 'Chung Cư Thanh Đa',
            grand_total: '251500.00',
            arrive_at: '2021-05-17T02:06:20Z',
            leave_at: null,
            start_count_up: true,
            total_violating_time: 1640,
            is_paid: true,
            status: BOOKING_STATUS.COMPLETED,
          },
        ],
      })
    ).toEqual({
      violationsData: {
        id: 2879,
        parking_name: 'Night Parking',
        parking_address: 'Chung Cư Thanh Đa',
        grand_total: '251500.00',
        arrive_at: '2021-05-17T02:06:20Z',
        leave_at: null,
        start_count_up: true,
        total_violating_time: 1640,
        is_paid: false,
        status: BOOKING_STATUS.ON_GOING,
      },
    });
  });
});
