import '@testing-library/jest-dom';
import { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  Select,
  ThemeProvider,
  defaultTheme
} from '../../index';
import { RING_WIDTH_CLASS, RING_INSET_CLASS, BORDER_WIDTH_CLASS, FONT_SIZE_CLASS } from './utils/classAssertions';

const renderSelect = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

describe('Select Component Tests', () => {

  describe('Basic Select Rendering', () => {
    it('should render as select tag with default classes', () => {
      const {container} = renderSelect(<Select />);

      const el = container.querySelector('select');
      expect(el).toBeInTheDocument();
      expect(el).toHaveClass('w-full', 'transition-all', 'duration-(--transition-duration)', 'ease-(--transition-timing)');
      expect(el).toHaveClass(FONT_SIZE_CLASS); // md size
      expect(el).toHaveClass('px-(--px)', 'py-(--py)'); // padding
      expect(el).toHaveClass('font-sans', 'font-normal'); // typography
      expect(el).toHaveClass('rounded-(--br)'); // rounded
      expect(el).toHaveClass('vane-select');
      expect(el).toHaveClass('appearance-none'); // native arrow suppressed for the themed chevron
      expect(el).toHaveClass('cursor-pointer');
    });

    it('should render with default appearance classes', () => {
      const {container} = renderSelect(<Select />);

      const el = container.querySelector('select');
      expect(el).toHaveClass('bg-(--bg-color)');
      expect(el).toHaveClass('text-(--text-color)');
    });

    it('should render with ring classes by default (but not border)', () => {
      const {container} = renderSelect(<Select />);

      const el = container.querySelector('select');
      expect(el).not.toHaveClass(BORDER_WIDTH_CLASS);
      expect(el).toHaveClass(RING_WIDTH_CLASS, RING_INSET_CLASS);
      expect(el).toHaveClass('ring-(--ring-color)');
    });

    it('should render with focus-visible support by default', () => {
      const {container} = renderSelect(<Select />);

      const el = container.querySelector('select');
      expect(el).toHaveClass('focus-visible:outline-2', 'focus-visible:outline-offset-2');
      expect(el).toHaveClass('focus-visible:outline-(--focus-color)');
    });

    it('should emit the default data attributes', () => {
      const {container} = renderSelect(<Select />);

      const el = container.querySelector('select') as HTMLElement;
      expect(el.getAttribute('data-size')).toBe('md');
      expect(el.getAttribute('data-appearance')).toBe('primary');
      expect(el.getAttribute('data-variant')).toBe('outline');
      expect(el.getAttribute('data-vane-type')).toBe('ui');
    });

    it('should render options passed as children', () => {
      const {container} = renderSelect(
        <Select defaultValue="b">
          <option value="a">Alpha</option>
          <option value="b">Bravo</option>
        </Select>
      );

      const el = container.querySelector('select') as HTMLSelectElement;
      expect(el.querySelectorAll('option')).toHaveLength(2);
      expect(el.value).toBe('b');
    });
  });

  describe('Select Sizes', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('should emit data-size for %s', (size) => {
      const props = { [size]: true };
      const {container} = renderSelect(<Select {...props} />);

      expect(container.querySelector('select')?.getAttribute('data-size')).toBe(size);
      expect(container.querySelector('select')).toHaveClass('px-(--px)', 'py-(--py)');
    });

    it('should size the chevron with the field', () => {
      const {container} = renderSelect(<Select lg />);

      expect(container.querySelector('.vane-select-chevron')?.getAttribute('data-size')).toBe('lg');
    });
  });

  describe('Select Appearances', () => {
    it.each(['primary', 'secondary', 'success', 'danger', 'warning', 'info'] as const)(
      'should emit data-appearance for %s',
      (appearance) => {
        const props = { [appearance]: true };
        const {container} = renderSelect(<Select {...props} />);

        expect(container.querySelector('select')?.getAttribute('data-appearance')).toBe(appearance);
      }
    );
  });

  describe('Select Variants', () => {
    it('should emit data-variant for filled', () => {
      const {container} = renderSelect(<Select filled />);
      expect(container.querySelector('select')?.getAttribute('data-variant')).toBe('filled');
    });

    it('should emit data-variant for ghost', () => {
      const {container} = renderSelect(<Select ghost />);
      expect(container.querySelector('select')?.getAttribute('data-variant')).toBe('ghost');
    });
  });

  describe('Select Shape', () => {
    it('should apply pill radius', () => {
      const {container} = renderSelect(<Select pill />);
      expect(container.querySelector('select')).toHaveClass('rounded-full');
    });

    it('should apply sharp radius', () => {
      const {container} = renderSelect(<Select sharp />);
      expect(container.querySelector('select')).toHaveClass('rounded-none');
    });
  });

  describe('Select Chevron and Wrapper', () => {
    it('should always render the wrapper and a decorative chevron', () => {
      const {container} = renderSelect(<Select />);

      const wrapper = container.querySelector('.vane-select-wrapper') as HTMLElement;
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('relative', 'flex', 'w-full');
      expect(wrapper).toHaveAttribute('data-vane-type', 'ui');
      expect(wrapper.querySelector('select.vane-select')).toBeInTheDocument();

      const chevron = container.querySelector('.vane-select-chevron') as HTMLElement;
      expect(chevron).toBeInTheDocument();
      expect(chevron).toHaveAttribute('aria-hidden', 'true');
      expect(chevron).toHaveClass('pointer-events-none');
      expect(chevron.querySelector('svg')).toBeInTheDocument();
      expect(chevron.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    });

    it('should let a consumer swap the chevron via themeOverride', () => {
      const {container} = render(
        <ThemeProvider
          theme={defaultTheme}
          themeOverride={(t) => {
            t.selectChevron.themes.chevronElement = () => <svg data-testid="custom-chevron" />;
            return t;
          }}
        >
          <Select />
        </ThemeProvider>
      );

      expect(container.querySelector('[data-testid="custom-chevron"]')).toBeInTheDocument();
    });

    it('should let the wrapper be customized via theme.selectWrapper', () => {
      const {container} = render(
        <ThemeProvider
          theme={defaultTheme}
          themeOverride={(t) => {
            t.selectWrapper.defaults = { ...t.selectWrapper.defaults, wFull: false, wFit: true };
            return t;
          }}
        >
          <Select />
        </ThemeProvider>
      );

      expect(container.querySelector('.vane-select-wrapper')).toHaveClass('w-fit');
    });
  });

  describe('Select Validity', () => {
    it('should emit aria-invalid and data-status when invalid is set (not color-only)', () => {
      const {container} = renderSelect(<Select invalid />);

      const el = container.querySelector('select');
      expect(el).toHaveAttribute('aria-invalid', 'true');
      expect(el).toHaveAttribute('data-status', 'error');
      expect(el).toHaveClass('border-(--color-border-danger)');
    });

    it('should not emit aria-invalid or data-status without invalid', () => {
      const {container} = renderSelect(<Select />);

      const el = container.querySelector('select');
      expect(el).not.toHaveAttribute('aria-invalid');
      expect(el).not.toHaveAttribute('data-status');
    });

    it('should respect a consumer-supplied aria-invalid value', () => {
      const {container} = renderSelect(<Select invalid aria-invalid="grammar" />);

      expect(container.querySelector('select')).toHaveAttribute('aria-invalid', 'grammar');
    });
  });

  describe('Select DOM Contract', () => {
    it('should forward ref to the select element, not the wrapper', () => {
      const ref = createRef<HTMLSelectElement>();
      renderSelect(<Select ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });

    it('should not leak boolean props to the DOM', () => {
      const {container} = renderSelect(<Select lg success filled wFull noShadow cursorPointer />);

      const el = container.querySelector('select') as HTMLElement;
      for (const leaked of ['lg', 'success', 'filled', 'wFull', 'wfull', 'noShadow', 'noshadow', 'cursorPointer', 'cursorpointer']) {
        expect(el.hasAttribute(leaked)).toBe(false);
      }
    });

    it('should pass through HTML attributes', () => {
      const onChange = jest.fn();
      const {container} = renderSelect(
        <Select
          name="country"
          id="country-select"
          required
          multiple
          size={4}
          aria-describedby="country-help"
          data-custom-attr="custom"
          onChange={onChange}
        >
          <option value="cy">Cyprus</option>
        </Select>
      );

      const el = container.querySelector('select') as HTMLSelectElement;
      expect(el).toHaveAttribute('name', 'country');
      expect(el).toHaveAttribute('id', 'country-select');
      expect(el).toBeRequired();
      expect(el).toHaveAttribute('multiple');
      expect(el).toHaveAttribute('size', '4');
      expect(el).toHaveAttribute('aria-describedby', 'country-help');
      expect(el).toHaveAttribute('data-custom-attr', 'custom');
    });

    it('should merge a custom className onto the wrapper, not the field', () => {
      // width sizes the whole control: on the field alone the wrapper would stay
      // full width and the absolutely-positioned chevron would detach from the field
      const {container} = renderSelect(<Select className="max-w-xs" />);

      const wrapper = container.querySelector('.vane-select-wrapper');
      expect(wrapper).toHaveClass('max-w-xs');
      expect(container.querySelector('select')).toHaveClass('w-full');
    });

    it('should route width and hide props to the wrapper so the chevron tracks the field', () => {
      const {container} = renderSelect(<Select wFit mobileHide />);

      const wrapper = container.querySelector('.vane-select-wrapper');
      expect(wrapper).toHaveClass('w-fit');
      expect(wrapper).toHaveClass('max-mobile:hidden');
    });

    it('should dim the chevron along with the field when disabled', () => {
      const {container} = renderSelect(<Select disabled />);

      // the chevron is a sibling of the field, so dimming only the field would leave it bright
      expect(container.querySelector('.vane-select-wrapper')).toHaveClass('opacity-50');
    });

    it('should support disabled', () => {
      const {container} = renderSelect(<Select disabled />);

      const el = container.querySelector('select');
      expect(el).toBeDisabled();
      expect(el).toHaveAttribute('data-disabled', 'true');
    });

    it('should support a controlled value', () => {
      const {container} = renderSelect(
        <Select value="b" onChange={() => {}}>
          <option value="a">Alpha</option>
          <option value="b">Bravo</option>
        </Select>
      );

      expect((container.querySelector('select') as HTMLSelectElement).value).toBe('b');
    });
  });

  describe('Select Theme Integration', () => {
    it('should apply themeDefaults from ThemeProvider', () => {
      const {container} = render(
        <ThemeProvider themeDefaults={{ select: { lg: true } }}>
          <Select />
        </ThemeProvider>
      );

      expect(container.querySelector('select')?.getAttribute('data-size')).toBe('lg');
    });

    it('should let an explicit prop win over themeDefaults', () => {
      const {container} = render(
        <ThemeProvider themeDefaults={{ select: { lg: true } }}>
          <Select xs />
        </ThemeProvider>
      );

      expect(container.querySelector('select')?.getAttribute('data-size')).toBe('xs');
    });

    it('should apply extraClasses from ThemeProvider', () => {
      const {container} = render(
        <ThemeProvider extraClasses={{ select: { primary: 'custom-primary-class' } }}>
          <Select />
        </ThemeProvider>
      );

      expect(container.querySelector('select')).toHaveClass('custom-primary-class');
    });
  });
});
