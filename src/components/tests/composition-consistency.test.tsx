import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import {
  Alert,
  Button,
  Card,
  Checkbox,
  Chip,
  Field,
  Input,
  Link,
  Modal,
  ModalHeader,
  ModalCloseButton,
  NavLink,
  Popup,
  Radio,
  RadioGroup,
  Row,
  Select,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
  ThemeProvider,
  defaultTheme,
} from '../../index';

// Components used together in real screens: each block pins one cross-component contract.

const wrap = (ui: React.ReactElement) => (
  <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>
);

describe('Radio in an unselected group', () => {
  it('fills only on :checked, never on :indeterminate (which matches every radio of an unselected group)', () => {
    const { container } = render(wrap(
      <RadioGroup name="plan"><Radio value="a" aria-label="a" /><Radio value="b" aria-label="b" /></RadioGroup>
    ));
    const input = container.querySelector('input[type="radio"]');
    expect(input?.className).toContain('checked:[background:var(--checked-bg-color)]');
    expect(input?.className).not.toContain('indeterminate:');
  });
});

describe('Read-only toggles', () => {
  it('a read-only Checkbox does not toggle on click', () => {
    const { container } = render(wrap(<Checkbox readOnly aria-label="terms" />));
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    fireEvent.click(input);
    expect(input.checked).toBe(false);
    expect(input).toHaveAttribute('aria-readonly', 'true');
  });

  it.each([
    ['Checkbox', <Checkbox readOnly aria-label="x" />],
    ['Radio', <Radio readOnly aria-label="x" />],
    ['Switch', <Switch readOnly aria-label="x" />],
  ])('%s dims its wrapper like a read-only text field, without aria-readonly on the wrapper', (_name, ui) => {
    const { container } = render(wrap(ui));
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass('opacity-70');
    expect(wrapper).not.toHaveAttribute('aria-readonly');
  });
});

describe('Read-only Select', () => {
  it('blocks keyboard changes but lets Tab through', () => {
    const { container } = render(wrap(
      <Select aria-label="plan" {...({ readOnly: true } as object)}><option value="a">A</option><option value="b">B</option></Select>
    ));
    const select = container.querySelector('select') as HTMLSelectElement;
    const typed = fireEvent.keyDown(select, { key: 'b' });
    const tabbed = fireEvent.keyDown(select, { key: 'Tab' });
    expect(typed).toBe(false);
    expect(tabbed).toBe(true);
  });

  it('puts noShrink on the wrapper, the element that is the flex item', () => {
    const { container } = render(wrap(<Select noShrink aria-label="s"><option>A</option></Select>));
    expect(container.querySelector('.vane-select-wrapper')).toHaveClass('shrink-0');
    expect(container.querySelector('select')).not.toHaveClass('shrink-0');
  });
});

describe('Field in children mode', () => {
  it('passes disabled, required and readOnly to the child control, not the wrapper', () => {
    const { container } = render(wrap(
      <Field label="Name" disabled required readOnly placeholder="Ada"><Input /></Field>
    ));
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.required).toBe(true);
    expect(input.readOnly).toBe(true);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).not.toHaveAttribute('required');
    expect(wrapper).not.toHaveAttribute('placeholder');
  });

  it('an explicit child prop wins over the Field state', () => {
    const { container } = render(wrap(<Field label="Name" disabled><Input disabled={false} /></Field>));
    expect((container.querySelector('input') as HTMLInputElement).disabled).toBe(false);
  });

  it('disables every Radio of a child RadioGroup', () => {
    const { container } = render(wrap(
      <Field label="Plan" disabled>
        <RadioGroup><Radio value="a" aria-label="a" /><Radio value="b" aria-label="b" /></RadioGroup>
      </Field>
    ));
    const radios = Array.from(container.querySelectorAll('input[type="radio"]')) as HTMLInputElement[];
    expect(radios).toHaveLength(2);
    radios.forEach(radio => expect(radio.disabled).toBe(true));
  });
});

describe('Switch size', () => {
  it('a size set on the switch input theme reaches the track wrapper', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ switch: { input: { lg: true } } } as never}>
        <Switch aria-label="s" />
      </ThemeProvider>
    );
    expect(container.firstElementChild).toHaveAttribute('data-size', 'lg');
  });
});

