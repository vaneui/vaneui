import '@testing-library/jest-dom';
import { createRef, type ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  Field,
  Input,
  Radio,
  RadioGroup,
  ThemeProvider,
  defaultTheme,
  ComponentKeys,
  type FieldProps
} from '../../index';

const renderField = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

describe('Field Component Tests', () => {
  describe('Basic Rendering', () => {
    it('should render with default theme classes', () => {
      const { container } = renderField(<Field><Input /></Field>);
      const field = container.querySelector('.vane-field');
      expect(field).toBeInTheDocument();
      expect(field).toHaveClass('flex', 'flex-col');
      expect(field).toHaveAttribute('data-size', 'md');
    });

    it('should render only the slots it was given', () => {
      const { container } = renderField(<Field><Input /></Field>);
      expect(container.querySelector('label')).not.toBeInTheDocument();
      expect(container.querySelector('.vane-text')).not.toBeInTheDocument();
    });

    it('should render label, description and error when provided', () => {
      const { getByText } = renderField(
        <Field label="Email" description="No spam" error="Required"><Input /></Field>
      );
      expect(getByText('Email')).toBeInTheDocument();
      expect(getByText('No spam')).toBeInTheDocument();
      expect(getByText('Required')).toBeInTheDocument();
    });

    it('should forward ref to the wrapper', () => {
      const ref = createRef<HTMLDivElement>();
      renderField(<Field ref={ref}><Input /></Field>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('vane-field');
    });

    it('should merge a custom className', () => {
      const { container } = renderField(<Field className="custom-field"><Input /></Field>);
      expect(container.querySelector('.vane-field')).toHaveClass('custom-field');
    });

    it('should not leak slot props to the DOM', () => {
      const { container } = renderField(
        <Field label="Email" description="No spam" error="Required"><Input /></Field>
      );
      const field = container.querySelector('.vane-field') as HTMLElement;
      expect(field.hasAttribute('label')).toBe(false);
      expect(field.hasAttribute('description')).toBe(false);
      expect(field.hasAttribute('error')).toBe(false);
    });
  });

  describe('Control association', () => {
    it('should point the label at the control it wraps', () => {
      const { container } = renderField(<Field label="Email"><Input /></Field>);
      const label = container.querySelector('label') as HTMLLabelElement;
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.id).toBeTruthy();
      expect(label.getAttribute('for')).toBe(input.id);
    });

    it('should describe the control by both description and error', () => {
      const { container } = renderField(
        <Field label="Email" description="No spam" error="Required"><Input /></Field>
      );
      const input = container.querySelector('input') as HTMLInputElement;
      const describedBy = input.getAttribute('aria-describedby')?.split(' ') ?? [];
      expect(describedBy).toHaveLength(2);
      describedBy.forEach((id) => {
        expect(container.querySelector('#' + id)).toBeInTheDocument();
      });
    });

    it('should omit aria-describedby when there is nothing to describe', () => {
      const { container } = renderField(<Field label="Email"><Input /></Field>);
      expect(container.querySelector('input')).not.toHaveAttribute('aria-describedby');
    });

    it('should mark the control invalid when an error is present', () => {
      const { container } = renderField(<Field error="Required"><Input /></Field>);
      expect(container.querySelector('input')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should leave the control valid when there is no error', () => {
      const { container } = renderField(<Field label="Email"><Input /></Field>);
      expect(container.querySelector('input')).not.toHaveAttribute('aria-invalid');
    });

    it('should let an explicit id on the control win', () => {
      const { container } = renderField(<Field label="Email"><Input id="my-input" /></Field>);
      expect(container.querySelector('input')).toHaveAttribute('id', 'my-input');
      expect(container.querySelector('label')).toHaveAttribute('for', 'my-input');
    });

    it('should keep a control-supplied aria-describedby alongside its own', () => {
      const { container } = renderField(
        <Field description="No spam"><Input aria-describedby="external" /></Field>
      );
      const describedBy = container.querySelector('input')!.getAttribute('aria-describedby');
      expect(describedBy).toContain('external');
      expect(describedBy!.split(' ')).toHaveLength(2);
    });

    it('should generate a distinct id per Field instance', () => {
      const { container } = renderField(
        <>
          <Field label="One"><Input /></Field>
          <Field label="Two"><Input /></Field>
        </>
      );
      const [first, second] = Array.from(container.querySelectorAll('input'));
      expect(first.id).not.toBe(second.id);
    });
  });

  describe('Size propagation', () => {
    it('should make its own size the control default', () => {
      const { container } = renderField(<Field lg><Input /></Field>);
      expect(container.querySelector('input')).toHaveAttribute('data-size', 'lg');
    });

    it('should let an explicit control size win', () => {
      const { container } = renderField(<Field lg><Input xs /></Field>);
      expect(container.querySelector('input')).toHaveAttribute('data-size', 'xs');
    });
  });

  describe('Group controls', () => {
    it('should label a RadioGroup by reference rather than htmlFor', () => {
      const { container } = renderField(
        <Field label="Plan" description="Pick one">
          <RadioGroup><Radio value="a" /><Radio value="b" /></RadioGroup>
        </Field>
      );
      const group = container.querySelector('[role="radiogroup"]') as HTMLElement;
      const label = container.querySelector('label') as HTMLLabelElement;
      expect(label.id).toBeTruthy();
      expect(group.getAttribute('aria-labelledby')).toBe(label.id);
      expect(group).toHaveAttribute('aria-describedby');
    });

    it('should not give the group members duplicate ids', () => {
      const { container } = renderField(
        <Field label="Plan">
          <RadioGroup><Radio value="a" /><Radio value="b" /></RadioGroup>
        </Field>
      );
      const ids = Array.from(container.querySelectorAll('input')).map((i) => i.id).filter(Boolean);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('Standalone controls', () => {
    it('should leave a control outside a Field untouched', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}><Input /></ThemeProvider>
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).not.toHaveAttribute('aria-describedby');
      expect(input).not.toHaveAttribute('aria-invalid');
    });
  });
});

describe('Control category registration', () => {
  it('should strip control booleans from the DOM', () => {
    const { container } = renderField(
      <Field select label="Region"/>
    );
    const wrapper = container.querySelector('.vane-field') as HTMLElement;
    expect(wrapper.hasAttribute('select')).toBe(false);
    expect(wrapper.hasAttribute('textInput')).toBe(false);
  });

  it('should type-check every control flag as a usable FieldProps key', () => {
    // Fails `tsc --noEmit` if any control value collides with a native attribute.
    const allControlFlags: Record<typeof ComponentKeys.control[number], true> = {
      textInput: true, textarea: true, select: true, checkbox: true, switch: true, radiogroup: true,
    };
    const fieldWithEveryControl: FieldProps = { ...allControlFlags };
    expect(fieldWithEveryControl).toBeTruthy();
  });
});

describe('Control type prop', () => {
  it('should not emit type as an attribute on the wrapper', () => {
    const { container } = renderField(<Field type="password" label="Password"/>);
    const wrapper = container.querySelector('.vane-field') as HTMLElement;
    expect(wrapper.hasAttribute('type')).toBe(false);
  });
});

describe('Self-rendering controls', () => {
  it('should render an input for a native type', () => {
    const { container } = render(<Field type="password" label="Password"/>);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.type).toBe('password');
  });

  it('should render a select and forward children as its options', () => {
    const { container } = render(
      <Field select label="Region"><option>Cyprus</option></Field>
    );
    const select = container.querySelector('select') as HTMLSelectElement;
    expect(select).not.toBeNull();
    expect(select.querySelectorAll('option')).toHaveLength(1);
  });

  it('should render a textarea', () => {
    const { container } = render(<Field textarea label="Notes" rows={4}/>);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.rows).toBe(4);
  });

  it('should forward native attributes to the control, not the wrapper', () => {
    const { container } = render(
      <Field type="text" label="Name" defaultValue="alex" placeholder="p"/>
    );
    const input = container.querySelector('input') as HTMLInputElement;
    const wrapper = container.querySelector('.vane-field') as HTMLElement;
    expect(input.defaultValue).toBe('alex');
    expect(input.placeholder).toBe('p');
    expect(wrapper.hasAttribute('placeholder')).toBe(false);
  });

  it('should keep the label pointing at the self-rendered control', () => {
    const { container } = render(<Field type="email" label="Email"/>);
    const label = container.querySelector('label') as HTMLLabelElement;
    const input = container.querySelector('input') as HTMLInputElement;
    expect(label.getAttribute('for')).toBe(input.id);
    expect(input.id).toBeTruthy();
  });

  it('should link description and error to the self-rendered control', () => {
    const { container } = render(
      <Field type="text" label="Name" description="Help." error="Bad."/>
    );
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-describedby')?.split(' ')).toHaveLength(2);
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('should stay in children mode when no control is named', () => {
    const { container } = render(<Field label="Email"><Input/></Field>);
    expect(container.querySelectorAll('input')).toHaveLength(1);
  });

  // onChange bubbles from input to ancestors, so calledTimes(1) also proves no wrapper leak
  it('should forward onChange to the self-rendered control, and only there', () => {
    const onChange = jest.fn();
    const { container } = render(<Field type="text" label="Name" onChange={onChange}/>);
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'x' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should adopt an explicit id in self-rendering mode', () => {
    const { container } = render(<Field type="text" id="email" label="Email"/>);
    const label = container.querySelector('label') as HTMLLabelElement;
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.id).toBe('email');
    expect(label.getAttribute('for')).toBe(input.id);
  });

  it('should keep the description colour when a fill routes to the control', () => {
    const { getByText } = render(
      <Field type="text" filled label="Name" description="Help."/>
    );
    expect(getByText('Help.')).toHaveAttribute('data-appearance', 'secondary');
  });
});
