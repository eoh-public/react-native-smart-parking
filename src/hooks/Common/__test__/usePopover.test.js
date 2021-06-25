import { act, renderHook } from '@testing-library/react-hooks';
import { usePopover } from '../';

describe('Test usePopover', () => {
  it('Test hidePopover', async () => {
    const { result } = renderHook(() => usePopover());
    act(() => {
      result.current.hidePopover();
    });
    expect(result.current.showingPopover).toBeFalsy();
  });
});
