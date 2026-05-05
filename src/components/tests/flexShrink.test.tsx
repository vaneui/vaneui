import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Row,
  Col,
  Card,
  Stack,
  Button,
  ThemeProvider,
  defaultTheme,
} from '../../index';

describe('Flex & Shrink Props', () => {

  describe('flex category (mutually exclusive)', () => {
    it('flex1 produces flex-1 on Col', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Col flex1>content</Col>
        </ThemeProvider>
      );
      expect(container.querySelector('div')).toHaveClass('flex-1');
    });

    it('flexAuto produces flex-auto on Row', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Row flexAuto>content</Row>
        </ThemeProvider>
      );
      expect(container.querySelector('div')).toHaveClass('flex-auto');
    });

    it('flexNone produces flex-none on Stack', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack flexNone>content</Stack>
        </ThemeProvider>
      );
      expect(container.querySelector('div')).toHaveClass('flex-none');
    });

    it('flex1 works on layout component Card', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card flex1>content</Card>
        </ThemeProvider>
      );
      expect(container.querySelector('div')).toHaveClass('flex-1');
    });

    it('flex1 works on interactive component Button', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Button flex1>Click</Button>
        </ThemeProvider>
      );
      expect(container.querySelector('button')).toHaveClass('flex-1');
    });

    it('mutually exclusive: only the first-truthy flex value wins', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Col flex1 flexAuto flexNone>content</Col>
        </ThemeProvider>
      );
      const el = container.querySelector('div')!;
      const classes = el.className;
      const flexClasses = ['flex-1', 'flex-auto', 'flex-none'].filter((c) =>
        classes.split(/\s+/).includes(c),
      );
      expect(flexClasses).toHaveLength(1);
    });
  });

  describe('shrink category (independent toggle)', () => {
    it('noShrink produces shrink-0 on Col', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Col noShrink>content</Col>
        </ThemeProvider>
      );
      expect(container.querySelector('div')).toHaveClass('shrink-0');
    });

    it('noShrink combines with flex1', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Row flex1 noShrink>content</Row>
        </ThemeProvider>
      );
      const el = container.querySelector('div')!;
      expect(el).toHaveClass('flex-1');
      expect(el).toHaveClass('shrink-0');
    });

    it('noShrink works on Button', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Button noShrink>Click</Button>
        </ThemeProvider>
      );
      expect(container.querySelector('button')).toHaveClass('shrink-0');
    });
  });

  describe('prop leak prevention', () => {
    it('flex1, flexAuto, flexNone, noShrink do not leak to the DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Col flex1 noShrink>content</Col>
        </ThemeProvider>
      );
      const el = container.querySelector('div')!;
      expect(el).not.toHaveAttribute('flex1');
      expect(el).not.toHaveAttribute('flexauto');
      expect(el).not.toHaveAttribute('flexnone');
      expect(el).not.toHaveAttribute('noshrink');
    });
  });
});
