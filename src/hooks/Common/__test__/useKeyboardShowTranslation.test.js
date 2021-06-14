import { Keyboard } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';
import { useKeyboardShowTranslation } from '../useKeyboardShowTranslation';
import { Value } from 'react-native-reanimated';

let onKeyBoardDidShowCallback = null;
let onKeyBoardDidHideCallback = null;

const originalAddListener = Keyboard.addListener;

// eslint-disable-next-line promise/prefer-await-to-callbacks
const mockAddListener = jest.fn((event, callback) => {
  if (event === 'keyboardDidShow' || event === 'keyboardWillShow') {
    onKeyBoardDidShowCallback = callback;
  } else {
    onKeyBoardDidHideCallback = callback;
  }
});

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
    memo: (x) => x,
  };
});

describe('Test useKeyboardShow', () => {
  beforeAll(() => {
    Keyboard.addListener = mockAddListener;
  });

  beforeEach(() => {
    mockAddListener.mockClear();
  });

  afterAll(() => {
    Keyboard.addListener = originalAddListener;
  });

  it('Test keyboard event listener', async () => {
    const { result } = renderHook(() => useKeyboardShowTranslation());
    expect(result.current.opacity).toBe(undefined);
  });

  it('Test on keyboardShow', () => {
    const { result } = renderHook(() => useKeyboardShowTranslation());
    onKeyBoardDidHideCallback();
    expect(result.current.transY).toEqual(new Value(0));
  });

  it('Test on keyboardHide', () => {
    const { result } = renderHook(() => useKeyboardShowTranslation());
    onKeyBoardDidShowCallback({
      endCoordinates: {
        height: 100,
      },
    });
    expect(result.current.opacityStyle).toEqual({
      opacity: undefined,
    });
  });
});
