import '@testing-library/jest-dom';
import { render, fireEvent, act } from '@testing-library/react';

import {
  PopupTrigger,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('PopupTrigger Component Tests', () => {

  describe('Click Trigger (default)', () => {
    it('should open popup on click', () => {
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger popup={<div>Popup Content</div>}>
            <button>Open</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      // Initially, popup should not be visible
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();

      // Click to open
      fireEvent.click(getByText('Open'));
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();
      expect(getByText('Popup Content')).toBeInTheDocument();
    });

    it('should toggle popup on repeated clicks', () => {
      jest.useFakeTimers();
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger popup={<div>Popup Content</div>}>
            <button>Toggle</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      // Click to open
      fireEvent.click(getByText('Toggle'));
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();

      // Click to close — popup enters 'exiting' state, still in DOM during transition
      fireEvent.click(getByText('Toggle'));
      // Advance past transition duration (150ms)
      act(() => { jest.advanceTimersByTime(200); });
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();

      jest.useRealTimers();
    });

    it('should call original onClick handler on trigger element', () => {
      const onClick = jest.fn();
      const { getByText } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger popup={<div>Content</div>}>
            <button onClick={onClick}>Trigger</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      fireEvent.click(getByText('Trigger'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Hover Trigger', () => {
    it('should open popup on mouse enter', () => {
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="hover" popup={<div>Tooltip</div>}>
            <button>Hover me</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      fireEvent.mouseEnter(getByText('Hover me'));
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();
    });

    it('should close popup on mouse leave after delay', async () => {
      jest.useFakeTimers();
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="hover" closeDelay={100} popup={<div>Tooltip</div>}>
            <button>Hover me</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      fireEvent.mouseEnter(getByText('Hover me'));
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();

      fireEvent.mouseLeave(getByText('Hover me'));
      // Still visible during close delay
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();

      // Advance past close delay — triggers setOpen(false)
      act(() => { jest.advanceTimersByTime(100); });
      // Now in 'exiting' transition state — advance past transition duration
      act(() => { jest.advanceTimersByTime(200); });
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();

      jest.useRealTimers();
    });

    it('should respect openDelay', () => {
      jest.useFakeTimers();
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="hover" openDelay={200} popup={<div>Tooltip</div>}>
            <button>Hover me</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      fireEvent.mouseEnter(getByText('Hover me'));
      // Not yet visible
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();

      // After delay
      act(() => { jest.advanceTimersByTime(200); });
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();

      jest.useRealTimers();
    });
  });

  describe('Focus Trigger', () => {
    it('should open popup on focus', () => {
      const { getByPlaceholderText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="focus" popup={<div>Suggestions</div>}>
            <input placeholder="Search..." />
          </PopupTrigger>
        </ThemeProvider>
      );

      fireEvent.focus(getByPlaceholderText('Search...'));
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();
    });

    it('should close popup on blur', () => {
      jest.useFakeTimers();
      const { getByPlaceholderText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="focus" popup={<div>Suggestions</div>}>
            <input placeholder="Search..." />
          </PopupTrigger>
        </ThemeProvider>
      );

      fireEvent.focus(getByPlaceholderText('Search...'));
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();

      fireEvent.blur(getByPlaceholderText('Search...'));
      // Advance past transition duration (150ms)
      act(() => { jest.advanceTimersByTime(200); });
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();

      jest.useRealTimers();
    });
  });

  describe('Popup Props', () => {
    it('should pass popupProps to Popup component', () => {
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger
            popup={<div>Content</div>}
            popupProps={{ className: 'custom-popup' }}
          >
            <button>Open</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      fireEvent.click(getByText('Open'));
      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveClass('custom-popup');
    });
  });

  describe('Cleanup', () => {
    it('should clean up timers on unmount', () => {
      jest.useFakeTimers();
      const { getByText, unmount } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="hover" openDelay={200} popup={<div>Tooltip</div>}>
            <button>Hover me</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      fireEvent.mouseEnter(getByText('Hover me'));
      // Unmount before timer fires — should not throw
      unmount();
      expect(() => {
        act(() => { jest.advanceTimersByTime(200); });
      }).not.toThrow();

      jest.useRealTimers();
    });
  });
});
