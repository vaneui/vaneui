import '@testing-library/jest-dom';
import { createRef, type ReactElement } from 'react';
import { render } from '@testing-library/react';

import { Progress, ThemeProvider, defaultTheme } from '../../index';

const renderProgress = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

const getBar = (container: HTMLElement) => container.querySelector('.vane-progress') as HTMLElement;
const getFill = (container: HTMLElement) => container.querySelector('.vane-progress-fill') as HTMLElement;

describe('Progress Component Tests', () => {
  describe('Basic Rendering', () => {
    it('should render a progressbar track holding one decorative fill', () => {
      const { container } = renderProgress(<Progress value={40} aria-label="Upload" />);
      const bar = getBar(container);
      expect(bar).toBeInTheDocument();
      expect(bar.tagName).toBe('DIV');
      expect(bar).toHaveAttribute('role', 'progressbar');
      expect(bar).toHaveAttribute('data-vane-type', 'ui');
      expect(bar.childElementCount).toBe(1);
      const fill = getFill(container);
      expect(fill.parentElement).toBe(bar);
      expect(fill).toHaveAttribute('aria-hidden', 'true');
      expect(fill).toHaveAttribute('data-vane-type', 'ui');
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

    it('should style the track with its default props', () => {
      const { container } = renderProgress(<Progress value={40} aria-label="Upload" />);
      const bar = getBar(container);
      expect(bar).toHaveAttribute('data-size', 'md');
      expect(bar).toHaveAttribute('data-appearance', 'primary');
      expect(bar).toHaveClass('h-(--size)', 'bg-(--color-border-primary)', 'overflow-hidden', 'rounded-full', 'w-full', 'm-0');
    });

    it('should style the fill with its default props: filled, full size, transition', () => {
      const { container } = renderProgress(<Progress value={40} aria-label="Upload" />);
      const fill = getFill(container);
      expect(fill).toHaveAttribute('data-appearance', 'primary');
      expect(fill).toHaveAttribute('data-variant', 'filled');
      expect(fill).toHaveClass('bg-(--bg-color)', 'w-full', 'h-full', 'rounded-full', 'transition');
    });

    it('should slide the fill in by the unfilled share, from the end in RTL', () => {
      const { container } = renderProgress(<Progress value={40} aria-label="Upload" />);
      expect(getFill(container)).toHaveClass(
        '-translate-x-[calc(100%_-_var(--progress,0)_*_100%)]',
        'rtl:translate-x-[calc(100%_-_var(--progress,0)_*_100%)]'
      );
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
      'should pass %s appearance to the fill',
      (appearance) => {
        const { container } = renderProgress(<Progress value={50} {...{ [appearance]: true }} aria-label="Upload" />);
        expect(getBar(container)).toHaveAttribute('data-appearance', appearance);
        expect(getFill(container)).toHaveAttribute('data-appearance', appearance);
        expect(getFill(container)).toHaveAttribute('data-variant', 'filled');
      }
    );

    it('should pass noTransition to the fill', () => {
      const { container } = renderProgress(<Progress value={50} noTransition aria-label="Upload" />);
      expect(getFill(container)).toHaveClass('transition-none');
    });

    it('should let a progress.fill theme default restyle the fill', () => {
      const { container } = render(
        <ThemeProvider themeDefaults={{ progress: { fill: { primary: false, success: true, noTransition: true } } }}>
          <Progress value={50} aria-label="Upload" />
        </ThemeProvider>
      );
      expect(getFill(container)).toHaveAttribute('data-appearance', 'success');
      expect(getFill(container)).toHaveClass('transition-none');
    });

    it('should still let an explicit prop win over a progress.fill theme default', () => {
      const { container } = render(
        <ThemeProvider themeDefaults={{ progress: { fill: { primary: false, success: true } } }}>
          <Progress value={50} danger aria-label="Upload" />
        </ThemeProvider>
      );
      expect(getFill(container)).toHaveAttribute('data-appearance', 'danger');
    });

    it.each([
      ['pill', 'rounded-full'],
      ['rounded', 'rounded-(--br)'],
      ['sharp', 'rounded-none'],
    ] as const)('should render %s shape on the track and the fill', (shape, cls) => {
      const { container } = renderProgress(<Progress value={50} {...{ [shape]: true }} aria-label="Upload" />);
      expect(getBar(container)).toHaveClass(cls);
      expect(getFill(container)).toHaveClass(cls);
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
        <Progress value={3} max={8} accent lg sharp noTransition flex1 aria-label="Upload" />
      );
      for (const el of [getBar(container), getFill(container)]) {
        for (const attr of ['value', 'max', 'accent', 'lg', 'sharp', 'noTransition', 'flex1']) {
          expect(el.hasAttribute(attr)).toBe(false);
        }
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