describe('Link', () => {
  it('draws its focus ring in its own color', () => {
    const { container } = render(wrap(<Link href="/docs">Docs</Link>));
    expect(container.querySelector('a')).toHaveClass('focus-visible:outline-current');
  });

  it('dims when disabled', () => {
    const { container } = render(wrap(<Link href="/docs" disabled>Docs</Link>));
    const link = container.querySelector('a');
    expect(link).toHaveClass('opacity-(--disabled-opacity)', 'cursor-not-allowed');
    expect(link).not.toHaveAttribute('href');
  });
});

describe('Linked surfaces', () => {
  it('Card with href draws its focus ring in the appearance focus color', () => {
    const { container } = render(wrap(<Card href="/p/1">Trail Runner</Card>));
    expect(container.querySelector('a')).toHaveClass('focus-visible:outline-(--focus-color)');
  });

  it('Card with href warns in development when it contains a button', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(wrap(<Card href="/p/1"><Text>Trail Runner</Text><Button>Add to cart</Button></Card>));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Card with `href` contains an interactive element'));
    warn.mockRestore();
  });

  it('a clickable Chip gets the focus ring, like a linked one', () => {
    const { container } = render(wrap(<Chip onClick={() => {}} tag="button">Filter</Chip>));
    expect(container.querySelector('button')).toHaveClass('focus-visible:outline-2');
  });
});

describe('Variant without appearance', () => {
  it('<Row filled> emits no data-variant, so it cannot flip text onto an unpainted surface', () => {
    const { container } = render(wrap(<Card><Row filled><Text>Status</Text></Row></Card>));
    const row = container.querySelector('.vane-row') as HTMLElement;
    expect(row).not.toHaveAttribute('data-variant');
  });
});

describe('Modal close button under app-wide button defaults', () => {
  it('keeps its own outline variant and sm size when every Button is filled lg', () => {
    render(
      <ThemeProvider themeDefaults={{ button: { main: { filled: true, lg: true } } }}>
        <Modal open onClose={() => {}}>
          <ModalHeader>Delete project?<ModalCloseButton /></ModalHeader>
        </Modal>
      </ThemeProvider>
    );
    const close = document.body.querySelector('.vane-modal-close');
    expect(close).toHaveAttribute('data-variant', 'outline');
    expect(close).toHaveAttribute('data-size', 'sm');
  });

  it('renders a plain-text title prop as a Title', () => {
    render(wrap(<Modal open onClose={() => {}} title="Delete project?">Body</Modal>));
    expect(document.body.querySelector('.vane-title')).toHaveTextContent('Delete project?');
  });
});

describe('Font family on components that hold raw text', () => {
  it.each([
    ['Table', () => render(wrap(<Table><Tbody><Tr><Td>1</Td></Tr></Tbody></Table>)).container.querySelector('table')],
    ['Alert', () => render(wrap(<Alert>Saved</Alert>)).container.querySelector('.vane-alert')],
  ])('%s defaults to the sans font', (_name, get) => {
    expect(get()).toHaveClass('font-sans');
  });

  it('Popup and Tooltip default to the sans font', () => {
    render(wrap(
      <>
        <Popup open onClose={() => {}} anchorRef={{ current: null }}>Panel</Popup>
        <Tooltip content="Filter invoices" defaultOpen><button type="button">F</button></Tooltip>
      </>
    ));
    const popups = document.body.querySelectorAll('.vane-popup');
    expect(popups.length).toBe(2);
    popups.forEach(popup => expect(popup).toHaveClass('font-sans'));
  });
});

describe('Popup focus targets', () => {
  it('a tooltip scroll box is not a tab stop', () => {
    render(wrap(<Tooltip content="Filter invoices" defaultOpen><button type="button">F</button></Tooltip>));
    const scroll = document.body.querySelector('[role="tooltip"] .vane-popup-scroll');
    expect(scroll).not.toHaveAttribute('tabindex');
  });
});

describe('NavLink label', () => {
  it('grows so a trailing Badge sits at the row end', () => {
    const { container } = render(wrap(<NavLink href="/orders">Orders</NavLink>));
    expect(container.querySelector('.vane-nav-link-label')).toHaveClass('flex-1');
  });
});
