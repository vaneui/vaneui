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

  it('should reset the counter when the last open element unmounts', () => {
    const { unmount: unmountFirst } = renderHook(() => useStackingContext(true, 'overlay'));
    // openCount is 1, stackCounter is 1

    unmountFirst();
    // last open element closed, so stackCounter resets to 0

    const { result } = renderHook(() => useStackingContext(true, 'overlay'));
    // Should be 200 + 1 = 201 (counter reset to 0, then incremented)
    expect(result.current).toBe(201);
  });

  it('should return base value when closed', () => {
    const { result } = renderHook(() => useStackingContext(false, 'popup'));
    expect(result.current).toBe(300);
  });

  it('should give a newly opened element a higher z-index than a still-open one (open A → open B → close A → open C)', () => {
    const { unmount: closeA } = renderHook(() => useStackingContext(true, 'popup'));
    const { result: b } = renderHook(() => useStackingContext(true, 'popup'));
    expect(b.current).toBe(302);

    // closing A must not let the next element collide with (or undercut) B
    closeA();
    const { result: c } = renderHook(() => useStackingContext(true, 'popup'));

    expect(c.current).toBeGreaterThan(b.current);
    expect(c.current).toBe(303);
  });

  it('should reset the counter only when every element has closed', () => {
    const { unmount: closeA } = renderHook(() => useStackingContext(true, 'overlay'));
    const { result: b, unmount: closeB } = renderHook(() => useStackingContext(true, 'overlay'));
    expect(b.current).toBe(202);

    // B still open — counter must stay monotonic
    closeA();
    const { result: c, unmount: closeC } = renderHook(() => useStackingContext(true, 'overlay'));
    expect(c.current).toBe(203);

    // everything closed — counter resets so values don't grow unbounded
    closeB();
    closeC();
    const { result: fresh } = renderHook(() => useStackingContext(true, 'overlay'));
    expect(fresh.current).toBe(201);
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
