import '@testing-library/jest-dom';
import { createRef, type ReactElement } from 'react';
import { render } from '@testing-library/react';

import { Progress, ThemeProvider, defaultTheme } from '../../index';

const renderProgress = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

const getBar = (container: HTMLElement) => container.querySelector('.vane-progress') as HTMLElement;

describe('Progress Component Tests', () => {
  describe('Basic Rendering', () => {
    it('should render one progressbar div with the default theme', () => {
      const { container } = renderProgress(<Progress value={40} aria-label="Upload" />);
      const bar = getBar(container);
      expect(bar).toBeInTheDocument();
      expect(bar.tagName).toBe('DIV');
      expect(bar).toHaveAttribute('role', 'progressbar');
      expect(bar).toHaveAttribute('data-vane-type', 'ui');
      expect(bar.childElementCount).toBe(0);
    });

    it('should expose the range and current value to assistive tech', () => {
      const { container } = renderProgress(<Progress value={40} aria-label="Upload" />);
      const bar = getBar(container);
      expect(bar).toHaveAttribute('aria-valuemin', '0');
      expect(bar).toHaveAttribute('aria-valuemax', '100');
      expect(bar).toHaveAttribute('aria-valuenow', '40');
    });

    it('should set the fill ratio as the --progress variable', () => {
      const { container } = renderProgress(<Progress value={40} aria-label="Upload" />);
      expect(getBar(container).style.getPropertyValue('--progress')).toBe('0.4');
    });

    it('should apply the default size, appearance, variant, shape, width and margin', () => {
      const { container } = renderProgress(<Progress value={40} aria-label="Upload" />);
      const bar = getBar(container);
      expect(bar).toHaveAttribute('data-size', 'md');
      expect(bar).toHaveAttribute('data-appearance', 'primary');
      expect(bar).toHaveAttribute('data-variant', 'outline');
      expect(bar).toHaveClass('rounded-full', 'w-full', 'm-0');
    });
  });

  describe('Value range', () => {
    it('should use a custom max', () => {
      const { container } = renderProgress(<Progress value={3} max={8} aria-label="Steps" />);
      const bar = getBar(container);
      expect(bar).toHaveAttribute('aria-valuemax', '8');
      expect(bar).toHaveAttribute('aria-valuenow', '3');
      expect(bar.style.getPropertyValue('--progress')).toBe('0.375');
    });

    it('should clamp a negative value to 0', () => {
      const { container } = renderProgress(<Progress value={-20} aria-label="Upload" />);
      const bar = getBar(container);
      expect(bar).toHaveAttribute('aria-valuenow', '0');
      expect(bar.style.getPropertyValue('--progress')).toBe('0');
    });

    it('should clamp a value above max to max', () => {
      const { container } = renderProgress(<Progress value={150} aria-label="Upload" />);
      const bar = getBar(container);
      expect(bar).toHaveAttribute('aria-valuenow', '100');
      expect(bar.style.getPropertyValue('--progress')).toBe('1');
    });

    it('should treat max = 0 as an empty bar', () => {
      const { container } = renderProgress(<Progress value={5} max={0} aria-label="Upload" />);
      const bar = getBar(container);
      expect(bar).toHaveAttribute('aria-valuemax', '0');
      expect(bar).toHaveAttribute('aria-valuenow', '0');
      expect(bar.style.getPropertyValue('--progress')).toBe('0');
    });

    it('should treat a negative max as an empty bar', () => {
      const { container } = renderProgress(<Progress value={5} max={-10} aria-label="Upload" />);
      const bar = getBar(container);
      expect(bar).toHaveAttribute('aria-valuemax', '0');
      expect(bar.style.getPropertyValue('--progress')).toBe('0');
    });
  });

  describe('Size, appearance and shape', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('should render %s size', (size) => {
      const { container } = renderProgress(<Progress value={50} {...{ [size]: true }} aria-label="Upload" />);
      expect(getBar(container)).toHaveAttribute('data-size', size);
    });

    it.each(['primary', 'accent', 'secondary', 'success', 'danger', 'warning', 'info'] as const)(
      'should render %s appearance',
      (appearance) => {
        const { container } = renderProgress(<Progress value={50} {...{ [appearance]: true }} aria-label="Upload" />);
        expect(getBar(container)).toHaveAttribute('data-appearance', appearance);
      }
    );

    it('should switch the variant', () => {
      const { container } = renderProgress(<Progress value={50} filled aria-label="Upload" />);
      expect(getBar(container)).toHaveAttribute('data-variant', 'filled');
    });

    it.each([
      ['pill', 'rounded-full'],
      ['rounded', 'rounded-(--br)'],
      ['sharp', 'rounded-none'],
    ] as const)('should render %s shape', (shape, cls) => {
      const { container } = renderProgress(<Progress value={50} {...{ [shape]: true }} aria-label="Upload" />);
      expect(getBar(container)).toHaveClass(cls);
    });

    it('should apply width, flex, hide and margin props', () => {
      const { container } = renderProgress(
        <Progress value={50} wFit flex1 mobileHide marginY aria-label="Upload" />
      );
      const bar = getBar(container);
      expect(bar).toHaveClass('w-fit', 'flex-1', 'max-mobile:hidden', 'my-(--margin)');
      expect(bar).not.toHaveClass('w-full');
    });
  });

  describe('Props and attributes', () => {
    it('should forward ref', () => {
      const ref = createRef<HTMLDivElement>();
      renderProgress(<Progress ref={ref} value={10} aria-label="Upload" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should not leak value, max or boolean props to the DOM', () => {
      const { container } = renderProgress(
        <Progress value={3} max={8} accent lg filled sharp flex1 aria-label="Upload" />
      );
      const bar = getBar(container);
      for (const attr of ['value', 'max', 'accent', 'lg', 'filled', 'sharp', 'flex1']) {
        expect(bar.hasAttribute(attr)).toBe(false);
      }
    });

    it('should pass through HTML attributes', () => {
      const { container } = renderProgress(
        <Progress value={10} aria-label="Upload" aria-valuetext="10 of 100 files" data-testid="bar" id="upload" />
      );
      const bar = getBar(container);
      expect(bar).toHaveAttribute('aria-label', 'Upload');
      expect(bar).toHaveAttribute('aria-valuetext', '10 of 100 files');
      expect(bar).toHaveAttribute('data-testid', 'bar');
      expect(bar).toHaveAttribute('id', 'upload');
    });

    it('should merge a custom className', () => {
      const { container } = renderProgress(<Progress value={10} className="custom-progress" aria-label="Upload" />);
      const bar = getBar(container);
      expect(bar).toHaveClass('custom-progress', 'vane-progress');
    });

    it('should merge a user style with --progress', () => {
      const { container } = renderProgress(
        <Progress value={25} style={{ opacity: 0.5 }} aria-label="Upload" />
      );
      const bar = getBar(container);
      expect(bar.style.opacity).toBe('0.5');
      expect(bar.style.getPropertyValue('--progress')).toBe('0.25');
    });

    it('should render a custom tag', () => {
      const { container } = renderProgress(<Progress tag="span" value={10} aria-label="Upload" />);
      expect(getBar(container).tagName).toBe('SPAN');
    });
  });
});
