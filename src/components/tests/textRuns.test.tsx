import '@testing-library/jest-dom';
import React, { useState } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import {
  Alert,
  Badge,
  Button,
  Chip,
  IconButton,
  Label,
  MenuItem,
  MenuLabel,
  NavLink,
  Tooltip,
  Input,
  ThemeProvider,
  defaultTheme,
} from '../../index';
import { TEXT_RUN_CLASS, wrapTextRuns } from '../utils/textRuns';

const RUN = `.${TEXT_RUN_CLASS}`;
const Icon = () => <svg data-testid="icon" />;

const inTheme = (ui: React.ReactElement) => render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

describe('wrapTextRuns', () => {
  const renderRuns = (children: React.ReactNode) => render(<div data-testid="host">{wrapTextRuns(children)}</div>);

  it('wraps a single string in a span', () => {
    const { getByTestId } = renderRuns('Save');
    expect(getByTestId('host').innerHTML).toBe('<span class="vane-text-run">Save</span>');
  });

  it('wraps a number, zero included', () => {
    expect(renderRuns(42).container.firstElementChild?.innerHTML).toBe('<span class="vane-text-run">42</span>');
    expect(renderRuns(0).container.firstElementChild?.innerHTML).toBe('<span class="vane-text-run">0</span>');
  });

  it.each([[''], [' '], ['\n  \t'], [null], [undefined], [false], [true]])('returns %p untouched', (value) => {
    expect(wrapTextRuns(value)).toBe(value);
  });

  it('wraps a string that is only a non-breaking space, which a browser does render', () => {
    expect(renderRuns(' ').getByTestId('host').querySelector(RUN)).toBeInTheDocument();
  });

  it('returns a single element by reference', () => {
    const icon = <Icon />;
    expect(wrapTextRuns(icon)).toBe(icon);
  });

  it('returns an array without text by reference', () => {
    const children = [<Icon key="a" />, null, <Icon key="b" />];
    expect(wrapTextRuns(children)).toBe(children);
  });

  it('keeps elements by reference and at the same index', () => {
    const icon = <Icon key="icon" />;
    const result = wrapTextRuns([icon, 'Save']) as React.ReactNode[];
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(icon);
    expect(React.isValidElement(result[1])).toBe(true);
  });

  it('puts text nodes that touch into one span', () => {
    const { getByTestId } = renderRuns([3, ' items']);
    const runs = getByTestId('host').querySelectorAll(RUN);
    expect(runs).toHaveLength(1);
    expect(runs[0]).toHaveTextContent('3 items');
  });

  it('keeps the length of the array when it merges a run', () => {
    const result = wrapTextRuns(['a', 'b', <Icon key="icon" />]) as React.ReactNode[];
    expect(result).toHaveLength(3);
    expect(result[1]).toBeNull();
  });

  it('does not end a run at a child that renders nothing', () => {
    const { getByTestId } = renderRuns(['Save', null, false, ' now']);
    const runs = getByTestId('host').querySelectorAll(RUN);
    expect(runs).toHaveLength(1);
    expect(runs[0].textContent).toBe('Save now');
  });

  it('starts a new span after an element', () => {
    const { getByTestId } = renderRuns(['Save', <Icon key="icon" />, 'now']);
    const host = getByTestId('host');
    expect(host.querySelectorAll(RUN)).toHaveLength(2);
    expect(Array.from(host.children).map(child => child.tagName.toLowerCase())).toEqual(['span', 'svg', 'span']);
  });

  it('leaves white space between elements bare', () => {
    const children = [<Icon key="a" />, ' ', <Icon key="b" />];
    expect(wrapTextRuns(children)).toBe(children);
  });

  it('wraps the text and leaves a separate run of white space bare', () => {
    const { getByTestId } = renderRuns([<Icon key="a" />, ' ', <Icon key="b" />, 'Save']);
    const host = getByTestId('host');
    expect(host.querySelectorAll(RUN)).toHaveLength(1);
    expect(host.childNodes).toHaveLength(4);
    expect(host.childNodes[1].nodeType).toBe(Node.TEXT_NODE);
  });

  it('takes a nested array of text into the run', () => {
    const { getByTestId } = renderRuns(['Tags: ', ['a', ', ', 'b']]);
    const runs = getByTestId('host').querySelectorAll(RUN);
    expect(runs).toHaveLength(1);
    expect(runs[0].textContent).toBe('Tags: a, b');
  });

  it('returns children untouched when a nested array mixes text and elements', () => {
    const children = ['Total ', ['5', <Icon key="icon" />]];
    expect(wrapTextRuns(children)).toBe(children);
  });

  it('keeps the text content of the children', () => {
    const children = [<b key="b">3</b>, ' new', null, ' messages'];
    const plain = render(<div>{children}</div>).container.textContent;
    const wrapped = render(<div>{wrapTextRuns(children)}</div>).container.textContent;
    expect(wrapped).toBe(plain);
  });
});

