import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Button,
  Row,
  Col,
  Card,
  Text,
  Badge,
  Img,
  Select,
  ThemeProvider,
  defaultTheme,
} from '../../index';

const renderEl = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>).container.firstElementChild as HTMLElement;

describe('Responsive width', () => {
  it.each([
    ['mobileWFull', 'max-mobile:w-full'],
    ['tabletWFull', 'max-tablet:w-full'],
    ['desktopWFull', 'max-desktop:w-full'],
  ])('%s makes a Button full width below the breakpoint and keeps wFit above', (prop, cls) => {
    const el = renderEl(<Button {...{ [prop]: true }}>Adopt</Button>);
    expect(el).toHaveClass(cls, 'w-fit');
    expect(el).not.toHaveAttribute(prop);
  });

  it('applies to layout, typography and media components', () => {
    expect(renderEl(<Row mobileWFull/>)).toHaveClass('max-mobile:w-full');
    expect(renderEl(<Card tabletWFull/>)).toHaveClass('max-tablet:w-full');
    expect(renderEl(<Text mobileWFull>Text</Text>)).toHaveClass('max-mobile:w-full');
    expect(renderEl(<Img mobileWFull src="a.png" alt=""/>)).toHaveClass('max-mobile:w-full');
  });

  it('resolves several to the widest, with the dev conflict warning', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(renderEl(<Button mobileWFull tabletWFull>Adopt</Button>)).toHaveClass('max-tablet:w-full');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('conflicting responsiveWidth props'));
    warn.mockRestore();
  });

  it('is off by default', () => {
    expect(renderEl(<Button>Adopt</Button>).className).not.toContain('max-mobile:w-full');
  });

  it('lands on the Select wrapper, not the field', () => {
    const wrapper = renderEl(<Select mobileWFull aria-label="Breed"><option>Beagle</option></Select>);
    expect(wrapper).toHaveClass('max-mobile:w-full');
    expect(wrapper.querySelector('select')?.className).not.toContain('max-mobile:w-full');
  });
});

describe('Show below a breakpoint', () => {
  it.each([
    ['mobileShow', 'mobile:hidden'],
    ['tabletShow', 'tablet:hidden'],
    ['desktopShow', 'desktop:hidden'],
  ])('%s hides a Button from the breakpoint up', (prop, cls) => {
    const el = renderEl(<Button {...{ [prop]: true }}>Menu</Button>);
    expect(el).toHaveClass(cls);
    expect(el).not.toHaveAttribute(prop);
  });

  it('applies to layout and typography components', () => {
    expect(renderEl(<Row tabletShow/>)).toHaveClass('tablet:hidden');
    expect(renderEl(<Col mobileShow/>)).toHaveClass('mobile:hidden');
    expect(renderEl(<Badge desktopShow>New</Badge>)).toHaveClass('desktop:hidden');
  });

  it('combines with a hide prop for a band between two breakpoints', () => {
    expect(renderEl(<Row mobileHide tabletShow/>)).toHaveClass('max-mobile:hidden', 'tablet:hidden');
  });

  it('lands on the Select wrapper', () => {
    expect(renderEl(<Select tabletShow aria-label="Breed"><option>Beagle</option></Select>)).toHaveClass('tablet:hidden');
  });
});
