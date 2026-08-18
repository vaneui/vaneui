import '@testing-library/jest-dom';
import { createRef, type ReactElement } from 'react';
import { render } from '@testing-library/react';

import { Alert, ThemeProvider, defaultTheme } from '../../index';

const renderAlert = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

describe('Alert Component Tests', () => {
  describe('Basic Rendering', () => {
    it('should render with default theme classes', () => {
      const { container } = renderAlert(<Alert>Heads up</Alert>);
      const alert = container.querySelector('.vane-alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('flex', 'flex-row');
      expect(alert).toHaveAttribute('data-size', 'md');
      expect(alert).toHaveAttribute('data-appearance', 'info');
    });

    it('should forward ref', () => {
      const ref = createRef<HTMLDivElement>();
      renderAlert(<Alert ref={ref}>Heads up</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should merge a custom className', () => {
      const { container } = renderAlert(<Alert className="custom-alert">Heads up</Alert>);
      expect(container.querySelector('.vane-alert')).toHaveClass('custom-alert');
    });

    it('should pass through HTML attributes', () => {
      const { container } = renderAlert(<Alert data-testid="a" id="my-alert">Heads up</Alert>);
      expect(container.querySelector('#my-alert')).toBeInTheDocument();
    });
  });

  describe('Live region semantics', () => {
    it('should interrupt by default', () => {
      const { container } = renderAlert(<Alert>Something broke</Alert>);
      expect(container.querySelector('.vane-alert')).toHaveAttribute('role', 'alert');
    });

    it('should announce politely when asked', () => {
      const { container } = renderAlert(<Alert polite>Saved</Alert>);
      expect(container.querySelector('.vane-alert')).toHaveAttribute('role', 'status');
    });

    it('should not leak the polite prop to the DOM', () => {
      const { container } = renderAlert(<Alert polite>Saved</Alert>);
      expect(container.querySelector('.vane-alert')!.hasAttribute('polite')).toBe(false);
    });
  });

  describe('Appearance and size', () => {
    it.each(['success', 'danger', 'warning', 'info'] as const)('should render %s appearance', (appearance) => {
      const { container } = renderAlert(<Alert {...{ [appearance]: true }}>Message</Alert>);
      expect(container.querySelector('.vane-alert')).toHaveAttribute('data-appearance', appearance);
    });

    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('should render %s size', (size) => {
      const { container } = renderAlert(<Alert {...{ [size]: true }}>Message</Alert>);
      expect(container.querySelector('.vane-alert')).toHaveAttribute('data-size', size);
    });

    it('should render filled variant', () => {
      const { container } = renderAlert(<Alert filled>Message</Alert>);
      expect(container.querySelector('.vane-alert')).toHaveAttribute('data-variant', 'filled');
    });

    it('should ramp padding responsively by default', () => {
      const { container } = renderAlert(<Alert>Message</Alert>);
      const alert = container.querySelector('.vane-alert');
      expect(alert).toHaveAttribute('data-responsive', '');
      expect(alert).toHaveClass('max-mobile:px-(--px-mobile)');
    });
  });

  describe('Prop leaking', () => {
    it('should not leak boolean theme props to the DOM', () => {
      const { container } = renderAlert(<Alert danger filled lg>Message</Alert>);
      const alert = container.querySelector('.vane-alert') as HTMLElement;
      expect(alert.hasAttribute('danger')).toBe(false);
      expect(alert.hasAttribute('filled')).toBe(false);
      expect(alert.hasAttribute('lg')).toBe(false);
    });
  });
});
