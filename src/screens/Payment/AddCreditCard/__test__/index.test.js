import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { TESTID } from '../../../../configs/Constants';
import Text from '../../../../commons/Text';

import AddCreditCard from '../index';

jest.mock('axios');

const mockedGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockedGoBack,
    }),
  };
});
describe('test AddCreditCard container', () => {
  let tree;
  const mockedFetchCard = jest.fn();
  const route = {
    params: {
      fetchCard: mockedFetchCard,
    },
  };

  beforeEach(() => {
    mockedGoBack.mockClear();
  });

  const getElement = (instance) => {
    const itemInput = instance.findAllByType(TextInput);
    const itemInputCardNumber = itemInput.find(
      (item) => item.props.testID === TESTID.INPUT_CARD_NUMBER
    );
    const itemInputName = itemInput.find(
      (item) => item.props.testID === TESTID.INPUT_CARD_HOLDER_NAME
    );
    const itemInputExpireDate = itemInput.find(
      (item) => item.props.testID === TESTID.INPUT_CARD_EXPIRE_DATE
    );
    const itemInputCVV = itemInput.find(
      (item) => item.props.testID === TESTID.INPUT_CARD_CVV
    );

    const button = instance.findAllByType(TouchableOpacity);
    const buttonVisa = button.find(
      (item) => item.props.testID === TESTID.BUTTON_SELECT_VISA
    );
    const buttonMaster = button.find(
      (item) => item.props.testID === TESTID.BUTTON_SELECT_MASTER_CARD
    );
    return {
      itemInput,
      itemInputCardNumber,
      itemInputName,
      itemInputExpireDate,
      itemInputCVV,
      buttonVisa,
      buttonMaster,
    };
  };

  const getElementAfterRender = (instance) => {
    const textCustomerNumber = instance.findAll(
      (item) =>
        item.props.testID === TESTID.CUSTOMER_CARD_NUMBER && item.type === Text
    );
    const nonCardType = instance.findAll(
      (item) => item.props.testID === TESTID.NON_CARD_TYPE
    );
    const visaCardType = instance.findAll(
      (item) => item.props.testID === TESTID.VISA_CARD_TYPE
    );
    const masterCardType = instance.findAll(
      (item) => item.props.testID === TESTID.MASTER_CARD_TYPE
    );
    const saveButton = instance.findAll(
      (item) => item.props.testID === TESTID.SAVE_CARD_BUTTON
    );

    const textNotifyError = instance.findAll(
      (item) =>
        item.props.testID === TESTID.ADD_CARD_NOTIFY_ERROR && item.type === Text
    );
    return {
      textCustomerNumber,
      nonCardType,
      visaCardType,
      masterCardType,
      saveButton,
      textNotifyError,
    };
  };

  test('render add credit card', async () => {
    act(() => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { itemInput } = getElement(instance);

    expect(itemInput.length).toBe(4);
  });

  test('render add credit card with card number', async () => {
    act(() => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { itemInputCardNumber } = getElement(instance);

    act(() => {
      itemInputCardNumber.props.onChangeText('1234');
    });

    const { textCustomerNumber } = getElementAfterRender(instance);

    expect(textCustomerNumber[0].props.children).toBe('1234');
  });

  test('render add credit card with card number length > 4', async () => {
    act(() => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { itemInputCardNumber } = getElement(instance);

    act(() => {
      itemInputCardNumber.props.onChangeText('12345678');
    });

    const { textCustomerNumber } = getElementAfterRender(instance);

    expect(textCustomerNumber[0].props.children).toBe('1234 5678');
  });

  test('render add credit card with card number length > 8', async () => {
    act(() => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { itemInputCardNumber } = getElement(instance);

    act(() => {
      itemInputCardNumber.props.onChangeText('123456781234');
    });

    const { textCustomerNumber } = getElementAfterRender(instance);

    expect(textCustomerNumber[0].props.children).toBe('1234 5678 1234');
  });

  test('render add credit card with card number length 16', async () => {
    act(() => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { itemInputCardNumber } = getElement(instance);

    act(() => {
      itemInputCardNumber.props.onChangeText('1234567812345678');
    });

    const { textCustomerNumber } = getElementAfterRender(instance);

    expect(textCustomerNumber[0].props.children).toBe('1234 5678 1234 5678');
  });

  test('render add credit card number then remove', async () => {
    act(() => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { itemInputCardNumber } = getElement(instance);

    act(() => {
      itemInputCardNumber.props.onChangeText('1234567812345678');
    });

    act(() => {
      itemInputCardNumber.props.onChangeText('');
    });

    const { textCustomerNumber, nonCardType } = getElementAfterRender(instance);

    expect(textCustomerNumber[0]).not.toBeDefined();
    expect(nonCardType[0]).toBeDefined();
  });

  test('render add credit card start with 4', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { itemInputCardNumber } = getElement(instance);

    act(() => {
      itemInputCardNumber.props.onChangeText('4444');
    });

    const {
      textCustomerNumber,
      nonCardType,
      visaCardType,
      masterCardType,
    } = getElementAfterRender(instance);

    expect(textCustomerNumber[0].props.children).toBe('4444');
    expect(nonCardType[0]).not.toBeDefined();
    expect(visaCardType[0]).toBeDefined();
    expect(masterCardType[0]).not.toBeDefined();
  });

  test('render add credit card start with 5', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { itemInputCardNumber } = getElement(instance);

    act(() => {
      itemInputCardNumber.props.onChangeText('5555');
    });

    const {
      textCustomerNumber,
      nonCardType,
      visaCardType,
      masterCardType,
    } = getElementAfterRender(instance);

    expect(textCustomerNumber[0].props.children).toBe('5555');
    expect(nonCardType[0]).not.toBeDefined();
    expect(visaCardType[0]).not.toBeDefined();
    expect(masterCardType[0]).toBeDefined();
  });

  test('input expire date', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { itemInputExpireDate } = getElement(instance);

    act(() => {
      itemInputExpireDate.props.onChangeText('2412');
    });

    expect(itemInputExpireDate.props.value).toBe('24/12');
  });

  test('select visa button', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { buttonVisa } = getElement(instance);

    act(() => {
      buttonVisa.props.onPress();
    });

    const { visaCardType } = getElementAfterRender(instance);
    expect(visaCardType).toBeDefined();
  });

  test('select master card button', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { buttonMaster } = getElement(instance);

    act(() => {
      buttonMaster.props.onPress();
    });

    const { masterCardType } = getElementAfterRender(instance);
    expect(masterCardType).toBeDefined();
  });

  test('test input not ready to save', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const {
      itemInputCardNumber,
      itemInputName,
      itemInputExpireDate,
      itemInputCVV,
    } = getElement(instance);

    await act(async () => {
      itemInputCardNumber.props.onChangeText('5555');
      itemInputName.props.onChangeText('Gia Cat');
      itemInputExpireDate.props.onChangeText('12/21');
      itemInputCVV.props.onChangeText('12');
    });

    await act(async () => {
      tree.update(<AddCreditCard route={route} />);
    });

    const { saveButton } = getElementAfterRender(instance);
    expect(saveButton[0].props.type).toBe('disabled');
  });

  test('test input not ready to save do not have card type', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const {
      itemInputCardNumber,
      itemInputName,
      itemInputExpireDate,
      itemInputCVV,
    } = getElement(instance);

    await act(async () => {
      itemInputCardNumber.props.onChangeText('1111222233334444');
      itemInputName.props.onChangeText('Gia Cat');
      itemInputExpireDate.props.onChangeText('12/21');
      itemInputCVV.props.onChangeText('12');
    });

    await act(async () => {
      tree.update(<AddCreditCard route={route} />);
    });

    const { saveButton } = getElementAfterRender(instance);
    expect(saveButton[0].props.type).toBe('disabled');
  });

  test('test input not ready to save do not have cvv', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const {
      itemInputCardNumber,
      itemInputName,
      itemInputExpireDate,
    } = getElement(instance);

    await act(async () => {
      itemInputCardNumber.props.onChangeText('4444555566667777');
      itemInputName.props.onChangeText('Gia Cat');
      itemInputExpireDate.props.onChangeText('12/21');
    });

    await act(async () => {
      tree.update(<AddCreditCard route={route} />);
    });

    const { saveButton } = getElementAfterRender(instance);
    expect(saveButton[0].props.type).toBe('disabled');
  });

  test('test input not ready to save expire date', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const { itemInputCardNumber, itemInputName, itemInputCVV } = getElement(
      instance
    );

    await act(async () => {
      itemInputCardNumber.props.onChangeText('4444555566667777');
      itemInputName.props.onChangeText('Gia Cat');
      itemInputCVV.props.onChangeText('123');
    });

    await act(async () => {
      tree.update(<AddCreditCard route={route} />);
    });

    const { saveButton } = getElementAfterRender(instance);
    expect(saveButton[0].props.type).toBe('disabled');
  });

  test('test input not ready to save expire date month 00', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const {
      itemInputCardNumber,
      itemInputName,
      itemInputExpireDate,
      itemInputCVV,
    } = getElement(instance);

    await act(async () => {
      itemInputCardNumber.props.onChangeText('4444555566667777');
      itemInputName.props.onChangeText('Gia Cat');
      itemInputCVV.props.onChangeText('123');
      itemInputExpireDate.props.onChangeText('00/19');
    });

    await act(async () => {
      tree.update(<AddCreditCard route={route} />);
    });

    const { saveButton } = getElementAfterRender(instance);
    expect(saveButton[0].props.type).toBe('disabled');
  });

  test('test input not ready to save expire date month invalid', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const {
      itemInputCardNumber,
      itemInputName,
      itemInputExpireDate,
      itemInputCVV,
    } = getElement(instance);

    await act(async () => {
      itemInputCardNumber.props.onChangeText('4444555566667777');
      itemInputName.props.onChangeText('Gia Cat');
      itemInputCVV.props.onChangeText('123');
      itemInputExpireDate.props.onChangeText('13/19');
    });

    await act(async () => {
      tree.update(<AddCreditCard route={route} />);
    });

    const { saveButton } = getElementAfterRender(instance);
    expect(saveButton[0].props.type).toBe('disabled');
  });

  test('test input not ready to save expire date past date', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const {
      itemInputCardNumber,
      itemInputName,
      itemInputExpireDate,
      itemInputCVV,
    } = getElement(instance);

    await act(async () => {
      itemInputCardNumber.props.onChangeText('4444555566667777');
      itemInputName.props.onChangeText('Gia Cat');
      itemInputCVV.props.onChangeText('123');
      itemInputExpireDate.props.onChangeText('01/19');
    });

    await act(async () => {
      tree.update(<AddCreditCard route={route} />);
    });

    const { saveButton } = getElementAfterRender(instance);
    expect(saveButton[0].props.type).toBe('disabled');
  });

  test('test input not ready to save expire date month in the past this year', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const {
      itemInputCardNumber,
      itemInputName,
      itemInputExpireDate,
      itemInputCVV,
    } = getElement(instance);

    await act(async () => {
      itemInputCardNumber.props.onChangeText('4444555566667777');
      itemInputName.props.onChangeText('Gia Cat');
      itemInputCVV.props.onChangeText('123');
      itemInputExpireDate.props.onChangeText('01/21');
    });

    await act(async () => {
      tree.update(<AddCreditCard route={route} />);
    });

    const { saveButton } = getElementAfterRender(instance);
    expect(saveButton[0].props.type).toBe('disabled');
  });

  test('test input ready to save', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const {
      itemInputCardNumber,
      itemInputName,
      itemInputExpireDate,
      itemInputCVV,
    } = getElement(instance);

    await act(async () => {
      itemInputCardNumber.props.onChangeText('4444555566667777');
      itemInputName.props.onChangeText('Gia Cat');
      itemInputExpireDate.props.onChangeText('12/21');
      itemInputCVV.props.onChangeText('123');
    });

    await act(async () => {
      tree.update(<AddCreditCard route={route} />);
    });

    const { saveButton } = getElementAfterRender(instance);

    expect(saveButton[0].props.type).toBe('primary');
  });

  test('test press save card', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const {
      itemInputCardNumber,
      itemInputName,
      itemInputExpireDate,
      itemInputCVV,
    } = getElement(instance);

    await act(async () => {
      itemInputCardNumber.props.onChangeText('4444555566667777');
      itemInputName.props.onChangeText('Gia Cat');
      itemInputExpireDate.props.onChangeText('12/21');
      itemInputCVV.props.onChangeText('123');
    });

    await act(async () => {
      tree.update(<AddCreditCard route={route} />);
    });

    const { saveButton } = getElementAfterRender(instance);

    act(() => {
      saveButton[0].props.onPress();
    });

    const { textNotifyError } = getElementAfterRender(instance);
    expect(textNotifyError[0].props.children).toBe(
      'Thêm thẻ thất bại, vui lòng kiểm tra lại thông tin, tình trạng thẻ của bạn'
    );
  });

  test('test press save card sucess', async () => {
    await act(async () => {
      tree = create(<AddCreditCard route={route} />);
    });

    const instance = tree.root;
    const {
      itemInputCardNumber,
      itemInputName,
      itemInputExpireDate,
      itemInputCVV,
    } = getElement(instance);

    await act(async () => {
      itemInputCardNumber.props.onChangeText('4444555566667777');
      itemInputName.props.onChangeText('Gia Cat');
      itemInputExpireDate.props.onChangeText('12/21');
      itemInputCVV.props.onChangeText('123');
    });

    await act(async () => {
      tree.update(<AddCreditCard route={route} />);
    });

    const { saveButton } = getElementAfterRender(instance);

    axios.post.mockImplementation(async () => {
      return {
        status: 200,
        data: {},
        sucess: true,
      };
    });

    axios.post.mockImplementation(async () => {
      return {
        status: 200,
        data: {},
        sucess: true,
      };
    });

    await act(async () => {
      saveButton[0].props.onPress();
    });

    expect(mockedFetchCard).toBeCalled();
    expect(mockedGoBack).toBeCalled();
  });
});
