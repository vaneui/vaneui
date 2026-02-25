import { renderHook } from '@testing-library/react';
import { useStackingContext, resetStackCount } from '../utils/stackingContext';

describe('useStackingContext', () => {
  beforeEach(() => { resetStackCount(); });

  it('should return base z-index for overlay layer', () => {
    const { result } = renderHook(() => useStackingContext(true, 'overlay'));
    expect(result.current).toBe(201);
  });

  it('should return base z-index for modal layer', () => {
    const { result } = renderHook(() => useStackingContext(true, 'modal'));
    expect(result.current).toBe(201);
  });

  it('should return base z-index for popup layer', () => {
    const { result } = renderHook(() => useStackingContext(true, 'popup'));
    expect(result.current).toBe(301);
  });

  it('should default to overlay layer when no layer specified', () => {
    const { result } = renderHook(() => useStackingContext(true));
    expect(result.current).toBe(201);
  });

  it('should increment global counter across different layers', () => {
    const { result: first } = renderHook(() => useStackingContext(true, 'overlay'));
    const { result: second } = renderHook(() => useStackingContext(true, 'popup'));

    // First: overlay base (200) + 1 = 201
    expect(first.current).toBe(201);
    // Second: popup base (300) + 2 = 302
    expect(second.current).toBe(302);
  });

  it('should decrement counter on unmount', () => {
    const { unmount: unmountFirst } = renderHook(() => useStackingContext(true, 'overlay'));
    // stackCount is now 1

    unmountFirst();
    // stackCount should be back to 0

    const { result } = renderHook(() => useStackingContext(true, 'overlay'));
    // Should be 200 + 1 = 201 (counter reset to 0, then incremented)
    expect(result.current).toBe(201);
  });

  it('should return base value when closed', () => {
    const { result } = renderHook(() => useStackingContext(false, 'popup'));
    expect(result.current).toBe(300);
  });

  it('should update when open changes', () => {
    let open = false;
    const { result, rerender } = renderHook(() => useStackingContext(open, 'overlay'));

    expect(result.current).toBe(200); // closed = base

    open = true;
    rerender();
    expect(result.current).toBe(201); // open = base + 1
  });
});
