import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { defaultTheme } from '../defaultTheme';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Card } from '../ui/card';
import { Stack } from '../ui/stack';
import { Section } from '../ui/section';
import { Chip } from '../ui/chip';
import { Alert } from '../ui/alert';
import { Code } from '../ui/code';
import { Kbd } from '../ui/kbd';
import { NavLink } from '../ui/navLink';
import { Input } from '../ui/input';
import { List, ListItem } from '../ui/typography';

// A prop set to `false` turns one key of a category off. These tests pin what is left after it.

describe('a prop set to false under a provider default', () => {
  // A provider that picks `filled` turns the component's own `outline` off; turning `filled`
  // off with a prop used to leave no variant, and without one the appearance mapped no colors.
  it('falls back to the component\'s own variant when the provider\'s variant is turned off', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
        <Button danger filled={false}>Delete</Button>
      </ThemeProvider>
    );
    const button = container.querySelector('button')!;
    expect(button).toHaveAttribute('data-appearance', 'danger');
    expect(button).toHaveAttribute('data-variant', 'outline');
  });

  it('falls back to the component\'s own size when the provider\'s size is turned off', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ button: { main: { lg: true } } }}>
        <Button lg={false}>Save</Button>
      </ThemeProvider>
    );
    expect(container.querySelector('button')).toHaveAttribute('data-size', 'sm');
  });

  it('falls back to the component\'s own appearance when the provider\'s appearance is turned off', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ badge: { success: true } }}>
        <Badge success={false}>New</Badge>
      </ThemeProvider>
    );
    expect(container.querySelector('.vane-badge')).toHaveAttribute('data-appearance', 'secondary');
  });

  it('keeps a key that another prop sets explicitly', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
        <Button danger filled={false} ghost>Delete</Button>
      </ThemeProvider>
    );
    expect(container.querySelector('button')).toHaveAttribute('data-variant', 'ghost');
  });

  it('leaves a provider default alone when no prop turns anything off', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
        <Button danger>Delete</Button>
      </ThemeProvider>
    );
    expect(container.querySelector('button')).toHaveAttribute('data-variant', 'filled');
  });
});

describe('turning the component\'s own variant off', () => {
  it('keeps the appearance colored with the next variant', () => {
    const { container } = render(<Button danger outline={false}>Delete</Button>);
    const button = container.querySelector('button')!;
    expect(button).toHaveAttribute('data-appearance', 'danger');
    expect(button).toHaveAttribute('data-variant', 'filled');
  });

  it('falls back to outline when a filled-by-default control is not filled', () => {
    const { container } = render(<Checkbox filled={false} aria-label="Agree" />);
    expect(container.querySelector('input')).toHaveAttribute('data-variant', 'outline');
  });
});

describe('padding set to false', () => {
  const paddingClasses = (el: Element) =>
    Array.from(el.classList).filter(c => /(^|:)p[xyls]?-/.test(c));

  // The padding mappers read an unset category as padded, so `padding={false}` used to keep
  // the padding on every component whose default is `padding`.
  const components: [string, React.ReactElement, React.ReactElement][] = [
    ['Button', <Button key="a" padding={false}>x</Button>, <Button key="b" noPadding>x</Button>],
    ['Card', <Card key="a" padding={false}>x</Card>, <Card key="b" noPadding>x</Card>],
    ['Stack', <Stack key="a" padding={false}>x</Stack>, <Stack key="b" noPadding>x</Stack>],
    ['Section', <Section key="a" padding={false}>x</Section>, <Section key="b" noPadding>x</Section>],
    ['Badge', <Badge key="a" padding={false}>x</Badge>, <Badge key="b" noPadding>x</Badge>],
    ['Chip', <Chip key="a" padding={false}>x</Chip>, <Chip key="b" noPadding>x</Chip>],
    ['Alert', <Alert key="a" padding={false}>x</Alert>, <Alert key="b" noPadding>x</Alert>],
    ['Code', <Code key="a" padding={false}>x</Code>, <Code key="b" noPadding>x</Code>],
    ['Kbd', <Kbd key="a" padding={false}>x</Kbd>, <Kbd key="b" noPadding>x</Kbd>],
    ['NavLink', <NavLink key="a" padding={false}>x</NavLink>, <NavLink key="b" noPadding>x</NavLink>],
    ['Input', <Input key="a" padding={false} aria-label="x" />, <Input key="b" noPadding aria-label="x" />],
    ['List', <List key="a" padding={false}><ListItem>x</ListItem></List>, <List key="b" noPadding><ListItem>x</ListItem></List>],
  ];

  it.each(components)('turns the padding of %s off like noPadding', (_name, off, reset) => {
    // Input renders its field inside a wrapper span
    const themed = (el: Element) => (el.matches('.vane-input-wrapper') ? el.firstElementChild! : el);
    const a = themed(render(off).container.firstElementChild!);
    const b = themed(render(reset).container.firstElementChild!);
    expect(paddingClasses(a)).not.toEqual(paddingClasses(themed(render(React.cloneElement(off as React.ReactElement<{ padding?: boolean }>, { padding: true })).container.firstElementChild!)));
    expect(paddingClasses(a)).toEqual(paddingClasses(b));
    expect(a.className).toBe(b.className);
  });

  it('turns the padding of a Card off from a provider default', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ card: { main: { padding: false } } }}>
        <Card>x</Card>
      </ThemeProvider>
    );
    expect(paddingClasses(container.querySelector('.vane-card')!)).toEqual([]);
  });

  it('turns the padding of a theme without a padding default off, and keeps it when unset', () => {
    // the Tooltip theme has the padding mappers but no padding default: unset means padded
    const isPadding = (c: string) => /(^|:)p[xyls]?-/.test(c);
    const tooltip = defaultTheme.tooltip as unknown as { getClasses(props: object): string[] };
    expect(tooltip.getClasses({}).filter(isPadding)).toEqual(['px-(--px)', 'py-(--py)']);
    expect(tooltip.getClasses({ padding: false }).filter(isPadding)).toEqual([]);
  });

  it('keeps the padding of a padded component when only one axis is turned off', () => {
    const { container } = render(<Card paddingX={false}>x</Card>);
    expect(container.querySelector('.vane-card')).toHaveClass('px-(--px-desktop)', 'py-(--py-desktop)');
  });

  it('keeps the padding when noPadding is turned off', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ card: { main: { noPadding: true } } }}>
        <Card noPadding={false}>x</Card>
      </ThemeProvider>
    );
    expect(container.querySelector('.vane-card')).toHaveClass('px-(--px-desktop)', 'py-(--py-desktop)');
  });
});
