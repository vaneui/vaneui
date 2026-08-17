import '@testing-library/jest-dom';
import { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  Switch,
  ThemeProvider,
  defaultTheme
} from '../../index';
import { BORDER_WIDTH_CLASS } from './utils/classAssertions';

const renderSwitch = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

const getInput = (container: HTMLElement) =>
  container.querySelector('input[type="checkbox"]') as HTMLInputElement;

describe('Switch Component Tests', () => {

  describe('Basic Switch Rendering', () => {
    it('should render a wrapper, a real input and a decorative thumb', () => {
      const {container} = renderSwitch(<Switch />);

      const wrapper = container.querySelector('span.vane-switch-wrapper') as HTMLElement;
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('inline-grid', 'items-center', 'justify-center', 'self-start');

      // the thumb must follow the input in DOM order — peer-checked: is a sibling selector
      expect(wrapper.children[0].tagName).toBe('INPUT');
      expect(wrapper.children[1]).toHaveClass('vane-switch-thumb');
      expect(wrapper.children).toHaveLength(2);
    });

    it('should render the track with its default theme classes', () => {
      const {container} = renderSwitch(<Switch />);

      const el = getInput(container);
      expect(el).toHaveClass('vane-switch', 'peer', 'appearance-none');
      expect(el).toHaveClass('col-start-1', 'row-start-1');
      expect(el).toHaveClass('w-(--switch-w)', 'h-(--size)'); // size-driven track box
      expect(el).toHaveClass('rounded-full'); // pill default
      expect(el).toHaveClass(BORDER_WIDTH_CLASS, 'border-(--border-color)');
      expect(el).toHaveClass('bg-(--color-bg-form)'); // unchecked track
      expect(el).toHaveClass('checked:[background:var(--checked-bg-color)]'); // checked track
      expect(el).toHaveClass('cursor-pointer');
      expect(el).toHaveClass('transition-all', 'duration-(--transition-duration)', 'ease-(--transition-timing)');
    });

    it('should render the thumb with its slide, shape and color classes', () => {
      const {container} = renderSwitch(<Switch />);

      const thumb = container.querySelector('span.vane-switch-thumb');
      expect(thumb).toHaveClass('col-start-1', 'row-start-1');
      expect(thumb).toHaveClass('peer-checked:translate-x-(--switch-travel)');
      expect(thumb).toHaveClass('rounded-full', 'justify-self-start', 'pointer-events-none');
      expect(thumb).toHaveClass('bg-(--color-border-form)', 'peer-checked:bg-(--text-color)');
    });

    it('should render with focus-visible support by default', () => {
      const {container} = renderSwitch(<Switch />);

      const el = getInput(container);
      expect(el).toHaveClass('focus-visible:outline-2', 'focus-visible:outline-offset-2');
      expect(el).toHaveClass('focus-visible:outline-(--focus-color)');
    });

    it('should emit the default data attributes', () => {
      const {container} = renderSwitch(<Switch />);

      const el = getInput(container);
      expect(el.getAttribute('data-size')).toBe('md');
      expect(el.getAttribute('data-appearance')).toBe('primary');
      expect(el.getAttribute('data-variant')).toBe('filled');
      expect(el.getAttribute('data-vane-type')).toBe('ui');
    });
  });

  describe('Switch Accessibility', () => {
    it('should expose role="switch" on the real input', () => {
      const {container} = renderSwitch(<Switch aria-label="Notifications" />);

      const el = getInput(container);
      expect(el).toHaveAttribute('role', 'switch');
      expect(el).toHaveAttribute('aria-label', 'Notifications');
    });

    it('should let a consumer override the role', () => {
      const {container} = renderSwitch(<Switch role="checkbox" />);

      expect(getInput(container)).toHaveAttribute('role', 'checkbox');
    });

    it('should hide the decorative thumb from assistive tech', () => {
      const {container} = renderSwitch(<Switch />);

      expect(container.querySelector('span.vane-switch-thumb')).toHaveAttribute('aria-hidden', 'true');
      expect(getInput(container)).not.toHaveAttribute('aria-hidden');
    });
  });

  describe('Switch Sizes', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('should emit data-size for %s', (size) => {
      const props = { [size]: true };
      const {container} = renderSwitch(<Switch {...props} />);

      expect(getInput(container).getAttribute('data-size')).toBe(size);
      // wrapper resolves the same size so the shared geometry variables scale together
      expect(container.querySelector('span.vane-switch-wrapper')?.getAttribute('data-size')).toBe(size);
    });
  });

  describe('Switch Appearances', () => {
    it.each(['primary', 'accent', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'] as const)(
      'should emit data-appearance for %s',
      (appearance) => {
        const props = { [appearance]: true };
        const {container} = renderSwitch(<Switch {...props} />);

        expect(getInput(container).getAttribute('data-appearance')).toBe(appearance);
      }
    );
  });

  describe('Switch Variants and Shapes', () => {
    it('should emit data-variant for outline', () => {
      const {container} = renderSwitch(<Switch outline />);
      expect(getInput(container).getAttribute('data-variant')).toBe('outline');
    });

    it.each([
      { prop: 'pill', expected: 'rounded-full' },
      { prop: 'sharp', expected: 'rounded-none' },
      { prop: 'rounded', expected: 'rounded-(--br)' },
    ] as const)('should apply $expected for the $prop shape', ({prop, expected}) => {
      const {container} = renderSwitch(<Switch {...{[prop]: true}} />);

      expect(getInput(container)).toHaveClass(expected);
    });
  });

  describe('Switch Checked State', () => {
    it('should support an uncontrolled defaultChecked value', () => {
      const {container} = renderSwitch(<Switch defaultChecked />);

      const el = getInput(container);
      expect(el).toBeChecked();

      el.click();
      expect(el).not.toBeChecked();
    });

    it('should support a controlled checked value', () => {
      const onChange = jest.fn();
      const {container} = renderSwitch(<Switch checked onChange={onChange} />);

      const el = getInput(container);
      expect(el).toBeChecked();

      el.click();
      expect(onChange).toHaveBeenCalled();
      expect(el).toBeChecked(); // stays checked — the parent owns the value
    });

    it('should be unchecked by default', () => {
      const {container} = renderSwitch(<Switch />);

      expect(getInput(container)).not.toBeChecked();
    });
  });

  describe('Switch Disabled State', () => {
    it('should disable the input and dim the wrapper', () => {
      const {container} = renderSwitch(<Switch disabled />);

      const el = getInput(container);
      expect(el).toBeDisabled();
      expect(el).toHaveClass('cursor-not-allowed', 'pointer-events-none');
      expect(container.querySelector('span.vane-switch-wrapper')).toHaveClass('opacity-50');
    });

    it('should not dim the wrapper when enabled', () => {
      const {container} = renderSwitch(<Switch />);

      expect(container.querySelector('span.vane-switch-wrapper')).not.toHaveClass('opacity-50');
    });
  });

  describe('Switch Validity', () => {
    it('should emit aria-invalid and data-status when invalid is set (not color-only)', () => {
      const {container} = renderSwitch(<Switch invalid />);

      const el = getInput(container);
      expect(el).toHaveAttribute('aria-invalid', 'true');
      expect(el).toHaveAttribute('data-status', 'error');
      expect(el).toHaveClass('border-(--color-border-danger)');
    });

    it('should not emit aria-invalid or data-status without invalid', () => {
      const {container} = renderSwitch(<Switch />);

      const el = getInput(container);
      expect(el).not.toHaveAttribute('aria-invalid');
      expect(el).not.toHaveAttribute('data-status');
    });
  });

  describe('Switch DOM Contract', () => {
    it('should forward ref to the input element', () => {
      const ref = createRef<HTMLInputElement>();
      renderSwitch(<Switch ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('should not leak boolean props to the DOM', () => {
      const {container} = renderSwitch(<Switch lg success filled pill invalid wFull noShadow />);

      const el = getInput(container);
      for (const leaked of ['lg', 'success', 'filled', 'pill', 'invalid', 'wFull', 'wfull', 'noShadow', 'noshadow']) {
        expect(el.hasAttribute(leaked)).toBe(false);
      }
    });

    it('should pass through HTML attributes', () => {
      const onChange = jest.fn();
      const {container} = renderSwitch(
        <Switch
          id="notifications"
          name="notifications"
          value="on"
          required
          tabIndex={-1}
          aria-describedby="notifications-help"
          data-custom-attr="custom"
          onChange={onChange}
        />
      );

      const el = getInput(container);
      expect(el).toHaveAttribute('id', 'notifications');
      expect(el).toHaveAttribute('name', 'notifications');
      expect(el).toHaveAttribute('value', 'on');
      expect(el).toBeRequired();
      expect(el).toHaveAttribute('tabindex', '-1');
      expect(el).toHaveAttribute('aria-describedby', 'notifications-help');
      expect(el).toHaveAttribute('data-custom-attr', 'custom');
    });

    it('should support readOnly', () => {
      const {container} = renderSwitch(<Switch checked readOnly />);

      const el = getInput(container);
      expect(el).toHaveAttribute('aria-readonly', 'true');
      expect(el).toBeChecked();
    });

    it('should call onChange when the track is clicked', () => {
      const onChange = jest.fn();
      const {container} = renderSwitch(<Switch onChange={onChange} />);

      getInput(container).click();
      expect(onChange).toHaveBeenCalled();
    });

    it('should merge a custom className onto the wrapper, not the input', () => {
      const {container} = renderSwitch(<Switch className="custom-switch-class" />);

      expect(container.querySelector('span.vane-switch-wrapper')).toHaveClass('custom-switch-class');
      expect(getInput(container)).not.toHaveClass('custom-switch-class');
    });
  });

  describe('Switch Theme Integration', () => {
    it('should apply themeDefaults from ThemeProvider', () => {
      const {container} = render(
        <ThemeProvider themeDefaults={{ switch: { input: { lg: true } } }}>
          <Switch />
        </ThemeProvider>
      );

      expect(getInput(container).getAttribute('data-size')).toBe('lg');
    });

    it('should let an explicit prop win over themeDefaults', () => {
      const {container} = render(
        <ThemeProvider themeDefaults={{ switch: { input: { lg: true } } }}>
          <Switch xs />
        </ThemeProvider>
      );

      expect(getInput(container).getAttribute('data-size')).toBe('xs');
    });

    it('should apply extraClasses from ThemeProvider', () => {
      const {container} = render(
        <ThemeProvider extraClasses={{ switch: { input: { primary: 'custom-primary-class' } } }}>
          <Switch />
        </ThemeProvider>
      );

      expect(getInput(container)).toHaveClass('custom-primary-class');
    });
  });
});
