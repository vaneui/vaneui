import '@testing-library/jest-dom';
import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import {
  Popup,
  PopupTrigger,
  Button,
  ThemeProvider,
  defaultTheme,
} from '../../index';

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
let intersectionCallback: IntersectionObserverCallback;

beforeAll(() => {
  global.IntersectionObserver = jest.fn((callback) => {
    intersectionCallback = callback;
    return {
      observe: mockObserve,
      disconnect: mockDisconnect,
      unobserve: jest.fn(),
      takeRecords: jest.fn().mockReturnValue([]),
      root: null,
      rootMargin: '',
      thresholds: [],
    };
  }) as unknown as typeof IntersectionObserver;
});

beforeEach(() => {
  mockObserve.mockClear();
  mockDisconnect.mockClear();
});

describe('Popup Enhancements', () => {
  describe('disabled prop', () => {
    it('should not render popup content when disabled', () => {
      const anchorRef = React.createRef<HTMLButtonElement>();

      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open anchorRef={anchorRef} disabled portal={false}>
            Popup content
          </Popup>
        </ThemeProvider>
      );

      // Popup should not be visible when disabled even if open=true
      expect(baseElement.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    });

    it('should render popup when not disabled', () => {
      const anchorRef = React.createRef<HTMLButtonElement>();

      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open anchorRef={anchorRef} portal={false}>
            Popup content
          </Popup>
        </ThemeProvider>
      );

      expect(baseElement.querySelector('[role="dialog"]')).toBeInTheDocument();
    });

    it('should not leak disabled prop to DOM', () => {
      const anchorRef = React.createRef<HTMLButtonElement>();

      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open anchorRef={anchorRef} disabled={false} portal={false}>
            Content
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('[role="dialog"]');
      expect(popup).not.toHaveAttribute('disabled');
    });

    it('PopupTrigger should not fire events when disabled', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger popup={<div>Popup</div>} disabled>
            <Button>Click me</Button>
          </PopupTrigger>
        </ThemeProvider>
      );

      const button = container.querySelector('button')!;
      fireEvent.click(button);

      // No aria-expanded should be set when disabled
      expect(button).not.toHaveAttribute('aria-expanded');
    });

    it('PopupTrigger should remove ARIA attrs when disabled', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger popup={<div>Popup</div>} disabled>
            <Button>Click me</Button>
          </PopupTrigger>
        </ThemeProvider>
      );

      const button = container.querySelector('button')!;
      expect(button).not.toHaveAttribute('aria-haspopup');
    });
  });

  describe('transition lifecycle callbacks', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should call onEnterComplete after open transition', () => {
      const anchorRef = React.createRef<HTMLButtonElement>();
      const onEnterComplete = jest.fn();

      const { rerender } = render(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open={false} anchorRef={anchorRef} portal={false} onEnterComplete={onEnterComplete}>
            Content
          </Popup>
        </ThemeProvider>
      );

      expect(onEnterComplete).not.toHaveBeenCalled();

      rerender(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open anchorRef={anchorRef} portal={false} onEnterComplete={onEnterComplete}>
            Content
          </Popup>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(onEnterComplete).toHaveBeenCalledTimes(1);
    });

    it('should call onExitComplete after close transition', () => {
      const anchorRef = React.createRef<HTMLButtonElement>();
      const onExitComplete = jest.fn();

      const { rerender } = render(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open anchorRef={anchorRef} portal={false} onExitComplete={onExitComplete}>
            Content
          </Popup>
        </ThemeProvider>
      );

      rerender(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open={false} anchorRef={anchorRef} portal={false} onExitComplete={onExitComplete}>
            Content
          </Popup>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(onExitComplete).toHaveBeenCalledTimes(1);
    });
  });

  describe('hideWhenDetached', () => {
    it('should create IntersectionObserver when enabled and open', () => {
      const anchorRef = React.createRef<HTMLButtonElement>();

      render(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open anchorRef={anchorRef} hideWhenDetached portal={false}>
            Content
          </Popup>
        </ThemeProvider>
      );

      expect(global.IntersectionObserver).toHaveBeenCalled();
      expect(mockObserve).toHaveBeenCalled();
    });

    it('should not create IntersectionObserver when disabled', () => {
      const anchorRef = React.createRef<HTMLButtonElement>();
      (global.IntersectionObserver as jest.Mock).mockClear();

      render(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open anchorRef={anchorRef} hideWhenDetached={false} portal={false}>
            Content
          </Popup>
        </ThemeProvider>
      );

      expect(global.IntersectionObserver).not.toHaveBeenCalled();
    });

    it('should hide popup when anchor leaves viewport', () => {
      const anchorRef = React.createRef<HTMLButtonElement>();

      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open anchorRef={anchorRef} hideWhenDetached portal={false}>
            Content
          </Popup>
        </ThemeProvider>
      );

      // Simulate anchor leaving viewport
      act(() => {
        intersectionCallback(
          [{ isIntersecting: false } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );
      });

      const popup = baseElement.querySelector('[role="dialog"]') as HTMLElement;
      expect(popup.style.visibility).toBe('hidden');
      // pointerEvents: 'none' is now handled via the pointerEventsNone boolean prop
      expect(popup).toHaveClass('pointer-events-none');
    });

    it('should show popup when anchor re-enters viewport', () => {
      const anchorRef = React.createRef<HTMLButtonElement>();

      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open anchorRef={anchorRef} hideWhenDetached portal={false}>
            Content
          </Popup>
        </ThemeProvider>
      );

      // Simulate anchor leaving viewport
      act(() => {
        intersectionCallback(
          [{ isIntersecting: false } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );
      });

      // Simulate anchor re-entering viewport
      act(() => {
        intersectionCallback(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );
      });

      const popup = baseElement.querySelector('[role="dialog"]') as HTMLElement;
      expect(popup.style.visibility).not.toBe('hidden');
    });

    it('should disconnect observer on unmount', () => {
      const anchorRef = React.createRef<HTMLButtonElement>();

      const { unmount } = render(
        <ThemeProvider theme={defaultTheme}>
          <button ref={anchorRef}>Anchor</button>
          <Popup open anchorRef={anchorRef} hideWhenDetached portal={false}>
            Content
          </Popup>
        </ThemeProvider>
      );

      unmount();
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });
});
