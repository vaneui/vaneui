import '@testing-library/jest-dom';
import { createRef, useState, type ReactElement } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Field, SegmentedControl, SegmentedControlItem, ThemeProvider, defaultTheme } from '../../index';

const renderUi = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

const segment = (name: string) => screen.getByRole('radio', { name }).closest('label') as HTMLLabelElement;

const statuses = (props: React.ComponentProps<typeof SegmentedControl> = {}) => (
  <SegmentedControl aria-label="Status" defaultValue="all" {...props}>
    <SegmentedControlItem value="all">All</SegmentedControlItem>
    <SegmentedControlItem value="open">Open</SegmentedControlItem>
    <SegmentedControlItem value="closed">Closed</SegmentedControlItem>
  </SegmentedControl>
);

describe('SegmentedControl', () => {
  it('should render a labelled radio group with a radio in a label per segment', () => {
    renderUi(statuses());
    const group = screen.getByRole('radiogroup', { name: 'Status' });
    expect(group).toHaveClass('vane-segmented-control');
    expect(group.tagName).toBe('DIV');
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    for (const radio of radios) {
      expect(radio).toHaveAttribute('type', 'radio');
      expect(radio).toHaveClass('vane-segmented-control-input');
      expect(radio.parentElement?.tagName).toBe('LABEL');
      expect(radio.parentElement).toHaveClass('vane-segmented-control-item');
    }
  });

  it('should give every radio the same generated name, or the one passed', () => {
    const { unmount } = renderUi(statuses());
    const names = screen.getAllByRole('radio').map(radio => radio.getAttribute('name'));
    expect(names[0]).toBeTruthy();
    expect(new Set(names).size).toBe(1);
    unmount();

    renderUi(statuses({ name: 'status' }));
    expect(screen.getAllByRole('radio').every(radio => radio.getAttribute('name') === 'status')).toBe(true);
  });

  it('should select the defaultValue and move the selection on a click', () => {
    renderUi(statuses());
    expect(screen.getByRole('radio', { name: 'All' })).toBeChecked();
    fireEvent.click(screen.getByRole('radio', { name: 'Open' }));
    expect(screen.getByRole('radio', { name: 'Open' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'All' })).not.toBeChecked();
  });

  it('should report the value of the chosen segment through onChange', () => {
    const onChange = jest.fn();
    const onItemChange = jest.fn();
    renderUi(
      <SegmentedControl aria-label="Status" defaultValue="all" onChange={onChange}>
        <SegmentedControlItem value="all">All</SegmentedControlItem>
        <SegmentedControlItem value="open" onChange={onItemChange}>Open</SegmentedControlItem>
      </SegmentedControl>
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Open' }));
    expect(onItemChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((onChange.mock.calls[0][0] as React.ChangeEvent<HTMLInputElement>).target.value).toBe('open');
  });

  it('should follow a controlled value', () => {
    function Controlled() {
      const [value, setValue] = useState('week');
      return (
        <>
          <SegmentedControl aria-label="View" value={value} onChange={event => setValue(event.target.value)}>
            <SegmentedControlItem value="day">Day</SegmentedControlItem>
            <SegmentedControlItem value="week">Week</SegmentedControlItem>
          </SegmentedControl>
          <output data-testid="value">{value}</output>
          <button type="button" onClick={() => setValue('day')}>reset</button>
        </>
      );
    }
    renderUi(<Controlled />);
    expect(screen.getByRole('radio', { name: 'Week' })).toBeChecked();
    fireEvent.click(screen.getByRole('radio', { name: 'Day' }));
    expect(screen.getByTestId('value')).toHaveTextContent('day');
    expect(screen.getByRole('radio', { name: 'Day' })).toBeChecked();
    fireEvent.click(screen.getByRole('radio', { name: 'Week' }));
    fireEvent.click(screen.getByText('reset'));
    expect(screen.getByRole('radio', { name: 'Day' })).toBeChecked();
  });

  it('should style the track with its defaults: sm, a neutral surface, padding and corners', () => {
    renderUi(statuses());
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('data-size', 'sm');
    expect(group).toHaveAttribute('data-appearance', 'primary');
    expect(group).toHaveAttribute('data-variant', 'outline');
    expect(group).toHaveAttribute('data-vane-type', 'ui');
    expect(group).toHaveClass('inline-flex', 'items-stretch', 'bg-(--color-bg-tertiary)', 'px-(--px)', 'py-(--py)', 'rounded-(--br)');
  });

  it('should style a segment with its defaults', () => {
    renderUi(statuses());
    const all = segment('All');
    expect(all).toHaveAttribute('data-size', 'sm');
    expect(all).toHaveAttribute('data-appearance', 'primary');
    expect(all).toHaveAttribute('data-variant', 'outline');
    expect(all).toHaveClass('inline-flex', 'items-center', 'justify-center', 'relative', 'grow', 'px-(--px)', 'py-(--py)',
      'gap-(--gap)', 'font-sans', 'font-medium', 'cursor-pointer', 'whitespace-nowrap', 'rounded-(--br)');
  });

  it('should keep the track neutral whatever the appearance', () => {
    renderUi(statuses({ accent: true, filled: true }));
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('data-appearance', 'accent');
    expect(group).toHaveClass('bg-(--color-bg-tertiary)');
    expect(group).not.toHaveClass('bg-(--bg-color)');
  });

  it.each([
    ['size', { lg: true }, 'data-size', 'lg'],
    ['appearance', { success: true }, 'data-appearance', 'success'],
    ['variant', { filled: true }, 'data-variant', 'filled'],
  ] as const)('should pass its %s to the segments', (_name, props, attribute, value) => {
    renderUi(statuses(props));
    for (const name of ['All', 'Open', 'Closed']) {
      expect(segment(name)).toHaveAttribute(attribute, value);
    }
  });

  it('should pass its shape to the segments', () => {
    renderUi(statuses({ pill: true }));
    expect(screen.getByRole('radiogroup')).toHaveClass('rounded-full');
    expect(segment('Open')).toHaveClass('rounded-full');
  });

  it('should let a segment keep its own size, appearance, variant and shape', () => {
    renderUi(
      <SegmentedControl aria-label="Status" lg accent filled pill>
        <SegmentedControlItem value="a">A</SegmentedControlItem>
        <SegmentedControlItem value="b" xs danger ghost sharp>B</SegmentedControlItem>
      </SegmentedControl>
    );
    expect(segment('A')).toHaveAttribute('data-size', 'lg');
    expect(segment('A')).toHaveAttribute('data-appearance', 'accent');
    const b = segment('B');
    expect(b).toHaveAttribute('data-size', 'xs');
    expect(b).toHaveAttribute('data-appearance', 'danger');
    expect(b).toHaveAttribute('data-variant', 'ghost');
    expect(b).not.toHaveClass('rounded-full');
  });

  it('should pass a size set through the control theme defaults, and leave the segment theme defaults alone otherwise', () => {
    const { unmount } = render(
      <ThemeProvider themeDefaults={{ segmentedControl: { main: { lg: true } } }}>{statuses()}</ThemeProvider>
    );
    expect(screen.getByRole('radiogroup')).toHaveAttribute('data-size', 'lg');
    expect(segment('Open')).toHaveAttribute('data-size', 'lg');
    unmount();

    render(
      <ThemeProvider themeDefaults={{ segmentedControl: { item: { success: true } } }}>{statuses()}</ThemeProvider>
    );
    expect(segment('Open')).toHaveAttribute('data-appearance', 'success');
  });

  it('should disable every segment, unless a segment says otherwise', () => {
    renderUi(
      <SegmentedControl aria-label="Status" disabled>
        <SegmentedControlItem value="a">A</SegmentedControlItem>
        <SegmentedControlItem value="b" disabled={false}>B</SegmentedControlItem>
      </SegmentedControl>
    );
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('radio', { name: 'A' })).toBeDisabled();
    expect(segment('A')).toHaveAttribute('data-disabled', 'true');
    expect(segment('A')).toHaveClass('opacity-(--disabled-opacity)', 'cursor-not-allowed');
    expect(segment('A')).not.toHaveAttribute('disabled');
    expect(screen.getByRole('radio', { name: 'B' })).not.toBeDisabled();
  });

  it('should disable one segment', () => {
    renderUi(
      <SegmentedControl aria-label="Status" defaultValue="a">
        <SegmentedControlItem value="a">A</SegmentedControlItem>
        <SegmentedControlItem value="b" disabled>B</SegmentedControlItem>
      </SegmentedControl>
    );
    expect(screen.getByRole('radiogroup')).not.toHaveAttribute('aria-disabled');
    expect(screen.getByRole('radio', { name: 'B' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'A' })).not.toBeDisabled();
  });

  it('should mark every radio required', () => {
    renderUi(statuses({ required: true }));
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-required', 'true');
    expect(screen.getAllByRole('radio').every(radio => (radio as HTMLInputElement).required)).toBe(true);
  });

  it('should take its name, description and state from a Field', () => {
    renderUi(
      <Field label="View" description="Pick one" disabled>
        <SegmentedControl defaultValue="day">
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
        </SegmentedControl>
      </Field>
    );
    const group = screen.getByRole('radiogroup', { name: 'View' });
    expect(group).toHaveAccessibleDescription('Pick one');
    expect(screen.getByRole('radio', { name: 'Day' })).toBeDisabled();
    // the Field id stays off the radios
    expect(screen.getByRole('radio', { name: 'Day' })).not.toHaveAttribute('id');
  });

  it('should put the text of a segment in a text run, next to an icon', () => {
    renderUi(
      <SegmentedControl aria-label="Layout">
        <SegmentedControlItem value="list"><svg data-testid="icon" />List</SegmentedControlItem>
        <SegmentedControlItem value="grid" aria-label="Grid"><svg /></SegmentedControlItem>
      </SegmentedControl>
    );
    const list = segment('List');
    expect(Array.from(list.children).map(child => child.tagName.toLowerCase())).toEqual(['input', 'svg', 'span']);
    expect(list.querySelector('.vane-text-run')).toHaveTextContent('List');
    expect(screen.getByRole('radio', { name: 'Grid' })).toHaveAttribute('aria-label', 'Grid');
    expect(segment('Grid').querySelector('.vane-text-run')).not.toBeInTheDocument();
  });

  it('should send className and style to the segment, and ref and the other attributes to its radio', () => {
    const groupRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLInputElement>();
    renderUi(
      <SegmentedControl aria-label="Status" ref={groupRef} className="custom-track" data-testid="group">
        <SegmentedControlItem value="a" ref={itemRef} className="custom-segment" style={{ minWidth: 80 }} data-testid="radio-a" id="radio-a">A</SegmentedControlItem>
      </SegmentedControl>
    );
    expect(groupRef.current).toBe(screen.getByTestId('group'));
    expect(groupRef.current).toHaveClass('custom-track', 'vane-segmented-control');
    expect(itemRef.current).toBe(screen.getByRole('radio', { name: 'A' }));
    expect(itemRef.current).toHaveAttribute('id', 'radio-a');
    expect(screen.getByTestId('radio-a')).toBe(itemRef.current);
    const a = segment('A');
    expect(a).toHaveClass('custom-segment', 'vane-segmented-control-item');
    expect(a).toHaveStyle({ minWidth: '80px' });
    expect(itemRef.current).not.toHaveAttribute('style');
  });

  it('should render the track and a segment as another tag', () => {
    renderUi(
      <SegmentedControl aria-label="Status" tag="section">
        <SegmentedControlItem value="a" tag="span">A</SegmentedControlItem>
      </SegmentedControl>
    );
    expect(screen.getByRole('radiogroup').tagName).toBe('SECTION');
    expect(screen.getByRole('radio').parentElement?.tagName).toBe('SPAN');
  });

  it('should not leak its props to the DOM', () => {
    renderUi(
      <SegmentedControl aria-label="Status" lg accent filled pill wFull noPadding defaultValue="a" data-testid="group">
        <SegmentedControlItem value="a" sm success outline fontBold uppercase noPadding>A</SegmentedControlItem>
      </SegmentedControl>
    );
    const group = screen.getByTestId('group');
    for (const attribute of ['lg', 'accent', 'filled', 'pill', 'wfull', 'nopadding', 'value', 'defaultvalue']) {
      expect(group).not.toHaveAttribute(attribute);
    }
    const radio = screen.getByRole('radio', { name: 'A' });
    for (const attribute of ['sm', 'success', 'outline', 'fontbold', 'uppercase', 'nopadding', 'class']) {
      if (attribute === 'class') {
        expect(radio).toHaveAttribute('class', 'vane-segmented-control-input');
      } else {
        expect(radio).not.toHaveAttribute(attribute);
        expect(segment('A')).not.toHaveAttribute(attribute);
      }
    }
  });

  it('should draw as a placeholder with skeleton', () => {
    renderUi(statuses({ skeleton: true }));
    const group = screen.getByRole('radiogroup', { hidden: true });
    expect(group).toHaveAttribute('data-skeleton');
    expect(group).toHaveAttribute('aria-busy', 'true');
    expect(group).toHaveAttribute('inert');
  });

  it('should render a segment outside a SegmentedControl as a lone radio', () => {
    renderUi(<SegmentedControlItem value="a">A</SegmentedControlItem>);
    const radio = screen.getByRole('radio', { name: 'A' });
    expect(radio).not.toHaveAttribute('name');
    expect(radio).not.toBeChecked();
    expect(segment('A')).toHaveAttribute('data-size', 'sm');
  });
});
