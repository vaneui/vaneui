import { renderHook, act } from '@testing-library/react';
import { useControllableState } from '../utils/controllableState';

describe('useControllableState', () => {
  let warnSpy: jest.SpyInstance;
  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('warns when a controlled value changes with no onChange wired (S1)', () => {
    const { result } = renderHook(() =>
      useControllableState({ value: true, defaultValue: false })
    );
    act(() => { result.current[1](false); });
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('no onChange handler is wired')
    );
  });

  it('does not warn when a controlled value has an onChange', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useControllableState({ value: true, defaultValue: false, onChange })
    );
    act(() => { result.current[1](false); });
    expect(onChange).toHaveBeenCalledWith(false);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('updates internal value and does not warn in uncontrolled mode', () => {
    const { result } = renderHook(() =>
      useControllableState<boolean>({ defaultValue: false })
    );
    act(() => { result.current[1](true); });
    expect(result.current[0]).toBe(true);
    expect(warnSpy).not.toHaveBeenCalled();
  });
});
