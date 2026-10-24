import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Row,
  Col,
  Stack,
  Card,
  Section,
  Container,
  Grid2,
  Grid3,
  Img,
  NavLink,
  Button,
  ThemeProvider,
  defaultTheme,
} from '../../index';
import { BORDER_WIDTH_CLASS } from './utils/classAssertions';

const renderEl = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>).container.firstElementChild as HTMLElement;

describe('Divided grid', () => {
  it('draws cell outlines in the divider color and owns a 1px gap', () => {
    const el = renderEl(<Grid3 divided><div/><div/></Grid3>);
    expect(el).toHaveClass('gap-px', '*:outline', '*:outline-(--divided-color)', '[--divided-color:var(--divider-color)]');
  });

  it('drops the size-driven gap so the cells touch the lines', () => {
    const el = renderEl(<Grid2 divided><div/></Grid2>);
    expect(el.className).not.toContain('gap-(--gap)');
    expect(renderEl(<Grid2><div/></Grid2>).className).not.toContain('gap-px');
  });

  it('keeps the default gap when not divided', () => {
    const plain = renderEl(<Grid2><div/></Grid2>);
    expect(plain.className).not.toContain('outline');
  });
});

describe('Strong border', () => {
  it.each([
    ['Row', <Row key="r" border strongBorder/>],
    ['Col', <Col key="c" border strongBorder/>],
    ['Stack', <Stack key="s" border strongBorder/>],
    ['Card', <Card key="k" strongBorder/>],
    ['Section', <Section key="x" border strongBorder/>],
    ['Container', <Container key="o" border strongBorder/>],
    ['Grid2', <Grid2 key="g" border strongBorder/>],
  ])('%s points its border at the strong color', (_, ui) => {
    const el = renderEl(ui);
    expect(el).toHaveClass('[--border-color:var(--focus-color)]', BORDER_WIDTH_CLASS);
  });

  it('is off by default', () => {
    expect(renderEl(<Card/>).className).not.toContain('--focus-color');
  });
});

describe('NavLink indicator', () => {
  it('indicatorStart draws a start rail with an accent mark when active or selected', () => {
    const el = renderEl(<NavLink href="#" indicatorStart>Docs</NavLink>);
    expect(el.className).toContain('inset-shadow-[calc(var(--indicator-dir,1)*1px)_0_var(--divider-color)]');
    expect(el.className).toContain('data-active:inset-shadow-[calc(var(--indicator-dir,1)*2px)_0_var(--color-focus-accent)]');
    expect(el.className).toContain('aria-selected:inset-shadow-[calc(var(--indicator-dir,1)*2px)_0_var(--color-focus-accent)]');
  });

  it('indicatorBottom draws a bottom bar only while active', () => {
    const el = renderEl(<NavLink href="#" indicatorBottom active>Docs</NavLink>);
    expect(el).toHaveAttribute('data-active');
    expect(el.className).toContain('data-active:inset-shadow-[0_-1px_var(--color-focus-accent)]');
    expect(el.className).toContain('data-active:shadow-[0_1px_var(--color-focus-accent)]');
    expect(el.className).not.toContain('--divider-color');
  });

  it('the two indicators are exclusive: indicatorStart wins, with a warning', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const el = renderEl(<NavLink href="#" indicatorStart indicatorBottom>Docs</NavLink>);
    expect(el.className).toContain('--indicator-dir');
    expect(el.className).not.toContain('inset-shadow-[0_-1px');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('conflicting indicator props'));
    warn.mockRestore();
  });

  it('adds no indicator by default', () => {
    expect(renderEl(<NavLink href="#">Docs</NavLink>).className).not.toContain('inset-shadow');
  });
});

describe('Shadow size', () => {
  it('shadow follows the component size through --shadow-base', () => {
    expect(renderEl(<Card shadow/>)).toHaveClass('shadow-(--shadow-base)');
  });

  it.each(['Xs', 'Sm', 'Md', 'Lg', 'Xl'] as const)('shadow%s fixes the size on both ramps', size => {
    const props = { [`shadow${size}`]: true };
    const card = renderEl(<Card {...props}/>);
    const button = renderEl(<Button {...props}>Go</Button>);
    const key = size.toLowerCase();
    expect(card).toHaveAttribute('data-vane-type', 'layout');
    expect(card).toHaveClass(`data-[vane-type=layout]:shadow-(--shadow-layout-${key})`);
    expect(card.className).not.toContain('shadow-(--shadow-base)');
    expect(button).toHaveAttribute('data-vane-type', 'ui');
    expect(button).toHaveClass(`data-[vane-type=ui]:shadow-(--shadow-ui-${key})`);
  });

  it('noShadow still removes it', () => {
    expect(renderEl(<Card noShadow/>).className).not.toContain('shadow-');
  });
});

describe('Pointer events and whitespace on layout components', () => {
  it.each([
    ['Row', Row], ['Col', Col], ['Stack', Stack], ['Card', Card],
    ['Section', Section], ['Container', Container], ['Grid2', Grid2],
  ] as const)('%s accepts pointerEventsNone and whitespaceNowrap', (_, Component) => {
    const el = renderEl(<Component pointerEventsNone whitespaceNowrap/>);
    expect(el).toHaveClass('pointer-events-none', 'whitespace-nowrap');
    expect(el).not.toHaveAttribute('pointerEventsNone');
  });

  it('adds neither by default', () => {
    const el = renderEl(<Row/>);
    expect(el.className).not.toMatch(/pointer-events|whitespace/);
  });
});

describe('Img noShrink', () => {
  it('keeps an image from shrinking in a flex row', () => {
    expect(renderEl(<Img src="a.png" alt="" noShrink/>)).toHaveClass('shrink-0');
    expect(renderEl(<Img src="a.png" alt=""/>)).not.toHaveClass('shrink-0');
  });
});
