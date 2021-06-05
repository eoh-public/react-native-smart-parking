import { act, renderHook } from '@testing-library/react-hooks';
import { useCountDown } from '../';

describe('Test useKeyboardShow', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  it('Test init', () => {
    const { result } = renderHook(() => useCountDown(0, false, true));
    expect(result.current.timeLeft).toBe(0);
    expect(result.current.countDownString).toBe('00 : 00 : 00');
    expect(result.current.countDown).toEqual({
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    });
    act(() => {
      result.current.resetCountDown(1);
    });
    expect(result.current.timeLeft).toBe(1);
    expect(result.current.countDownString).toBe('00 : 00 : 01');
  });

  it('Test shoudUseDay and countDownTime', () => {
    const { result } = renderHook(() => useCountDown(1, true, true));
    jest.runAllTimers();
    expect(result.current.countDown).toEqual({
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    });
  });

  it('Test shoudUseDay and countUpTime', () => {
    const onTimeFunction = jest.fn();
    const { result } = renderHook(() =>
      useCountDown(1, true, true, onTimeFunction, false)
    );
    jest.runTimersToTime(1000);
    expect(result.current.countDown).toEqual({
      seconds: 2,
      minutes: 0,
      hours: 0,
      days: 0,
    });
  });
});
