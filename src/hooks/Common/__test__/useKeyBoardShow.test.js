import { Keyboard } from 'react-native';
import { act, renderHook } from '@testing-library/react-hooks';
import { useKeyboardShow } from '../';

const mockListener = {
  remove: jest.fn(),
};
const originalAddListener = Keyboard.addListener;
const mockAddListener = jest.fn().mockReturnValue(mockListener);

describe('Test useKeyboardShow', () => {
  const config = {
    useWillShow: false,
    useWillHide: false,
  };
  beforeAll(() => {
    Keyboard.addListener = mockAddListener;
  });
  beforeEach(() => {
    mockAddListener.mockClear();
    mockListener.remove.mockClear();
  });
  afterAll(() => {
    Keyboard.addListener = originalAddListener;
  });
  it('Test keyboard event listener', async () => {
    const { result } = renderHook(() => useKeyboardShow(config));
    expect(result.current.keyboardVisible).toBeFalsy();
    expect(result.current.keyboardBottomPadding).toBe(0);
    act(() => {
      result.current.dismissKeyboard();
    });
    expect(Keyboard.addListener).toHaveBeenCalledTimes(2);
  });
});
