import '@testing-library/jest-dom';
import type { InputHTMLAttributes, ReactElement } from 'react';
import { render, renderHook } from '@testing-library/react';

import {
  Field,
  Input,
  ThemeProvider,
  defaultTheme,
  useFieldControlProps,
  type FieldControlProps,
} from '../../index';

// Field wires its own controls through context. A control the library does not ship (a plain
// <input>, a masked input, a date picker) got none of it: the label pointed at no element and
// the control had no aria-describedby and no aria-invalid. `useFieldControlProps` is the public
// way to take that wiring by hand.

const wrap = (ui: ReactElement) => render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

/** A plain element as a control: everything it knows about the Field comes from the hook. */
function NativeInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...useFieldControlProps(props)} />;
}

/** A control that takes the usual attributes and renders them somewhere inside its own markup. */
function BoxedControl(props: FieldControlProps & { placeholder?: string }) {
  const { id, disabled, required, readOnly, placeholder, ...aria } = useFieldControlProps(props);
  return (
    <div className="boxed">
      <input id={id} disabled={disabled} required={required} readOnly={readOnly} placeholder={placeholder} {...aria} />
    </div>
  );
}

const idsOf = (el: Element, attribute: string) => (el.getAttribute(attribute) ?? '').split(' ').filter(Boolean);

