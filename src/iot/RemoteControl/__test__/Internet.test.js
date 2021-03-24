import { t } from 'i18n-js';

import Toast from 'react-native-toast-message';
import axios from 'axios';
import { sendCommandOverInternet } from '../Internet';

jest.mock('axios');

describe('Test IOT Remote Control Internet', () => {
  beforeEach(() => {
    Toast.show.mockClear();
    axios.post.mockClear();
  });

  test('Trigger action via request POST', async () => {
    axios.post.mockImplementation(() => ({ status: 200 }));
    await sendCommandOverInternet({}, {}, 'internet');
    expect(axios.post).toBeCalled();
    expect(Toast.show).toBeCalledWith({
      type: 'success',
      position: 'bottom',
      text1: t('Command is sent to device via internet'),
      visibilityTime: 1000,
    });
  });

  test('Trigger action fail show error', async () => {
    axios.post.mockImplementation(() => ({ success: false }));
    await sendCommandOverInternet({}, {}, 'internet');
    expect(axios.post).toBeCalled();
    expect(Toast.show).toBeCalled();
  });
});
