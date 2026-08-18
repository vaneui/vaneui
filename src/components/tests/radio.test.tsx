import '@testing-library/jest-dom';
import { createRef, useState } from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  Label,
  Radio,
  RadioGroup,
  ThemeProvider,
  defaultTheme
} from '../../index';
import { FONT_SIZE_CLASS } from './utils/classAssertions';

const renderRadio = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

const inputsOf = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('input[type="radio"]')) as HTMLInputElement[];

describe('Radio Component Tests', () => {

  describe('Basic Radio Rendering', () => {
    it('should render a wrapper span, a real radio input and the dot overlay', () => {
      const {container} = renderRadio(<Radio />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.tagName).toBe('SPAN');
      expect(wrapper).toHaveClass('inline-grid', 'items-center', 'justify-center', 'self-start');

      const input = wrapper.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'radio');
      expect(input).toHaveClass('vane-radio', 'peer', 'col-start-1', 'row-start-1', 'appearance-none');

      const dot = wrapper.querySelector('span.invisible');
      expect(dot).toHaveClass('col-start-1', 'row-start-1', 'peer-checked:visible');
      expect(dot?.querySelector('svg circle')).toBeInTheDocument();
    });

    it('should render with default theme classes', () => {
      const {container} = renderRadio(<Radio />);

      const input = container.querySelector('input[type="radio"]');
      expect(input).toHaveClass('cursor-pointer');
      expect(input).toHaveClass('size-(--size)'); // md size
      expect(input).toHaveClass('rounded-full'); // pill default — a radio is always circular
      expect(input).toHaveClass(FONT_SIZE_CLASS);
      expect(input).toHaveClass('border-(--border-color)');
      expect(input).toHaveClass('focus-visible:outline-2', 'focus-visible:outline-offset-2');
    });

    it('should emit the default data attributes', () => {
      const {container} = renderRadio(<Radio />);

      const input = container.querySelector('input[type="radio"]') as HTMLElement;
      expect(input.getAttribute('data-size')).toBe('md');
      expect(input.getAttribute('data-appearance')).toBe('primary');
      expect(input.getAttribute('data-variant')).toBe('filled');
      expect(input.getAttribute('data-vane-type')).toBe('ui');
    });

    it('should hide the decorative dot from assistive technology', () => {
      const {container} = renderRadio(<Radio />);

      const wrapper = container.firstElementChild as HTMLElement;
      const decorative = Array.from(wrapper.children).filter((el) => el.tagName !== 'INPUT');
      expect(decorative).toHaveLength(1);
      expect(decorative[0]).toHaveAttribute('aria-hidden', 'true');
      // the input carries the actual radio state, so it must NOT be hidden
      expect(wrapper.querySelector('input')).not.toHaveAttribute('aria-hidden');
    });
  });

  describe('Radio Sizes', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('should emit data-size for %s', (size) => {
      const props = { [size]: true };
      const {container} = renderRadio(<Radio {...props} />);

      const input = container.querySelector('input[type="radio"]');
      expect(input).toHaveAttribute('data-size', size);
      expect(input).toHaveClass('size-(--size)');
    });
  });

  describe('Radio Appearances', () => {
    it.each(['primary', 'accent', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'] as const)(
      'should emit data-appearance for %s',
      (appearance) => {
        const props = { [appearance]: true };
        const {container} = renderRadio(<Radio {...props} />);

        const input = container.querySelector('input[type="radio"]');
        expect(input).toHaveAttribute('data-appearance', appearance);
        expect(input).toHaveClass('checked:[background:var(--checked-bg-color)]');
      }
    );
  });

  describe('Radio Variants and Shapes', () => {
    it.each(['filled', 'outline', 'ghost'] as const)('should emit data-variant for %s', (variant) => {
      const props = { [variant]: true };
      const {container} = renderRadio(<Radio {...props} />);

      expect(container.querySelector('input[type="radio"]')).toHaveAttribute('data-variant', variant);
    });

    it('should let an explicit shape override the circular default', () => {
      const {container} = renderRadio(<Radio sharp />);

      expect(container.querySelector('input[type="radio"]')).toHaveClass('rounded-none');
    });
  });

  describe('Radio Validity', () => {
    it('should emit aria-invalid and data-status when invalid is set', () => {
      const {container} = renderRadio(<Radio invalid />);

      const input = container.querySelector('input[type="radio"]');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('data-status', 'error');
      expect(input).toHaveClass('border-(--color-border-danger)');
    });

    it('should keep validity state off the wrapper', () => {
      const {container} = renderRadio(<Radio invalid />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).not.toHaveAttribute('aria-invalid');
      expect(wrapper).not.toHaveAttribute('data-status');
    });

    it('should not emit aria-invalid or data-status without invalid', () => {
      const {container} = renderRadio(<Radio />);

      const input = container.querySelector('input[type="radio"]');
      expect(input).not.toHaveAttribute('aria-invalid');
      expect(input).not.toHaveAttribute('data-status');
    });
  });

  describe('Radio DOM Contract', () => {
    it('should forward ref to the input element', () => {
      const ref = createRef<HTMLInputElement>();
      renderRadio(<Radio ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('radio');
    });

    it('should not leak boolean props to the DOM', () => {
      const {container} = renderRadio(<Radio lg success filled pill wFull noShadow />);

      const wrapper = container.firstChild as HTMLElement;
      const input = container.querySelector('input[type="radio"]') as HTMLElement;
      for (const leaked of ['lg', 'success', 'filled', 'pill', 'wFull', 'wfull', 'noShadow', 'noshadow']) {
        expect(input.hasAttribute(leaked)).toBe(false);
        expect(wrapper.hasAttribute(leaked)).toBe(false);
      }
    });

    it('should pass through HTML attributes', () => {
      const {container} = renderRadio(
        <Radio
          id="plan-pro"
          name="plan"
          value="pro"
          required
          tabIndex={-1}
          aria-label="Pro plan"
          aria-describedby="plan-help"
          data-custom-attr="custom"
        />
      );

      const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
      expect(input).toHaveAttribute('id', 'plan-pro');
      expect(input).toHaveAttribute('name', 'plan');
      expect(input).toHaveAttribute('value', 'pro');
      expect(input).toBeRequired();
      expect(input).toHaveAttribute('tabindex', '-1');
      expect(input).toHaveAttribute('aria-label', 'Pro plan');
      expect(input).toHaveAttribute('aria-describedby', 'plan-help');
      expect(input).toHaveAttribute('data-custom-attr', 'custom');
    });

    it('should merge a custom className onto the wrapper, not the input', () => {
      const {container} = renderRadio(<Radio className="custom-radio-class" />);

      expect(container.firstChild).toHaveClass('custom-radio-class');
      expect(container.querySelector('input[type="radio"]')).not.toHaveClass('custom-radio-class');
    });

    it('should support a controlled checked state', () => {
      const {container} = renderRadio(<Radio checked readOnly />);

      expect(container.querySelector('input[type="radio"]')).toBeChecked();
    });

    it('should not select when readOnly is set', () => {
      const {container} = renderRadio(<Radio value="pro" readOnly />);

      const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-readonly', 'true');
      expect(input).toHaveAttribute('data-readonly', 'true');

      fireEvent.click(input);
      expect(input).not.toBeChecked();
    });

    it('should select when readOnly is not set', () => {
      const {container} = renderRadio(<Radio value="pro" />);

      const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
      fireEvent.click(input);
      expect(input).toBeChecked();
    });

    it('should still call a consumer onClick when readOnly is set', () => {
      const onClick = jest.fn();
      const {container} = renderRadio(<Radio value="pro" readOnly onClick={onClick} />);

      fireEvent.click(container.querySelector('input[type="radio"]') as HTMLInputElement);
      expect(onClick).toHaveBeenCalled();
    });

    it('should call onChange when the radio is selected', () => {
      const onChange = jest.fn();
      const {container} = renderRadio(<Radio value="pro" onChange={onChange} />);

      fireEvent.click(container.querySelector('input[type="radio"]') as HTMLInputElement);
      expect(onChange).toHaveBeenCalled();
    });

    it('should support disabled', () => {
      const {container} = renderRadio(<Radio disabled />);

      const input = container.querySelector('input[type="radio"]');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('cursor-not-allowed', 'pointer-events-none');
      expect(container.firstChild).toHaveClass('opacity-50');
    });
  });

  describe('RadioGroup', () => {
    it('should render a radiogroup that stacks its options', () => {
      const {container} = renderRadio(
        <RadioGroup name="plan">
          <Radio value="free" />
          <Radio value="pro" />
        </RadioGroup>
      );

      const group = container.firstChild as HTMLElement;
      expect(group).toHaveAttribute('role', 'radiogroup');
      expect(group).toHaveClass('flex', 'flex-col', 'gap-(--gap)');
      expect(inputsOf(container)).toHaveLength(2);
    });

    it('should propagate its name to every child Radio', () => {
      const {container} = renderRadio(
        <RadioGroup name="plan">
          <Radio value="free" />
          <Radio value="pro" />
        </RadioGroup>
      );

      expect(inputsOf(container).map((input) => input.name)).toEqual(['plan', 'plan']);
    });

    it('should generate a shared name when none is given', () => {
      const {container} = renderRadio(
        <RadioGroup>
          <Radio value="free" />
          <Radio value="pro" />
        </RadioGroup>
      );

      const [free, pro] = inputsOf(container);
      expect(free.name).toBeTruthy();
      expect(free.name).toBe(pro.name);
    });

    it('should let an explicit Radio name win over the group name', () => {
      const {container} = renderRadio(
        <RadioGroup name="plan">
          <Radio value="other" name="custom" />
        </RadioGroup>
      );

      expect(inputsOf(container)[0].name).toBe('custom');
    });

    it('should not leak its group props to the DOM', () => {
      const {container} = renderRadio(
        <RadioGroup name="plan" defaultValue="pro">
          <Radio value="pro" />
        </RadioGroup>
      );

      const group = container.firstChild as HTMLElement;
      expect(group.hasAttribute('name')).toBe(false);
      expect(group.hasAttribute('defaultValue')).toBe(false);
      expect(group.hasAttribute('value')).toBe(false);
    });

    it('should select the matching option when controlled, and report changes', () => {
      const handleChange = jest.fn();

      function ControlledGroup() {
        const [value, setValue] = useState('free');
        return (
          <RadioGroup
            name="plan"
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(event.target.value);
              setValue(event.target.value);
            }}
          >
            <Radio value="free" aria-label="Free" />
            <Radio value="pro" aria-label="Pro" />
          </RadioGroup>
        );
      }

      const {container} = renderRadio(<ControlledGroup />);
      const [free, pro] = inputsOf(container);
      expect(free.checked).toBe(true);
      expect(pro.checked).toBe(false);

      fireEvent.click(pro);
      expect(handleChange).toHaveBeenCalledWith('pro');
      expect(pro.checked).toBe(true);
      expect(free.checked).toBe(false);
    });

    it('should preselect defaultValue and stay selectable when uncontrolled', () => {
      const {container} = renderRadio(
        <RadioGroup name="plan" defaultValue="pro">
          <Radio value="free" aria-label="Free" />
          <Radio value="pro" aria-label="Pro" />
        </RadioGroup>
      );

      const [free, pro] = inputsOf(container);
      expect(pro.checked).toBe(true);
      expect(free.checked).toBe(false);

      fireEvent.click(free);
      expect(free.checked).toBe(true);
      expect(pro.checked).toBe(false);
    });

    it('should call both the Radio and the group onChange handlers', () => {
      const radioChange = jest.fn();
      const groupChange = jest.fn();
      const {container} = renderRadio(
        <RadioGroup name="plan" onChange={groupChange}>
          <Radio value="free" onChange={radioChange} />
        </RadioGroup>
      );

      fireEvent.click(inputsOf(container)[0]);
      expect(radioChange).toHaveBeenCalled();
      expect(groupChange).toHaveBeenCalled();
    });

    it('should match a numeric Radio value against the group string value', () => {
      const {container} = renderRadio(
        <RadioGroup name="plan" value="1" onChange={jest.fn()}>
          <Radio value={1} aria-label="One" />
          <Radio value={2} aria-label="Two" />
        </RadioGroup>
      );

      const [one, two] = inputsOf(container);
      expect(one.checked).toBe(true);
      expect(two.checked).toBe(false);
    });

    it('should cascade its size to every child Radio', () => {
      const {container} = renderRadio(
        <RadioGroup lg>
          <Radio value="free" />
          <Radio value="pro" />
        </RadioGroup>
      );

      expect(container.firstChild).toHaveAttribute('data-size', 'lg');
      for (const input of inputsOf(container)) {
        expect(input).toHaveAttribute('data-size', 'lg');
        expect(input.parentElement).toHaveAttribute('data-size', 'lg');
      }
    });

    it('should let an explicit Radio size win over the group size', () => {
      const {container} = renderRadio(
        <RadioGroup lg>
          <Radio value="free" xs />
        </RadioGroup>
      );

      expect(inputsOf(container)[0]).toHaveAttribute('data-size', 'xs');
    });

    it('should leave an enclosing Label in charge when the group has no explicit size', () => {
      const {container} = renderRadio(
        <RadioGroup>
          <Label row><Radio value="free" /> Free</Label>
        </RadioGroup>
      );

      expect(inputsOf(container)[0]).toHaveAttribute('data-size', 'sm');
    });

    it('should let an explicit group size win over an enclosing Label', () => {
      const {container} = renderRadio(
        <RadioGroup lg>
          <Label row><Radio value="free" /> Free</Label>
        </RadioGroup>
      );

      expect(inputsOf(container)[0]).toHaveAttribute('data-size', 'lg');
    });

    it('should forward ref to the group element', () => {
      const ref = createRef<HTMLDivElement>();
      renderRadio(
        <RadioGroup ref={ref}>
          <Radio value="free" />
        </RadioGroup>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'radiogroup');
    });
  });

  describe('Radio Theme Integration', () => {
    it('should apply themeDefaults from ThemeProvider', () => {
      const {container} = render(
        <ThemeProvider themeDefaults={{ radio: { input: { lg: true } } }}>
          <Radio />
        </ThemeProvider>
      );

      expect(container.querySelector('input[type="radio"]')).toHaveAttribute('data-size', 'lg');
    });

    it('should let an explicit prop win over themeDefaults', () => {
      const {container} = render(
        <ThemeProvider themeDefaults={{ radio: { input: { lg: true } } }}>
          <Radio xs />
        </ThemeProvider>
      );

      expect(container.querySelector('input[type="radio"]')).toHaveAttribute('data-size', 'xs');
    });

    it('should apply extraClasses from ThemeProvider', () => {
      const {container} = render(
        <ThemeProvider extraClasses={{ radio: { input: { primary: 'custom-primary-class' } } }}>
          <Radio />
        </ThemeProvider>
      );

      expect(container.querySelector('input[type="radio"]')).toHaveClass('custom-primary-class');
    });
  });
});
