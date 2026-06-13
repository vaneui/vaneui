import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Label,
  Input,
  Checkbox,
  Text,
  Button,
  ThemeProvider,
  defaultTheme,
} from '../../index';

// Label propagates its resolved size to nested Input/Checkbox form children.
// These tests pin the propagation SEMANTICS independent of the mechanism:
// they passed when Label mounted a nested ThemeProvider (whole-theme fork per
// Label) and must keep passing with the scalar LabelSizeContext that replaced
// it. Identity/no-fork coverage lives in themeProvider-stability.test.tsx.
describe('Label size propagation semantics', () => {

  describe('(a) explicit size prop on the child wins over Label size', () => {
    it('explicit <Input sm/> wins over <Label lg>', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label lg>
            Email
            <Input sm />
          </Label>
        </ThemeProvider>
      );
      expect(container.querySelector('label')).toHaveAttribute('data-size', 'lg');
      expect(container.querySelector('input')).toHaveAttribute('data-size', 'sm');
    });

    it('explicit <Checkbox xl/> wins over <Label sm>', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label sm>
            <Checkbox xl />
            Accept terms
          </Label>
        </ThemeProvider>
      );
      const label = container.querySelector('label')!;
      expect(label).toHaveAttribute('data-size', 'sm');
      expect(container.querySelector('input[type="checkbox"]')).toHaveAttribute('data-size', 'xl');
      expect(label.querySelector('span.inline-grid')).toHaveAttribute('data-size', 'xl');
    });
  });

  describe('(b) Label size beats outer ThemeProvider themeDefaults for input/checkbox', () => {
    it('outer themeDefaults.input lg loses to <Label sm> (standalone Input still gets lg)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme} themeDefaults={{ input: { lg: true } }}>
          <Label sm>
            Email
            <Input data-testid="inside" />
          </Label>
          <Input data-testid="outside" />
        </ThemeProvider>
      );
      const inside = container.querySelector('[data-testid="inside"]')!;
      const outside = container.querySelector('[data-testid="outside"]')!;
      expect(inside).toHaveAttribute('data-size', 'sm');
      // sanity: the outer default does apply where no Label intervenes
      expect(outside).toHaveAttribute('data-size', 'lg');
    });

    it('outer themeDefaults.checkbox lg loses to <Label sm>', () => {
      const { container } = render(
        <ThemeProvider
          theme={defaultTheme}
          themeDefaults={{ checkbox: { wrapper: { lg: true }, input: { lg: true } } }}
        >
          <Label sm>
            <Checkbox />
            Accept terms
          </Label>
        </ThemeProvider>
      );
      const label = container.querySelector('label')!;
      expect(container.querySelector('input[type="checkbox"]')).toHaveAttribute('data-size', 'sm');
      expect(label.querySelector('span.inline-grid')).toHaveAttribute('data-size', 'sm');
    });

    it('outer themeDefaults.label size feeds the propagated size', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme} themeDefaults={{ label: { xl: true } }}>
          <Label>
            Email
            <Input />
          </Label>
        </ThemeProvider>
      );
      expect(container.querySelector('label')).toHaveAttribute('data-size', 'xl');
      expect(container.querySelector('input')).toHaveAttribute('data-size', 'xl');
    });
  });

  describe('(c) propagated size fully resets the exclusive size group', () => {
    it('Input under <Label lg> is lg — the stock md default must not shadow it', () => {
      // md precedes lg in canonical key order: if the propagated size were
      // merely added on top of the defaults (no exclusive-group reset), the
      // built-in `md: true` default would win extraction and data-size would
      // come out "md".
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label lg>
            Email
            <Input />
          </Label>
        </ThemeProvider>
      );
      expect(container.querySelector('input')).toHaveAttribute('data-size', 'lg');
    });

    it('Checkbox wrapper and input under <Label xl> are both xl', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label xl>
            <Checkbox />
            Accept terms
          </Label>
        </ThemeProvider>
      );
      const label = container.querySelector('label')!;
      expect(container.querySelector('input[type="checkbox"]')).toHaveAttribute('data-size', 'xl');
      expect(label.querySelector('span.inline-grid')).toHaveAttribute('data-size', 'xl');
    });

    it('a falsified size prop opts out of the propagated size entirely', () => {
      // <Input sm={false}/> under <Label sm>: the propagated sm default is
      // excluded by the explicit false, and the exclusive-group reset has
      // already zeroed every other size key — so NO size resolves at all.
      // This pins the defaults-level merge semantics (a prop-level injection
      // would resolve "sm" or "md" here instead).
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label sm>
            Email
            <Input sm={false} />
          </Label>
        </ThemeProvider>
      );
      expect(container.querySelector('input')).not.toHaveAttribute('data-size');
    });
  });

  describe('(d) propagation is scoped to the Label subtree', () => {
    it('sibling Input/Checkbox outside the Label keep their md default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label lg>
            Email
            <Input data-testid="inside" />
          </Label>
          <Input data-testid="outside" />
          <Checkbox data-testid="outside-checkbox" />
        </ThemeProvider>
      );
      expect(container.querySelector('[data-testid="inside"]')).toHaveAttribute('data-size', 'lg');
      expect(container.querySelector('[data-testid="outside"]')).toHaveAttribute('data-size', 'md');
      expect(container.querySelector('[data-testid="outside-checkbox"]')).toHaveAttribute('data-size', 'md');
    });

    it('nested Labels: the innermost Label wins', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label lg>
            Outer
            <Label xs data-testid="inner">
              Inner
              <Input />
            </Label>
          </Label>
        </ThemeProvider>
      );
      const inner = container.querySelector('[data-testid="inner"]')!;
      expect(inner).toHaveAttribute('data-size', 'xs');
      expect(container.querySelector('input')).toHaveAttribute('data-size', 'xs');
    });

    it('a nested Label does not inherit size from the outer Label for itself', () => {
      // Label is a propagation SOURCE, not a consumer: an inner Label without
      // an explicit size keeps its own sm default and propagates that.
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label lg>
            Outer
            <Label data-testid="inner">
              Inner
              <Input />
            </Label>
          </Label>
        </ThemeProvider>
      );
      const inner = container.querySelector('[data-testid="inner"]')!;
      expect(inner).toHaveAttribute('data-size', 'sm');
      expect(container.querySelector('input')).toHaveAttribute('data-size', 'sm');
    });
  });

  describe('(e) only Input and Checkbox consume the propagated size', () => {
    it('Text and Button inside a Label keep their own size defaults', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label lg>
            <Text>hint</Text>
            <Button>go</Button>
            <Input />
          </Label>
        </ThemeProvider>
      );
      expect(container.querySelector('p')).toHaveAttribute('data-size', 'md');
      expect(container.querySelector('button')).toHaveAttribute('data-size', 'sm');
      expect(container.querySelector('input')).toHaveAttribute('data-size', 'lg');
    });

    it('checkbox check/indeterminate sub-elements never carry data-size', () => {
      // size reaches only the checkbox wrapper + input; the check and
      // indeterminate glyphs have no size category (they scale via CSS vars)
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label lg>
            <Checkbox />
            Accept terms
          </Label>
        </ThemeProvider>
      );
      const wrapper = container.querySelector('span.inline-grid')!;
      expect(wrapper).toHaveAttribute('data-size', 'lg');
      // inside the wrapper, exactly one sized element: the <input> itself
      const sizedChildren = wrapper.querySelectorAll('[data-size]');
      expect(sizedChildren.length).toBe(1);
      expect(sizedChildren[0].tagName).toBe('INPUT');
    });
  });

  describe('dev warnings', () => {
    it('applying the propagated size emits no console warnings (no conflicting-props, no dead customization)', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      try {
        render(
          <ThemeProvider theme={defaultTheme}>
            <Label lg>
              <Checkbox />
              Email
              <Input />
            </Label>
          </ThemeProvider>
        );
        expect(warnSpy).not.toHaveBeenCalled();
      } finally {
        warnSpy.mockRestore();
      }
    });
  });
});
