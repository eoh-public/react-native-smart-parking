import { renderHook } from '@testing-library/react-hooks';
import { useBoolean } from '../';

describe('Test useKeyboardShow', () => {
  it('initialValue = false', async () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current[0]).toBeFalsy();
  });
  it('initialValue = true', async () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current[0]).toBeTruthy();
  });
});
