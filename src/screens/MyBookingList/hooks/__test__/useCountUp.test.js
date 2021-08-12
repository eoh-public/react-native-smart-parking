import { renderHook } from '@testing-library/react-hooks';
import { useCountUp } from '../useCountUp';

describe('Test useKeyboardShow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('Test init', () => {
    const { result } = renderHook(() => useCountUp(new Date()));
    jest.runOnlyPendingTimers();
    expect(result.current.countUpStr).toBe('00 : 00 : 00');
  });
});
