import React from 'react';
import { RNCamera } from 'react-native-camera';
import { act, create } from 'react-test-renderer';
import axios from 'axios';
import Routes from '../../../utils/Route';
import SMScanQR from '..';
import { API } from '../../../configs';
import { SCANNING_STATUS } from '../../../configs/Constants';

const mockedGoBack = jest.fn();
const mockedNavigate = jest.fn();
const mockedDangerouslyGetState = jest.fn();

jest.mock('axios');

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
      dangerouslyGetState: mockedDangerouslyGetState,
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock('react-native-toast-message');

describe('Test Scan QR', () => {
  let tree;
  beforeEach(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
  });
  afterEach(() => {
    mockedDangerouslyGetState.mockClear();
    mockedNavigate.mockClear();
    axios.get.mockClear();
    axios.post.mockClear();
  });

  test('render Scan QR', async () => {
    act(() => {
      tree = create(<SMScanQR />);
    });
    const instance = tree.root;
    const RNCam = instance.findAllByType(RNCamera);
    expect(RNCam).toHaveLength(1);
  });

  test('onBarCodeRead invalid data cause not a JSON type', async () => {
    act(() => {
      tree = create(<SMScanQR />);
    });
    const instance = tree.root;
    const RNCam = instance.findByType(RNCamera);

    act(() => {
      const e = { data: 'abc' };
      RNCam.props.onBarCodeRead(e);
    });

    expect(mockedGoBack).toHaveBeenCalled();
  });

  test('onBarCodeRead invalid data cause undefined parking and spot', async () => {
    act(() => {
      tree = create(<SMScanQR />);
    });
    const instance = tree.root;
    const RNCam = instance.findByType(RNCamera);

    act(() => {
      const e = { data: JSON.stringify({ parking: undefined, id: undefined }) };
      RNCam.props.onBarCodeRead(e);
    });

    expect(mockedGoBack).toHaveBeenCalled();
  });

  test('onBarCodeRead valid data but failed to fetch', async () => {
    const response = {
      status: 400,
      data: {},
    };
    axios.get.mockImplementation(async (url) => {
      if (url === API.PARKING.PARKING_INFO()) {
        return { status: 200 };
      }
      return response;
    });

    await act(async () => {
      tree = await create(<SMScanQR />);
    });
    const instance = tree.root;
    const RNCam = instance.findByType(RNCamera);
    await act(async () => {
      const e = { data: JSON.stringify({ parking: 1, id: 1 }) };
      await RNCam.props.onBarCodeRead(e);
    });
    expect(axios.get).toBeCalledTimes(2);
    expect(mockedNavigate).not.toBeCalled();
    expect(axios.get).toHaveBeenNthCalledWith(
      2,
      API.BOOKING.ACTIVE_SESSION(),
      {}
    );
    expect(mockedGoBack).toHaveBeenCalled();
  });

  test('onBarCodeRead has violating then navigate', async () => {
    const response = {
      status: 200,
      data: { booking_id: 1 },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await create(<SMScanQR />);
    });
    const instance = tree.root;
    const RNCam = instance.findByType(RNCamera);
    await act(async () => {
      const e = { data: JSON.stringify({ parking: 1, id: 1 }) };
      await RNCam.props.onBarCodeRead(e);
    });
    expect(axios.get).toBeCalledTimes(1);
    expect(mockedNavigate).toBeCalled();
  });

  test('onBarCodeRead valid data, has active session, then scanToConfirm, then route to MapDashboard', async () => {
    const responseGet = {
      status: 200,
      data: { id: 1 },
    };
    axios.get.mockImplementation(async () => {
      return responseGet;
    });

    let postData = { status: 'booking_activated' };
    const responsePost = {
      status: 200,
      data: postData,
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });

    mockedDangerouslyGetState.mockImplementation(() => ({
      routes: [
        { name: 'route 1' },
        { name: Routes.SmartParkingMapDrawer },
        { name: 'route 2' },
      ],
    }));

    act(() => {
      tree = create(<SMScanQR />);
    });
    const instance = tree.root;
    const RNCam = instance.findByType(RNCamera);

    await act(async () => {
      const e = { data: JSON.stringify({ parking: 1, id: 2 }) };
      await RNCam.props.onBarCodeRead(e);
    });

    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.ACTIVE_SESSION(), {});
    expect(axios.post).toHaveBeenCalledWith(API.BOOKING.SCAN_TO_CONFIRM(), {
      spot_id: 2,
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.MapDashboard, {
      scanDataResponse: postData,
    });
  });

  test('SMScanQR has active session then scanToConfirm route to MapDashboard popup no car', async () => {
    const responseGet = {
      status: 200,
      data: { id: 1 },
    };
    axios.get.mockImplementation(async () => {
      return responseGet;
    });

    let postData = { spot_id: [SCANNING_STATUS.NO_CAR_PARKED_AT_THIS_SPOT] };
    const responsePost = {
      status: 400,
      data: postData,
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });

    mockedDangerouslyGetState.mockImplementation(() => ({
      routes: [
        { name: 'route 1' },
        { name: Routes.SmartParkingMapDrawer },
        { name: 'route 2' },
      ],
    }));

    act(() => {
      tree = create(<SMScanQR />);
    });
    const instance = tree.root;
    const RNCam = instance.findByType(RNCamera);

    await act(async () => {
      const e = { data: JSON.stringify({ parking: 1, id: 2 }) };
      await RNCam.props.onBarCodeRead(e);
    });

    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.ACTIVE_SESSION(), {});
    expect(axios.post).toHaveBeenCalledWith(API.BOOKING.SCAN_TO_CONFIRM(), {
      spot_id: 2,
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.MapDashboard, {
      scanDataResponse: postData,
    });
  });

  test('onBarCodeRead valid data, has active session then scanToConfirm route SmartParkingBookingDetails', async () => {
    const responseGet = {
      status: 200,
      data: { id: 1 },
    };
    axios.get.mockImplementation(async () => {
      return responseGet;
    });

    let postData = { status: 'booking_activated', booking: { id: 1 } };
    const responsePost = {
      status: 200,
      data: postData,
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });

    mockedDangerouslyGetState.mockImplementation(() => ({
      routes: [
        { name: 'route 1' },
        { name: Routes.BookingDetail },
        { name: 'route 3' },
      ],
    }));

    act(() => {
      tree = create(<SMScanQR />);
    });
    const instance = tree.root;
    const RNCam = instance.findByType(RNCamera);

    await act(async () => {
      const e = { data: JSON.stringify({ parking: 1, id: 2 }) };
      await RNCam.props.onBarCodeRead(e);
    });

    expect(mockedNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingBookingDetails,
      {
        scanDataResponse: postData,
        id: 1,
      }
    );
  });

  test('onBarCodeRead valid data, has active session, then scanToConfirm, then route to MyBookingList', async () => {
    const responseGet = {
      status: 200,
      data: { id: 1 },
    };
    axios.get.mockImplementation(async () => {
      return responseGet;
    });

    let postData = { status: 'booking_activated' };
    const responsePost = {
      status: 200,
      data: postData,
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });

    mockedDangerouslyGetState.mockImplementation(() => ({
      routes: [
        { name: 'SmartParkingMapDrawer' },
        { name: Routes.MyBookingList },
        { name: 'SmartParkingScanQR' },
      ],
    }));

    act(() => {
      tree = create(<SMScanQR />);
    });
    const instance = tree.root;
    const RNCam = instance.findByType(RNCamera);

    await act(async () => {
      const e = { data: JSON.stringify({ parking: 1, id: 2 }) };
      await RNCam.props.onBarCodeRead(e);
    });

    expect(mockedNavigate).toHaveBeenCalledWith(Routes.MyBookingList, {
      scanDataResponse: postData,
    });
  });

  test('onBarCodeRead valid data, not active session then scanToBook and canBook ', async () => {
    const responseGet = {
      status: 200,
      data: undefined,
    };
    axios.get.mockImplementation(async () => {
      return responseGet;
    });

    let postData = { spot_id: 1 };
    const responsePost = {
      status: 200,
      canBook: true,
      data: postData,
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });

    act(() => {
      tree = create(<SMScanQR />);
    });
    const instance = tree.root;
    const RNCam = instance.findByType(RNCamera);

    await act(async () => {
      const e = { data: JSON.stringify({ parking: 1, id: 2 }) };
      await RNCam.props.onBarCodeRead(e);
    });

    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.ACTIVE_SESSION(), {});
    expect(mockedNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingParkingAreaDetail,
      {
        id: 1,
        spot_id: 2,
        spot_name: undefined,
        booking_id: undefined,
        spot_status_check_car_parked: false,
        unLock: true,
      }
    );
  });

  test('onBarCodeRead valid data, not active session then scanToBook and not canBook ', async () => {
    const responseGet = {
      status: 200,
      data: undefined,
    };
    axios.get.mockImplementation(async () => {
      return responseGet;
    });
    let postData = { status: 'parking_nearest' };
    const responsePost = {
      status: 400,
      data: postData,
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });

    act(() => {
      tree = create(<SMScanQR />);
    });
    const instance = tree.root;
    const RNCam = instance.findByType(RNCamera);

    await act(async () => {
      const e = { data: JSON.stringify({ parking: 1, id: 2 }) };
      await RNCam.props.onBarCodeRead(e);
    });
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.ACTIVE_SESSION(), {});
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.MapDashboard, {
      scanDataResponse: postData,
    });
  });
});
