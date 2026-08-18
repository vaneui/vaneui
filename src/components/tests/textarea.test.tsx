import '@testing-library/jest-dom';
import { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  Textarea,
  ThemeProvider,
  defaultTheme
} from '../../index';
import { RING_WIDTH_CLASS, RING_INSET_CLASS, BORDER_WIDTH_CLASS, FONT_SIZE_CLASS } from './utils/classAssertions';

const renderTextarea = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

describe('Textarea Component Tests', () => {

  describe('Basic Textarea Rendering', () => {
    it('should render as textarea tag with default classes', () => {
      const {container} = renderTextarea(<Textarea placeholder="Test textarea" />);

      const el = container.querySelector('textarea');
      expect(el).toBeInTheDocument();
      expect(el).toHaveClass('w-full', 'transition-all', 'duration-(--transition-duration)', 'ease-(--transition-timing)');
      expect(el).toHaveClass(FONT_SIZE_CLASS); // md size
      expect(el).toHaveClass('px-(--px)', 'py-(--py)'); // padding
      expect(el).toHaveClass('font-sans', 'font-normal'); // typography
      expect(el).toHaveClass('rounded-(--br)'); // rounded
      expect(el).toHaveClass('vane-textarea');
      expect(el).toHaveAttribute('placeholder', 'Test textarea');
    });

    it('should render with default appearance classes', () => {
      const {container} = renderTextarea(<Textarea />);

      const el = container.querySelector('textarea');
      expect(el).toHaveClass('bg-(--bg-color)');
      expect(el).toHaveClass('text-(--text-color)');
    });

    it('should render with ring classes by default (but not border)', () => {
      const {container} = renderTextarea(<Textarea />);

      const el = container.querySelector('textarea');
      expect(el).not.toHaveClass(BORDER_WIDTH_CLASS);
      expect(el).toHaveClass(RING_WIDTH_CLASS, RING_INSET_CLASS);
      expect(el).toHaveClass('ring-(--ring-color)');
    });

    it('should render with focus-visible support by default', () => {
      const {container} = renderTextarea(<Textarea />);

      const el = container.querySelector('textarea');
      expect(el).toHaveClass('focus-visible:outline-2', 'focus-visible:outline-offset-2');
      expect(el).toHaveClass('focus-visible:outline-(--focus-color)');
    });

    it('should emit the default data attributes', () => {
      const {container} = renderTextarea(<Textarea />);

      const el = container.querySelector('textarea') as HTMLElement;
      expect(el.getAttribute('data-size')).toBe('md');
      expect(el.getAttribute('data-appearance')).toBe('primary');
      expect(el.getAttribute('data-variant')).toBe('outline');
      expect(el.getAttribute('data-vane-type')).toBe('ui');
    });
  });

  describe('Textarea Sizes', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('should emit data-size for %s', (size) => {
      const props = { [size]: true };
      const {container} = renderTextarea(<Textarea {...props} />);

      expect(container.querySelector('textarea')?.getAttribute('data-size')).toBe(size);
    });
  });

  describe('Textarea Appearances', () => {
    it.each(['primary', 'secondary', 'success', 'danger', 'warning', 'info'] as const)(
      'should emit data-appearance for %s',
      (appearance) => {
        const props = { [appearance]: true };
        const {container} = renderTextarea(<Textarea {...props} />);

        expect(container.querySelector('textarea')?.getAttribute('data-appearance')).toBe(appearance);
      }
    );
  });

  describe('Textarea Variants', () => {
    it('should emit data-variant for filled', () => {
      const {container} = renderTextarea(<Textarea filled />);
      expect(container.querySelector('textarea')?.getAttribute('data-variant')).toBe('filled');
    });
  });

  describe('Textarea Validity', () => {
    it('should emit aria-invalid and data-status when invalid is set (not color-only)', () => {
      const {container} = renderTextarea(<Textarea invalid />);

      const el = container.querySelector('textarea');
      expect(el).toHaveAttribute('aria-invalid', 'true');
      expect(el).toHaveAttribute('data-status', 'error');
    });

    it('should paint the danger ring when invalid is set', () => {
      // aria-invalid/data-status come from ComponentTheme, so only this pins the status mapper
      const {container} = renderTextarea(<Textarea invalid />);

      const el = container.querySelector('textarea');
      expect(el).toHaveClass('ring-(--color-border-danger)/30');
      expect(el).toHaveClass('focus-visible:ring-(--color-border-danger)/30');
    });

    it('should not emit aria-invalid or data-status without invalid', () => {
      const {container} = renderTextarea(<Textarea />);

      const el = container.querySelector('textarea');
      expect(el).not.toHaveAttribute('aria-invalid');
      expect(el).not.toHaveAttribute('data-status');
      expect(el).not.toHaveClass('ring-(--color-border-danger)/30');
    });

    it('should respect a consumer-supplied aria-invalid value', () => {
      const {container} = renderTextarea(<Textarea invalid aria-invalid="grammar" />);

      expect(container.querySelector('textarea')).toHaveAttribute('aria-invalid', 'grammar');
    });
  });

  describe('Textarea DOM Contract', () => {
    it('should forward ref to the textarea element', () => {
      const ref = createRef<HTMLTextAreaElement>();
      renderTextarea(<Textarea ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('should not leak boolean props to the DOM', () => {
      const {container} = renderTextarea(<Textarea lg success filled wFull noShadow />);

      const el = container.querySelector('textarea') as HTMLElement;
      for (const leaked of ['lg', 'success', 'filled', 'wFull', 'wfull', 'noShadow', 'noshadow']) {
        expect(el.hasAttribute(leaked)).toBe(false);
      }
    });

    it('should pass through HTML attributes', () => {
      const onChange = jest.fn();
      const {container} = renderTextarea(
        <Textarea
          name="bio"
          rows={5}
          maxLength={200}
          required
          readOnly
          aria-describedby="bio-help"
          data-custom-attr="custom"
          onChange={onChange}
        />
      );

      const el = container.querySelector('textarea') as HTMLTextAreaElement;
      expect(el).toHaveAttribute('name', 'bio');
      expect(el).toHaveAttribute('rows', '5');
      expect(el).toHaveAttribute('maxlength', '200');
      expect(el).toBeRequired();
      expect(el).toHaveAttribute('readonly');
      expect(el).toHaveAttribute('aria-describedby', 'bio-help');
      expect(el).toHaveAttribute('data-custom-attr', 'custom');
    });

    it('should merge a custom className over theme classes', () => {
      const {container} = renderTextarea(<Textarea className="resize-none" />);

      expect(container.querySelector('textarea')).toHaveClass('resize-none');
    });

    it('should support disabled', () => {
      const {container} = renderTextarea(<Textarea disabled />);

      expect(container.querySelector('textarea')).toBeDisabled();
    });

    it('should support a controlled value', () => {
      const {container} = renderTextarea(<Textarea value="hello" onChange={() => {}} />);

      expect((container.querySelector('textarea') as HTMLTextAreaElement).value).toBe('hello');
    });
  });

  describe('Textarea Theme Integration', () => {
    it('should apply themeDefaults from ThemeProvider', () => {
      const {container} = render(
        <ThemeProvider themeDefaults={{ textarea: { lg: true } }}>
          <Textarea />
        </ThemeProvider>
      );

      expect(container.querySelector('textarea')?.getAttribute('data-size')).toBe('lg');
    });

    it('should let an explicit prop win over themeDefaults', () => {
      const {container} = render(
        <ThemeProvider themeDefaults={{ textarea: { lg: true } }}>
          <Textarea xs />
        </ThemeProvider>
      );

      expect(container.querySelector('textarea')?.getAttribute('data-size')).toBe('xs');
    });

    it('should apply extraClasses from ThemeProvider', () => {
      const {container} = render(
        <ThemeProvider extraClasses={{ textarea: { primary: 'custom-primary-class' } }}>
          <Textarea />
        </ThemeProvider>
      );

      expect(container.querySelector('textarea')).toHaveClass('custom-primary-class');
    });
  });
});
