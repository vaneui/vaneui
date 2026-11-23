import '@testing-library/jest-dom';
import { createRef, useState, type ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Field, Input, Select, ThemeProvider, defaultTheme } from '../../index';

const renderUi = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

const Icon = () => <svg data-testid="icon" />;

const wrapperOf = (container: HTMLElement) => container.querySelector('.vane-input-wrapper, .vane-select-wrapper') as HTMLElement;
const sections = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('.vane-input-section')) as HTMLElement[];

describe('Input sections', () => {
  it('should render the start section before the input and the end section after it', () => {
    const { container } = renderUi(<Input startSection={<Icon />} endSection="kg" aria-label="Weight" />);
    const wrapper = wrapperOf(container);
    const [start, end] = sections(container);
    expect(Array.from(wrapper.children)).toEqual([start, container.querySelector('input'), end]);
    expect(start).toHaveAttribute('data-side', 'start');
    expect(end).toHaveAttribute('data-side', 'end');
    expect(end).toHaveTextContent('kg');
    expect(wrapper).toHaveAttribute('data-start-section', '');
    expect(wrapper).toHaveAttribute('data-end-section', '');
  });

  it('should keep the input in place when a section comes and goes, so focus and text survive', () => {
    function Live() {
      const [query, setQuery] = useState('');
      return (
        <Input
          aria-label="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          endSection={query ? <button type="button">Clear</button> : null}
        />
      );
    }
    const { container } = renderUi(<Live />);
    const input = container.querySelector('input') as HTMLInputElement;
    input.focus();
    fireEvent.change(input, { target: { value: 'vane' } });
    expect(container.querySelector('input')).toBe(input);
    expect(document.activeElement).toBe(input);
    expect(sections(container)).toHaveLength(1);
  });

  it('should render no section and no box for an empty slot', () => {
    for (const empty of [null, undefined, false, true, '']) {
      const { container, unmount } = renderUi(<Input startSection={empty} endSection={empty} aria-label="Name" />);
      expect(sections(container)).toHaveLength(0);
      const wrapper = wrapperOf(container);
      expect(wrapper).not.toHaveAttribute('data-start-section');
      expect(wrapper).toHaveClass('contents');
      unmount();
    }
  });

  it('should move the props that size and place the control onto the wrapper', () => {
    const { container } = renderUi(
      <Input
        startSection={<Icon />}
        aria-label="Site"
        className="custom-field"
        wFit
        mobileHide
        style={{ width: 240, marginTop: 4, color: 'red' }}
      />
    );
    const wrapper = wrapperOf(container);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(wrapper).toHaveClass('custom-field');
    expect(input).not.toHaveClass('custom-field');
    expect(wrapper.style.width).toBe('240px');
    expect(wrapper.style.marginTop).toBe('4px');
    expect(input.style.width).toBe('');
    expect(input.style.color).toBe('red');
  });

  it('should give the section the size of the field', () => {
    const { container } = renderUi(<Input lg startSection={<Icon />} aria-label="Search" />);
    expect(sections(container)[0]).toHaveAttribute('data-size', 'lg');
    expect(container.querySelector('input')).toHaveAttribute('data-size', 'lg');
  });

  it('should style the section as an overlay that lets clicks through to the input', () => {
    const { container } = renderUi(<Input startSection={<Icon />} aria-label="Search" />);
    const section = sections(container)[0];
    expect(section).toHaveClass('vane-input-section', 'absolute', 'flex', 'items-center', 'pointer-events-none', 'whitespace-nowrap');
    expect(section).toHaveClass('text-(--color-text-secondary)');
  });

  it('should publish the measured section width on the wrapper', () => {
    const offsetWidth = jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(52);
    try {
      const { container } = renderUi(<Input startSection="https://" endSection={<Icon />} aria-label="Site" />);
      const wrapper = wrapperOf(container);
      expect(wrapper.style.getPropertyValue('--field-start-section')).toBe('52px');
      expect(wrapper.style.getPropertyValue('--field-end-section')).toBe('52px');
    } finally {
      offsetWidth.mockRestore();
    }
  });

  it('should keep the error icon next to an end section', () => {
    const { container } = renderUi(<Input invalid endSection="kg" aria-label="Weight" />);
    const wrapper = wrapperOf(container);
    const children = Array.from(wrapper.children);
    expect(children[0]).toBe(container.querySelector('input'));
    expect(children[1]).toHaveClass('vane-input-error-icon');
    expect(children[2]).toHaveClass('vane-input-section');
  });

  it('should dim the wrapper of a disabled sectioned input and keep the native attribute', () => {
    const { container } = renderUi(<Input disabled startSection={<Icon />} aria-label="Search" />);
    expect(wrapperOf(container)).toHaveAttribute('data-disabled', 'true');
    expect(container.querySelector('input')).toBeDisabled();
  });

  it('should forward the ref to the input and leak no slot prop to the DOM', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = renderUi(<Input ref={ref} startSection={<Icon />} endSection="kg" aria-label="Weight" />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(ref.current).toBe(input);
    for (const el of [input, wrapperOf(container)]) {
      expect(el).not.toHaveAttribute('startsection');
      expect(el).not.toHaveAttribute('endsection');
    }
  });
});

