import '@testing-library/jest-dom';
import { createRef, type ReactElement } from 'react';
import { render } from '@testing-library/react';

import { Spinner, ThemeProvider, defaultTheme } from '../../index';

const renderSpinner = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

describe('Spinner Component Tests', () => {
  describe('Basic Rendering', () => {
    it('should render with default theme classes', () => {
      const { container } = renderSpinner(<Spinner aria-label="Loading" />);
      const spinner = container.querySelector('.vane-spinner');
      expect(spinner).toBeInTheDocument();
      expect(spinner!.tagName).toBe('SPAN');
      expect(spinner).toHaveClass('inline-block');
      expect(spinner).toHaveAttribute('data-size', 'md');
    });

    it('should be a live region so the busy state is perceivable', () => {
      const { container } = renderSpinner(<Spinner aria-label="Loading" />);
      expect(container.querySelector('.vane-spinner')).toHaveAttribute('role', 'status');
    });

    it('should keep a consumer-supplied accessible name', () => {
      const { getByLabelText } = renderSpinner(<Spinner aria-label="Saving" />);
      expect(getByLabelText('Saving')).toBeInTheDocument();
    });

    it('should forward ref', () => {
      const ref = createRef<HTMLSpanElement>();
      renderSpinner(<Spinner ref={ref} aria-label="Loading" />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('should merge a custom className', () => {
      const { container } = renderSpinner(<Spinner className="custom-spinner" aria-label="Loading" />);
      expect(container.querySelector('.vane-spinner')).toHaveClass('custom-spinner');
    });
  });

  describe('Size and appearance', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('should render %s size', (size) => {
      const { container } = renderSpinner(<Spinner {...{ [size]: true }} aria-label="Loading" />);
      expect(container.querySelector('.vane-spinner')).toHaveAttribute('data-size', size);
    });

    it('should scale via the font-size variable, since the ring is sized in em', () => {
      const { container } = renderSpinner(<Spinner lg aria-label="Loading" />);
      expect(container.querySelector('.vane-spinner')).toHaveClass('text-(length:--fs)');
    });

    it.each(['primary', 'success', 'danger'] as const)('should render %s appearance', (appearance) => {
      const { container } = renderSpinner(<Spinner {...{ [appearance]: true }} aria-label="Loading" />);
      expect(container.querySelector('.vane-spinner')).toHaveAttribute('data-appearance', appearance);
    });
  });

  describe('Prop leaking', () => {
    it('should not leak boolean theme props to the DOM', () => {
      const { container } = renderSpinner(<Spinner lg danger aria-label="Loading" />);
      const spinner = container.querySelector('.vane-spinner') as HTMLElement;
      expect(spinner.hasAttribute('lg')).toBe(false);
      expect(spinner.hasAttribute('danger')).toBe(false);
    });
  });
});
