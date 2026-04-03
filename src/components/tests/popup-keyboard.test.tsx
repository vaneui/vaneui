import '@testing-library/jest-dom';
import { render, fireEvent, act } from '@testing-library/react';

import {
  PopupTrigger,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('PopupTrigger Keyboard Accessibility (REC-A11Y-15)', () => {

  describe('Hover-triggered popup opens on focus', () => {
    it('should open popup when hover-triggered element receives focus', () => {
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="hover" popup={<div>Tooltip Content</div>}>
            <button>Hover Target</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      // Initially, popup should not be visible
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();

      // Focus the trigger (keyboard user tabs to it)
      fireEvent.focus(getByText('Hover Target'));
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();
      expect(getByText('Tooltip Content')).toBeInTheDocument();
    });

    it('should respect openDelay when opening via focus', () => {
      jest.useFakeTimers();
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="hover" openDelay={200} popup={<div>Delayed Tooltip</div>}>
            <button>Hover Target</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      fireEvent.focus(getByText('Hover Target'));
      // Not yet visible due to delay
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();

      // After delay
      act(() => { jest.advanceTimersByTime(200); });
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();

      jest.useRealTimers();
    });
  });

  describe('Hover-triggered popup closes on blur', () => {
    it('should close popup when hover-triggered element loses focus', () => {
      jest.useFakeTimers();
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="hover" closeDelay={100} popup={<div>Tooltip Content</div>}>
            <button>Hover Target</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      // Open via focus
      fireEvent.focus(getByText('Hover Target'));
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();

      // Blur the trigger (keyboard user tabs away)
      fireEvent.blur(getByText('Hover Target'));
      // Still visible during close delay
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();

      // Advance past close delay
      act(() => { jest.advanceTimersByTime(100); });
      // Advance past transition duration
      act(() => { jest.advanceTimersByTime(200); });
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();

      jest.useRealTimers();
    });
  });

  describe('Click-triggered popup is unaffected', () => {
    it('should not open on focus when trigger is click', () => {
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="click" popup={<div>Click Popup</div>}>
            <button>Click Target</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      // Focus should not open the popup
      fireEvent.focus(getByText('Click Target'));
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();

      // Only click should open it
      fireEvent.click(getByText('Click Target'));
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();
    });

    it('should not close on blur when trigger is click', () => {
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="click" popup={<div>Click Popup</div>}>
            <button>Click Target</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      // Open via click
      fireEvent.click(getByText('Click Target'));
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();

      // Blur should not close it
      fireEvent.blur(getByText('Click Target'));
      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();
    });
  });

  describe('Focus-triggered popup still works', () => {
    it('should open on focus when trigger is focus', () => {
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

    it('should close on blur when trigger is focus', () => {
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
      // Advance past transition duration
      act(() => { jest.advanceTimersByTime(200); });
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();

      jest.useRealTimers();
    });
  });

  describe('Disabled hover popup does not open on focus', () => {
    it('should not open on focus when disabled', () => {
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="hover" disabled popup={<div>Tooltip</div>}>
            <button>Disabled Target</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      // Focus should not open the popup when disabled
      fireEvent.focus(getByText('Disabled Target'));
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();
    });

    it('should not open on mouseEnter when disabled', () => {
      const { getByText, baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="hover" disabled popup={<div>Tooltip</div>}>
            <button>Disabled Target</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      // Mouse enter should also not work when disabled
      fireEvent.mouseEnter(getByText('Disabled Target'));
      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();
    });

    it('should not set aria-expanded when disabled', () => {
      const { getByText } = render(
        <ThemeProvider theme={defaultTheme}>
          <PopupTrigger trigger="hover" disabled popup={<div>Tooltip</div>}>
            <button>Disabled Target</button>
          </PopupTrigger>
        </ThemeProvider>
      );

      const trigger = getByText('Disabled Target');
      expect(trigger).not.toHaveAttribute('aria-expanded');
      expect(trigger).not.toHaveAttribute('aria-haspopup');
    });
  });
});