describe('Select start section', () => {
  it('should render the start section before the select, with the chevron at the end', () => {
    const { container } = renderUi(
      <Select startSection={<Icon />} aria-label="Region">
        <option>Europe</option>
      </Select>
    );
    const wrapper = wrapperOf(container);
    const [start] = sections(container);
    expect(wrapper.firstElementChild).toBe(start);
    expect(start.nextElementSibling).toBe(container.querySelector('select'));
    expect(wrapper).toHaveAttribute('data-start-section', '');
    expect(start).toHaveAttribute('data-size', 'sm');
    expect(container.querySelector('select')).not.toHaveAttribute('startsection');
  });

  it('should render no section without one', () => {
    const { container } = renderUi(<Select aria-label="Region"><option>Europe</option></Select>);
    expect(sections(container)).toHaveLength(0);
    expect(wrapperOf(container)).not.toHaveAttribute('data-start-section');
  });
});

describe('Field sections', () => {
  it('should pass both sections to the text input it renders', () => {
    const { container } = renderUi(<Field type="url" label="Site" startSection="https://" endSection={<Icon />} />);
    const [start, end] = sections(container);
    expect(start).toHaveTextContent('https://');
    expect(end.querySelector('[data-testid="icon"]')).toBeInTheDocument();
  });

  it('should pass a start section to the select it renders', () => {
    const { container } = renderUi(
      <Field select label="Region" startSection={<Icon />}>
        <option>Europe</option>
      </Field>
    );
    expect(sections(container)).toHaveLength(1);
  });

  it('should drop a section the rendered control does not have, without leaking it', () => {
    const { container } = renderUi(<Field textarea label="Bio" startSection={<Icon />} endSection="x" />);
    expect(sections(container)).toHaveLength(0);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).not.toHaveAttribute('startsection');
    expect(textarea).not.toHaveAttribute('endsection');
  });

  it('should drop the end section from a select, whose end edge holds the chevron', () => {
    const { container } = renderUi(
      <Field select label="Region" endSection="x">
        <option>Europe</option>
      </Field>
    );
    expect(sections(container)).toHaveLength(0);
  });

  it('should pass the textarea options only to a textarea', () => {
    const { container } = renderUi(<Field textarea label="Bio" autosize resizeNone />);
    expect(container.querySelector('textarea')).toHaveClass('field-sizing-content', 'resize-none');

    const { container: inputContainer } = renderUi(<Field type="text" label="Name" autosize resizeNone />);
    const input = inputContainer.querySelector('input') as HTMLInputElement;
    expect(input).not.toHaveClass('field-sizing-content');
    expect(input).not.toHaveAttribute('autosize');
    expect(input).not.toHaveAttribute('resizenone');
  });

  it('should warn when a section is set on a Field that wraps its own control', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      renderUi(<Field label="Name" startSection={<Icon />}><Input /></Field>);
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('startSection'));
    } finally {
      warn.mockRestore();
    }
  });
});