describe('useFieldControlProps', () => {
  let consoleError: jest.SpyInstance;
  beforeEach(() => { consoleError = jest.spyOn(console, 'error').mockImplementation(() => {}); });
  afterEach(() => { consoleError.mockRestore(); });

  it('is exported from the package root', () => {
    expect(typeof useFieldControlProps).toBe('function');
  });

  describe.each([
    ['a plain <input>', NativeInput],
    ['a control that renders its own markup', BoxedControl],
  ] as const)('%s inside a Field', (_name, Control) => {
    it('is the element the label points at', () => {
      const { container } = wrap(<Field label="Start date"><Control /></Field>);
      const input = container.querySelector('input') as HTMLInputElement;
      const label = container.querySelector('label') as HTMLLabelElement;
      expect(input.id).not.toBe('');
      expect(label).toHaveAttribute('for', input.id);
      expect(label.control).toBe(input);
    });

    it('is described by the help text and the error, and marked invalid', () => {
      const { container } = wrap(
        <Field label="Start date" description="Any weekday" error="Pick a date"><Control /></Field>
      );
      const input = container.querySelector('input') as HTMLInputElement;
      const described = idsOf(input, 'aria-describedby').map(id => container.querySelector(`#${id}`));
      expect(described.map(el => el?.textContent)).toEqual(['Any weekday', 'Pick a date']);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('gets no validity or description attributes from a valid Field without help text', () => {
      const { container } = wrap(<Field label="Start date" error=""><Control /></Field>);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).not.toHaveAttribute('aria-invalid');
      expect(input).not.toHaveAttribute('aria-describedby');
    });

    it('is invalid for error={true} and for `invalid`, with nothing to describe it', () => {
      const { container } = wrap(
        <>
          <Field label="A" error><Control /></Field>
          <Field label="B" invalid><Control /></Field>
        </>
      );
      for (const input of Array.from(container.querySelectorAll('input'))) {
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).not.toHaveAttribute('aria-describedby');
      }
    });

    it('takes required, disabled and readOnly from the Field', () => {
      const { container } = wrap(<Field label="Start date" required disabled readOnly><Control /></Field>);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeRequired();
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute('readonly');
    });

    it('puts only real attributes on the element', () => {
      const { container } = wrap(
        <Field label="Start date" description="Any weekday" error="Pick a date" required><Control /></Field>
      );
      const input = container.querySelector('input') as HTMLInputElement;
      // the theme prop the built-in controls take must not reach a plain element
      expect(input).not.toHaveAttribute('invalid');
      expect(input.getAttributeNames().sort()).toEqual(['aria-describedby', 'aria-invalid', 'id', 'required']);
      expect(consoleError).not.toHaveBeenCalled();
    });
  });

  describe('the control\'s own props win', () => {
    it('keeps its own id, and the label follows it', () => {
      const { container } = wrap(<Field label="Start date"><NativeInput id="start" /></Field>);
      expect(container.querySelector('input')).toHaveAttribute('id', 'start');
      expect(container.querySelector('label')).toHaveAttribute('for', 'start');
    });

    it('keeps its own aria-describedby in front of the Field\'s', () => {
      const { container } = wrap(
        <Field label="Start date" description="Any weekday"><NativeInput aria-describedby="external" /></Field>
      );
      const ids = idsOf(container.querySelector('input') as HTMLInputElement, 'aria-describedby');
      expect(ids[0]).toBe('external');
      expect(container.querySelector(`#${ids[1]}`)).toHaveTextContent('Any weekday');
      expect(ids).toHaveLength(2);
    });

    it('keeps an explicit aria-invalid, disabled, required and readOnly', () => {
      const { container } = wrap(
        <Field label="Start date" error="Pick a date" disabled required readOnly>
          <NativeInput aria-invalid={false} disabled={false} required={false} readOnly={false} />
        </Field>
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-invalid', 'false');
      expect(input).not.toBeDisabled();
      expect(input).not.toBeRequired();
      expect(input).not.toHaveAttribute('readonly');
    });
  });

  describe('outside a Field', () => {
    it('returns the props it was given, untouched', () => {
      const props = { id: 'own', placeholder: 'x' };
      const { result } = renderHook(() => useFieldControlProps(props));
      expect(result.current).toBe(props);
    });

    it('returns an empty object when called without props', () => {
      const { result } = renderHook(() => useFieldControlProps());
      expect(result.current).toEqual({});
    });

    it('adds nothing to a plain element', () => {
      const { container } = wrap(<NativeInput placeholder="x" />);
      expect((container.querySelector('input') as HTMLInputElement).getAttributeNames()).toEqual(['placeholder']);
    });
  });

  it('called without props returns just the Field\'s wiring', () => {
    let wiring: FieldControlProps = {};
    function Probe() {
      wiring = useFieldControlProps();
      return <input {...wiring} />;
    }
    const { container } = wrap(<Field label="Start date" description="Any weekday" error="Pick a date"><Probe /></Field>);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(Object.keys(wiring).sort()).toEqual(['aria-describedby', 'aria-invalid', 'id']);
    expect(wiring['aria-invalid']).toBe(true);
    expect(wiring.id).toBe(input.id);
  });

  it('follows the Field as its error comes and goes, on the same element', () => {
    const { container, rerender } = wrap(<Field label="Start date"><NativeInput /></Field>);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).not.toHaveAttribute('aria-invalid');

    rerender(<ThemeProvider theme={defaultTheme}><Field label="Start date" error="Pick a date"><NativeInput /></Field></ThemeProvider>);
    expect(container.querySelector('input')).toBe(input);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(container.querySelector(`#${input.getAttribute('aria-describedby')}`)).toHaveTextContent('Pick a date');

    rerender(<ThemeProvider theme={defaultTheme}><Field label="Start date"><NativeInput /></Field></ThemeProvider>);
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  // the hook is for controls the library does not ship; its own controls keep their wiring
  it('leaves the built-in controls as they were: an Input in an invalid Field still shows its error state', () => {
    const { container } = wrap(<Field label="Email" description="We never share it." error="Required"><Input /></Field>);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(container.querySelector('label')).toHaveAttribute('for', input.id);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('data-status', 'error');
    expect(idsOf(input, 'aria-describedby')).toHaveLength(2);
    expect(container.querySelector('.vane-input-error-icon')).toBeInTheDocument();
    expect(input).not.toHaveAttribute('invalid');
  });
});
