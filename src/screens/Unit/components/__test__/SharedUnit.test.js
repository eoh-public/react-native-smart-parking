import React from 'react';
import { create, act } from 'react-test-renderer';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SharedUnit from '../SharedUnit';
import { TESTID } from '../../../../configs/Constants';
import { API } from '../../../../configs';
import Routes from '../../../../utils/Route';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Test SharedUnit', () => {
  let tree;

  beforeEach(() => {
    axios.post.mockClear();
  });

  let unit = {
    background: '',
    icon: '',
    id: 3,
    name: 'name',
    owner_name: 'owner_name',
    short_summaries: [],
  };
  let item = {
    created_at: moment('2021-01-26T03:00:00.677514Z'),
    id: 69,
    is_pin: false,
    is_star: false,
    unit: unit,
    user: 1,
  };

  test('test create SharedUnit unit is not pin, not star', async () => {
    const navigation = useNavigation();

    await act(async () => {
      tree = await create(<SharedUnit item={item} navigation={navigation} />);
    });
    const instance = tree.root;
    const touchSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.TOUCH_SHARED_UNIT
    );
    act(() => {
      touchSharedUnit.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(Routes.UnitStack, {
      screen: Routes.UnitDetail,
      params: {
        unitId: 3,
        unitData: unit,
      },
    });

    const iconRemovePinSharedUnit = instance.findAll(
      (el) => el.props.testID === TESTID.ICON_REMOVE_PIN_SHARED_UNIT
    );
    expect(iconRemovePinSharedUnit).toHaveLength(0);

    const iconAddPinSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_ADD_PIN_SHARED_UNIT
    );
    act(() => {
      iconAddPinSharedUnit.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.PIN_UNIT(3));

    const iconAddStarSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_ADD_STAR_SHARED_UNIT
    );
    act(() => {
      iconAddStarSharedUnit.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.STAR_UNIT(3));
  });

  test('test create SharedUnit unit is pin, is star', async () => {
    const navigation = useNavigation();
    item.is_pin = true;
    item.is_star = true;

    await act(async () => {
      tree = await create(<SharedUnit item={item} navigation={navigation} />);
    });
    const instance = tree.root;
    const iconRemovePinSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_REMOVE_PIN_SHARED_UNIT
    );
    act(() => {
      iconRemovePinSharedUnit.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.UNPIN_UNIT(3));

    const iconRemoveStarSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_REMOVE_STAR_SHARED_UNIT
    );
    act(() => {
      iconRemoveStarSharedUnit.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.UNSTAR_UNIT(3));
  });
});
