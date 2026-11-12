import '@testing-library/jest-dom';
import { useState, type ChangeEvent, type ComponentType, type ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Checkbox,
  Field,
  Label,
  Radio,
  RadioGroup,
  Switch,
  ThemeProvider,
  defaultTheme,
} from '../../index';

// A read-only toggle must not report a change. The browser fires `click` with the
// flipped `checked` before the click is cancelled, and React builds onChange for
// checkboxes and radios from that click, so cancelling the click alone still handed
// the flipped value to onChange and a controlled form stored it.
//
// The controlled cases assert the handler and the state, not the DOM `checked`: jsdom
// undoes a cancelled checkbox click by toggling `checked` again instead of restoring
// the saved value, which lands on the wrong side once React has already put the
// controlled value back. Browsers restore the saved value; the e2e spec
// (readonly-toggles.spec.ts) checks the rendered box there.

const wrap = (ui: ReactElement) => <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>;

type ToggleProps = {
  readOnly?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const TOGGLES: [string, ComponentType<ToggleProps>][] = [
  ['Checkbox', Checkbox as ComponentType<ToggleProps>],
  ['Switch', Switch as ComponentType<ToggleProps>],
  ['Radio', Radio as ComponentType<ToggleProps>],
];

/** Every way a user can activate a toggle: the control, its label, and Space while focused. */
async function activateEveryWay(input: HTMLInputElement, labelText: string) {
  const user = userEvent.setup();
  await user.click(input);
  await user.click(screen.getByText(labelText));
  input.focus();
  await user.keyboard(' ');
}

describe.each(TOGGLES)('read-only %s', (_name, Toggle) => {
  function Controlled({ onChange, readOnly = true }: { onChange: (checked: boolean) => void; readOnly?: boolean }) {
    const [checked, setChecked] = useState(false);
    return (
      <Label row>
        <Toggle
          readOnly={readOnly}
          checked={checked}
          onChange={(event) => { onChange(event.target.checked); setChecked(event.target.checked); }}
        />
        Agree
        <output>{checked ? 'on' : 'off'}</output>
      </Label>
    );
  }

  it('controlled: click, label click and Space neither call onChange nor change state', async () => {
    const onChange = jest.fn();
    const { container } = render(wrap(<Controlled onChange={onChange} />));
    const input = container.querySelector('input') as HTMLInputElement;

    await activateEveryWay(input, 'Agree');

    expect(onChange).not.toHaveBeenCalled();
    expect(container.querySelector('output')).toHaveTextContent('off');
  });

  it('uncontrolled: click, label click and Space neither call onChange nor toggle', async () => {
    const onChange = jest.fn();
    const { container } = render(wrap(<Label row><Toggle readOnly onChange={onChange} />Agree</Label>));
    const input = container.querySelector('input') as HTMLInputElement;

    await activateEveryWay(input, 'Agree');

    expect(onChange).not.toHaveBeenCalled();
    expect(input).not.toBeChecked();
  });

  it('read-only from the enclosing Field: onChange is not called', async () => {
    const onChange = jest.fn();
    const { container } = render(wrap(
      <Field label="Agree" readOnly><Toggle onChange={onChange} /></Field>
    ));
    const input = container.querySelector('input') as HTMLInputElement;

    await activateEveryWay(input, 'Agree');

    expect(onChange).not.toHaveBeenCalled();
    expect(input).not.toBeChecked();
  });

  it('still reports the change when it is not read-only', async () => {
    const onChange = jest.fn();
    const { container } = render(wrap(<Controlled onChange={onChange} readOnly={false} />));
    const input = container.querySelector('input') as HTMLInputElement;

    await userEvent.setup().click(input);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(container.querySelector('output')).toHaveTextContent('on');
    expect(input).toBeChecked();
  });

  it('logs no controlled-without-onChange warning while read-only', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(wrap(<Toggle readOnly checked onChange={() => {}} />));
    expect(error).not.toHaveBeenCalled();
    error.mockRestore();
  });
});

describe('read-only RadioGroup', () => {
  function ControlledGroup({ onChange, onRadioChange, readOnly = true, freeRadio = false }: {
    onChange: (value: string) => void;
    onRadioChange?: () => void;
    readOnly?: boolean;
    freeRadio?: boolean;
  }) {
    const [value, setValue] = useState('a');
    return (
      <>
        <RadioGroup
          readOnly={readOnly}
          value={value}
          onChange={(event) => { onChange(event.target.value); setValue(event.target.value); }}
        >
          <Label row><Radio value="a" />Starter</Label>
          <Label row><Radio value="b" onChange={onRadioChange} readOnly={freeRadio ? false : undefined} />Pro</Label>
        </RadioGroup>
        <output>{value}</output>
      </>
    );
  }

  it('controlled: choosing another Radio calls neither onChange and keeps the value', async () => {
    const onChange = jest.fn();
    const onRadioChange = jest.fn();
    const { container } = render(wrap(<ControlledGroup onChange={onChange} onRadioChange={onRadioChange} />));
    const [a, b] = Array.from(container.querySelectorAll('input')) as HTMLInputElement[];

    await activateEveryWay(b, 'Pro');

    expect(onChange).not.toHaveBeenCalled();
    expect(onRadioChange).not.toHaveBeenCalled();
    expect(container.querySelector('output')).toHaveTextContent('a');
    expect(a).toBeChecked();
    expect(b).not.toBeChecked();
  });

  it('read-only from the Field around the group: the group onChange is not called', async () => {
    const onChange = jest.fn();
    const { container } = render(wrap(
      <Field label="Plan" readOnly>
        <RadioGroup value="a" onChange={onChange}>
          <Label row><Radio value="a" />Starter</Label>
          <Label row><Radio value="b" />Pro</Label>
        </RadioGroup>
      </Field>
    ));
    const b = container.querySelectorAll('input')[1] as HTMLInputElement;

    await activateEveryWay(b, 'Pro');

    expect(onChange).not.toHaveBeenCalled();
    expect(b).not.toBeChecked();
  });

  it("a Radio's own readOnly={false} wins over the group, so it still reports the change", async () => {
    const onChange = jest.fn();
    const { container } = render(wrap(<ControlledGroup onChange={onChange} freeRadio />));
    const b = container.querySelectorAll('input')[1] as HTMLInputElement;

    await userEvent.setup().click(b);

    expect(onChange).toHaveBeenCalledWith('b');
    expect(container.querySelector('output')).toHaveTextContent('b');
  });

  it('still reports the change when the group is not read-only', async () => {
    const onChange = jest.fn();
    const { container } = render(wrap(<ControlledGroup onChange={onChange} readOnly={false} />));
    const b = container.querySelectorAll('input')[1] as HTMLInputElement;

    await userEvent.setup().click(b);

    expect(onChange).toHaveBeenCalledWith('b');
    expect(b).toBeChecked();
  });
});

describe('read-only self-rendered Field toggles', () => {
  it.each([
    ['checkbox', { checkbox: true }],
    ['switch', { switch: true }],
  ])('%s: onChange is not called', async (_name, control) => {
    const onChange = jest.fn();
    const { container } = render(wrap(<Field {...control} label="Agree" readOnly onChange={onChange} />));
    const input = container.querySelector('input') as HTMLInputElement;

    await activateEveryWay(input, 'Agree');

    expect(onChange).not.toHaveBeenCalled();
    expect(input).not.toBeChecked();
  });
});
