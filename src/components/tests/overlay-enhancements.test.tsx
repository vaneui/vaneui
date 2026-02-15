import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import {
  Overlay,
  ThemeProvider,
  defaultTheme,
} from '../../index';

describe('Overlay Enhancements', () => {
  describe('transition lifecycle callbacks', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should call onEnterComplete after open transition', () => {
      const onEnterComplete = jest.fn();

      const { rerender } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay open={false} portal={false} onEnterComplete={onEnterComplete}>
            Content
          </Overlay>
        </ThemeProvider>
      );

      expect(onEnterComplete).not.toHaveBeenCalled();

      rerender(
        <ThemeProvider theme={defaultTheme}>
          <Overlay open portal={false} onEnterComplete={onEnterComplete}>
            Content
          </Overlay>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(onEnterComplete).toHaveBeenCalledTimes(1);
    });

    it('should call onExitComplete after close transition', () => {
      const onExitComplete = jest.fn();

      const { rerender } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay open portal={false} onExitComplete={onExitComplete}>
            Content
          </Overlay>
        </ThemeProvider>
      );

      expect(onExitComplete).not.toHaveBeenCalled();

      rerender(
        <ThemeProvider theme={defaultTheme}>
          <Overlay open={false} portal={false} onExitComplete={onExitComplete}>
            Content
          </Overlay>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(onExitComplete).toHaveBeenCalledTimes(1);
    });

    it('should not call callbacks on initial mount', () => {
      const onEnterComplete = jest.fn();
      const onExitComplete = jest.fn();

      render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay open portal={false} onEnterComplete={onEnterComplete} onExitComplete={onExitComplete}>
            Content
          </Overlay>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(onEnterComplete).not.toHaveBeenCalled();
      expect(onExitComplete).not.toHaveBeenCalled();
    });
  });
});