describe('Text runs in components', () => {
  let errorSpy: jest.SpyInstance;
  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    // a missing-key or invalid-nesting warning from React would land here
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  const cases: [string, (children: React.ReactNode) => React.ReactElement, string][] = [
    ['Button', children => <Button>{children}</Button>, '.vane-button'],
    ['IconButton', children => <IconButton aria-label="Add">{children}</IconButton>, '.vane-icon-button'],
    ['Badge', children => <Badge>{children}</Badge>, '.vane-badge'],
    ['Chip', children => <Chip>{children}</Chip>, '.vane-chip'],
    ['MenuItem', children => <MenuItem>{children}</MenuItem>, '.vane-menu-item'],
    ['MenuLabel', children => <MenuLabel>{children}</MenuLabel>, '.vane-menu-label'],
    ['Alert', children => <Alert>{children}</Alert>, '.vane-alert'],
  ];

  describe.each(cases)('%s', (_name, make, rootSelector) => {
    it('renders its text in one span that is a direct child', () => {
      const { container } = inTheme(make('Save'));
      const root = container.querySelector(rootSelector) as HTMLElement;
      expect(root).toBeInTheDocument();
      const runs = root.querySelectorAll(RUN);
      expect(runs).toHaveLength(1);
      expect(runs[0].parentElement).toBe(root);
      expect(runs[0].tagName).toBe('SPAN');
      expect(runs[0].textContent).toBe('Save');
      expect(root.textContent).toBe('Save');
    });

    it('adds no span when it holds only elements', () => {
      const { container } = inTheme(make(<Icon />));
      const root = container.querySelector(rootSelector) as HTMLElement;
      expect(root.querySelector(RUN)).not.toBeInTheDocument();
      expect(root.firstElementChild?.tagName.toLowerCase()).toBe('svg');
    });

    it('keeps an icon as its own child next to the text', () => {
      const { container } = inTheme(make([<Icon key="icon" />, 'Save']));
      const root = container.querySelector(rootSelector) as HTMLElement;
      expect(Array.from(root.children).map(child => child.tagName.toLowerCase())).toEqual(['svg', 'span']);
    });

    it('renders text and a value next to it in one span', () => {
      const count = 3;
      const { container } = inTheme(make([count, ' items']));
      const root = container.querySelector(rootSelector) as HTMLElement;
      expect(root.querySelectorAll(RUN)).toHaveLength(1);
      expect(root.textContent).toBe('3 items');
    });

    it('leaves text that the consumer already wrapped alone', () => {
      const { container } = inTheme(make(<strong>Save</strong>));
      const root = container.querySelector(rootSelector) as HTMLElement;
      expect(root.querySelector(RUN)).not.toBeInTheDocument();
    });
  });

  it('keeps the accessible name of a Button', () => {
    inTheme(<Button><Icon />Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it('leaves the text of a Label bare', () => {
    // a Label has no padding of its own, so its text is not wrapped (see the text run rule in rules.css)
    const { container } = inTheme(<Label>Email<Input /></Label>);
    expect(container.querySelector(RUN)).not.toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBe(screen.getByRole('textbox'));
  });

  it('wraps the text of a loading Button inside the hidden label', () => {
    const { container } = inTheme(<Button loading>Save</Button>);
    const hidden = container.querySelector('.vane-button-loading-label') as HTMLElement;
    expect(hidden.querySelector(RUN)).toHaveTextContent('Save');
    expect(container.querySelectorAll(RUN)).toHaveLength(1);
  });

  it('wraps the text of a Tooltip', async () => {
    inTheme(<Tooltip content="Copy link" openDelay={0}><Button>Copy</Button></Tooltip>);
    await act(async () => {
      fireEvent.mouseEnter(screen.getByRole('button'));
    });
    const tooltip = screen.getByRole('tooltip');
    const runs = tooltip.querySelectorAll(RUN);
    expect(runs).toHaveLength(1);
    expect(runs[0]).toHaveTextContent('Copy link');
    // the popup lays its content out in a flex column, so the span is a flex item there too
    expect(runs[0].parentElement).toBe(tooltip.querySelector('.vane-popup-scroll'));
  });

  it('leaves Tooltip content that is an element alone', async () => {
    inTheme(<Tooltip content={<strong>Copy link</strong>} openDelay={0}><Button>Copy</Button></Tooltip>);
    await act(async () => {
      fireEvent.mouseEnter(screen.getByRole('button'));
    });
    expect(screen.getByRole('tooltip').querySelector(RUN)).not.toBeInTheDocument();
  });

  it('keeps NavLink on its own label span', () => {
    const { container } = inTheme(<NavLink href="/docs"><Icon />Docs</NavLink>);
    expect(container.querySelector(RUN)).not.toBeInTheDocument();
    const label = container.querySelector('.vane-nav-link-label');
    expect(label).toHaveTextContent('Docs');
    // clip keeps the truncated label from being scrolled; truncate still supplies the ellipsis
    expect(label).toHaveClass('truncate', 'overflow-clip');
  });

  it('keeps the state of a child when the text next to it changes shape', () => {
    function Counter() {
      const [count, setCount] = useState(0);
      return <button type="button" data-testid="counter" onClick={() => setCount(count + 1)}>{count}</button>;
    }
    function Host() {
      const [extra, setExtra] = useState(false);
      return (
        <>
          <Alert>Saved{extra && ' twice'}<Counter /></Alert>
          <button type="button" data-testid="toggle" onClick={() => setExtra(!extra)}>toggle</button>
        </>
      );
    }
    inTheme(<Host />);
    fireEvent.click(screen.getByTestId('counter'));
    expect(screen.getByTestId('counter')).toHaveTextContent('1');
    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByRole('alert')).toHaveTextContent('Saved twice');
    expect(screen.getByTestId('counter')).toHaveTextContent('1');
    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('counter')).toHaveTextContent('1');
  });
});
