import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import * as fs from 'fs';
import * as path from 'path';

import {
  Text,
  Title,
  SectionTitle,
  PageTitle,
  Card,
  Label,
  List,
  ListItem,
  Divider,
  Row,
  Stack,
  Section,
  Container,
  Link,
  Code,
  Kbd,
  Mark,
  ThemeProvider,
  defaultTheme
} from '../../index';

// Load rules.css for CSS rule verification tests (vars.css is now a barrel import)
const varsCSS = fs.readFileSync(
  path.resolve(__dirname, '../css/rules.css'),
  'utf-8'
);

describe('Inherit Appearance Prop', () => {

  describe('Core mechanism', () => {
    it('component with inherit should NOT have data-appearance attribute', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text inherit>Inherit text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).not.toHaveAttribute('data-appearance');
    });

    it('component with inherit should NOT have data-variant attribute', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text inherit>Inherit text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).not.toHaveAttribute('data-variant');
    });

    it('component with inherit should have text-(--text-color) consumer class', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text inherit>Inherit text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('text-(--text-color)');
    });

    it('inherit prop should not leak to DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text inherit>Inherit text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).not.toHaveAttribute('inherit');
    });
  });

  describe('Typography defaults (inherit is default)', () => {
    it('Text should NOT have data-appearance by default (inherit)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text>Default text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).not.toHaveAttribute('data-appearance');
      expect(text).not.toHaveAttribute('data-variant');
    });

    it('Text should have text-(--text-color) class by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text>Default text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('text-(--text-color)');
    });

    it('Title should NOT have data-appearance by default (inherit)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Title>Default title</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).not.toHaveAttribute('data-appearance');
      expect(title).not.toHaveAttribute('data-variant');
    });

    it('SectionTitle should NOT have data-appearance by default (inherit)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle>Default section title</SectionTitle>
        </ThemeProvider>
      );

      const sectionTitle = container.querySelector('h2');
      expect(sectionTitle).not.toHaveAttribute('data-appearance');
      expect(sectionTitle).not.toHaveAttribute('data-variant');
    });

    it('PageTitle should NOT have data-appearance by default (inherit)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle>Default page title</PageTitle>
        </ThemeProvider>
      );

      const pageTitle = container.querySelector('h1');
      expect(pageTitle).not.toHaveAttribute('data-appearance');
      expect(pageTitle).not.toHaveAttribute('data-variant');
    });

    it('Text with explicit primary should have data-appearance="primary"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text primary>Primary text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveAttribute('data-appearance', 'primary');
      expect(text).toHaveClass('text-(--text-color)');
    });

    it('Text with explicit danger should have data-appearance="danger" and data-variant="outline"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text danger>Danger text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveAttribute('data-appearance', 'danger');
      expect(text).toHaveAttribute('data-variant', 'outline');
      expect(text).toHaveClass('text-(--text-color)');
    });

    it('Text with inherit={false} should NOT have data-appearance or text-(--text-color)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text inherit={false}>No appearance text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).not.toHaveAttribute('data-appearance');
      // Without any appearance, consumer classes are not output (alwaysOutput=false for text)
      expect(text).not.toHaveClass('text-(--text-color)');
    });
  });

  describe('Card behavior', () => {
    // Post-simplification: ALL components with a non-inherit appearance now
    // emit data-appearance/data-variant. Card defaults to primary/outline,
    // so it emits those data attributes.
    it('Card should have data-appearance="primary" by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Default card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div.vane-card');
      expect(card).toHaveAttribute('data-appearance', 'primary');
      expect(card).toHaveAttribute('data-variant', 'outline');
    });

    it('Card should have consumer classes and data attributes by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Default card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div.vane-card');
      expect(card).toHaveClass('text-(--text-color)');
      expect(card).toHaveClass('bg-(--bg-color)');
      expect(card).toHaveAttribute('data-appearance', 'primary');
      expect(card).toHaveAttribute('data-variant', 'outline');
    });

    it('Card with explicit primary filled should emit data attributes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card primary filled>Explicit card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div.vane-card');
      expect(card).toHaveAttribute('data-appearance', 'primary');
      expect(card).toHaveAttribute('data-variant', 'filled');
    });

    it('Card with explicit inherit should NOT have data-appearance', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card inherit>Inherit card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div.vane-card');
      expect(card).not.toHaveAttribute('data-appearance');
      expect(card).not.toHaveAttribute('data-variant');
    });

    it('Card with inherit should have consumer classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card inherit>Inherit card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div.vane-card');
      expect(card).toHaveClass('text-(--text-color)');
      expect(card).toHaveClass('bg-(--bg-color)');
    });
  });

  describe('Label defaults (inherit is default)', () => {
    it('Label should NOT have data-appearance by default (inherit)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label>Email</Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).not.toHaveAttribute('data-appearance');
      expect(label).not.toHaveAttribute('data-variant');
    });

    it('Label should have text-(--text-color) class by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label>Email</Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toHaveClass('text-(--text-color)');
    });

    it('Label with explicit danger should have data-appearance="danger"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label danger>Required field</Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toHaveAttribute('data-appearance', 'danger');
      expect(label).toHaveClass('text-(--text-color)');
    });
  });

  describe('List defaults (inherit is default)', () => {
    it('List should NOT have data-appearance by default (inherit)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List><ListItem>Item</ListItem></List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).not.toHaveAttribute('data-appearance');
      expect(list).not.toHaveAttribute('data-variant');
    });

    it('List should have text-(--text-color) class by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List><ListItem>Item</ListItem></List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toHaveClass('text-(--text-color)');
    });

    it('List with explicit danger should have data-appearance="danger"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List danger><ListItem>Warning item</ListItem></List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toHaveAttribute('data-appearance', 'danger');
    });
  });

  describe('Divider defaults (inherit is default)', () => {
    it('Divider should NOT have data-appearance by default (inherit)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider />
        </ThemeProvider>
      );

      const divider = container.querySelector('div.vane-divider');
      expect(divider).not.toHaveAttribute('data-appearance');
      expect(divider).not.toHaveAttribute('data-variant');
    });

    it('Divider should have bg-(--divider-color) class by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider />
        </ThemeProvider>
      );

      const divider = container.querySelector('div.vane-divider');
      expect(divider).toHaveClass('bg-(--divider-color)');
    });

    it('Divider with explicit danger should have data-appearance="danger"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider danger />
        </ThemeProvider>
      );

      const divider = container.querySelector('div.vane-divider');
      expect(divider).toHaveAttribute('data-appearance', 'danger');
    });
  });

  describe('Interaction with transparent', () => {
    it('Card with inherit and transparent should have text-(--text-color) but NOT bg-(--bg-color)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card inherit transparent>Transparent inherit card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div.vane-card');
      expect(card).toHaveClass('text-(--text-color)');
      expect(card).not.toHaveClass('bg-(--bg-color)');
    });
  });

  // ==========================================================================
  // COMPOSITION TESTS
  // Verify that when inherit-mode children are nested inside appearance-setting
  // parents, the DOM structure guarantees correct CSS variable cascading.
  //
  // jsdom cannot compute CSS, but if:
  //   1. Parent sets data-appearance + data-variant (triggers CSS rule → sets --text-color)
  //   2. Child has text-(--text-color) class but NO data-appearance (no CSS rule fires)
  // ...then the child will use the parent's --text-color in a real browser.
  // ==========================================================================

  describe('Composition: inherit children inside appearance parents', () => {

    describe('Text inside Card', () => {
      it('filled Card sets appearance; Text inherits via CSS variables', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Card primary filled>
              <Text>Should inherit white text</Text>
            </Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div.vane-card');
        const text = container.querySelector('p');

        // Parent: Card defines the appearance context
        expect(card).toHaveAttribute('data-appearance', 'primary');
        expect(card).toHaveAttribute('data-variant', 'filled');

        // Child: Text has consumer class but no own appearance → inherits
        expect(text).toHaveClass('text-(--text-color)');
        expect(text).not.toHaveAttribute('data-appearance');
        expect(text).not.toHaveAttribute('data-variant');
      });

      it('danger filled Card sets appearance; all typography inherits', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Card danger filled>
              <Title>Title</Title>
              <Text>Body text</Text>
              <Label>Form label</Label>
            </Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div.vane-card');
        expect(card).toHaveAttribute('data-appearance', 'danger');
        expect(card).toHaveAttribute('data-variant', 'filled');

        // All children inherit — none set their own appearance
        for (const selector of ['h3', 'p', 'label']) {
          const el = container.querySelector(selector);
          expect(el).toHaveClass('text-(--text-color)');
          expect(el).not.toHaveAttribute('data-appearance');
        }
      });

      it('explicit appearance on child overrides inherit', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Card primary filled>
              <Text success>Success text breaks inheritance</Text>
            </Card>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        // Child with explicit appearance sets its own context
        expect(text).toHaveAttribute('data-appearance', 'success');
        expect(text).toHaveAttribute('data-variant', 'outline');
        expect(text).toHaveClass('text-(--text-color)');
      });

      // Regression tests for the Pixels Hero.tsx bug: explicit variant/appearance
      // on descendants of a filled layout must stamp their own data attributes
      // (which trigger the direct CSS rule), not be silently overridden by a
      // descendant inheritance selector. Computed-color verification lives in
      // e2e/variant-inheritance.spec.ts — here we just prove the DOM contract.
      it('Text primary outline inside filled Card keeps its outline attributes', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Card filled primary>
              <Text primary outline>t1</Text>
            </Card>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveAttribute('data-appearance', 'primary');
        expect(text).toHaveAttribute('data-variant', 'outline');
      });

      it('Text primary filled inside filled Card keeps its filled attributes', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Card filled primary>
              <Text primary filled>t2</Text>
            </Card>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveAttribute('data-appearance', 'primary');
        expect(text).toHaveAttribute('data-variant', 'filled');
      });

      it('Stack outline primary inside filled Card keeps its outline attributes', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Card filled primary>
              <Stack outline primary>
                <Text>t3</Text>
              </Stack>
            </Card>
          </ThemeProvider>
        );

        const stack = container.querySelector('div.vane-stack');
        expect(stack).toHaveAttribute('data-appearance', 'primary');
        expect(stack).toHaveAttribute('data-variant', 'outline');
        // inherit-mode Text inside Stack has no attributes of its own — its
        // computed color inherits from the Stack via CSS custom properties.
        const text = container.querySelector('p');
        expect(text).not.toHaveAttribute('data-appearance');
        expect(text).not.toHaveAttribute('data-variant');
      });

      it('Stack filled primary inside filled Card keeps its filled attributes', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Card filled primary>
              <Stack filled primary>
                <Text>t4</Text>
              </Stack>
            </Card>
          </ThemeProvider>
        );

        const stack = container.querySelector('div.vane-stack');
        expect(stack).toHaveAttribute('data-appearance', 'primary');
        expect(stack).toHaveAttribute('data-variant', 'filled');
        const text = container.querySelector('p');
        expect(text).not.toHaveAttribute('data-appearance');
        expect(text).not.toHaveAttribute('data-variant');
      });
    });

    describe('Text inside Row/Stack', () => {
      it('Text inside Row (no appearance) uses root CSS variable defaults', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Row>
              <Text>Row text</Text>
            </Row>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        // Row has no appearance (outline default, no appearance default set to primary for Row)
        // Text uses root --text-color fallback
        expect(text).toHaveClass('text-(--text-color)');
        expect(text).not.toHaveAttribute('data-appearance');
      });

      it('Text inside filled Stack inherits Stack appearance', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Stack brand filled>
              <Text>Stacked text</Text>
            </Stack>
          </ThemeProvider>
        );

        const stack = container.querySelector('div.vane-stack');
        const text = container.querySelector('p');

        expect(stack).toHaveAttribute('data-appearance', 'brand');
        expect(stack).toHaveAttribute('data-variant', 'filled');
        expect(text).toHaveClass('text-(--text-color)');
        expect(text).not.toHaveAttribute('data-appearance');
      });
    });

    describe('Nested layout containers', () => {
      it('deepest appearance-setting ancestor wins via CSS cascade', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Section primary filled>
              <Card danger filled>
                <Text>Should use danger context (nearest parent)</Text>
              </Card>
            </Section>
          </ThemeProvider>
        );

        const section = container.querySelector('div.vane-section');
        const card = container.querySelector('div.vane-card');
        const text = container.querySelector('p');

        // Both ancestors set appearance
        expect(section).toHaveAttribute('data-appearance', 'primary');
        expect(card).toHaveAttribute('data-appearance', 'danger');

        // Text inherits — nearest parent (Card danger) wins via CSS cascade
        expect(text).toHaveClass('text-(--text-color)');
        expect(text).not.toHaveAttribute('data-appearance');
      });
    });

    describe('Divider and List inside appearance parent', () => {
      it('Divider inside filled Card inherits border color', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Card brand filled>
              <Text>Above divider</Text>
              <Divider />
              <Text>Below divider</Text>
            </Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div.vane-card');
        const divider = container.querySelector('div.vane-divider');

        expect(card).toHaveAttribute('data-appearance', 'brand');
        expect(card).toHaveAttribute('data-variant', 'filled');
        expect(divider).toHaveClass('bg-(--divider-color)');
        expect(divider).not.toHaveAttribute('data-appearance');
      });

      it('List inside filled Card inherits text color', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Card success filled>
              <List>
                <ListItem>Item 1</ListItem>
                <ListItem>Item 2</ListItem>
              </List>
            </Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div.vane-card');
        const list = container.querySelector('ul');

        expect(card).toHaveAttribute('data-appearance', 'success');
        expect(card).toHaveAttribute('data-variant', 'filled');
        expect(list).toHaveClass('text-(--text-color)');
        expect(list).not.toHaveAttribute('data-appearance');
      });
    });

    describe('Full page composition', () => {
      it('complex nested layout: all typography inherits from nearest appearance parent', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Container>
              <Section>
                <PageTitle>Page heading</PageTitle>
                <Card primary filled>
                  <Title>Card title</Title>
                  <Text>Card body</Text>
                  <Label>Card label</Label>
                  <Divider />
                  <List>
                    <ListItem>List item</ListItem>
                  </List>
                </Card>
              </Section>
            </Container>
          </ThemeProvider>
        );

        const card = container.querySelector('div.vane-card');
        expect(card).toHaveAttribute('data-appearance', 'primary');
        expect(card).toHaveAttribute('data-variant', 'filled');

        // All children inside Card: have consumer classes, no own appearance
        const title = card!.querySelector('h3');
        const text = card!.querySelector('p');
        const label = card!.querySelector('label');
        const divider = card!.querySelector('div.vane-divider');
        const list = card!.querySelector('ul');

        for (const el of [title, text, label, list]) {
          expect(el).toHaveClass('text-(--text-color)');
          expect(el).not.toHaveAttribute('data-appearance');
        }
        expect(divider).toHaveClass('bg-(--divider-color)');
        expect(divider).not.toHaveAttribute('data-appearance');

        // PageTitle outside Card: also inherits (no appearance parent → root default)
        const pageTitle = container.querySelector('h1');
        expect(pageTitle).toHaveClass('text-(--text-color)');
        expect(pageTitle).not.toHaveAttribute('data-appearance');
      });
    });
  });

  // ==========================================================================
  // CSS RULE VERIFICATION
  // Parse vars.css to confirm the CSS rules that drive inheritance exist.
  // This closes the loop: composition tests prove the DOM is correct,
  // these tests prove the CSS rules that consume the DOM are correct.
  // Together they guarantee correct visual behavior in a real browser.
  // ==========================================================================

  describe('CSS rule verification (vars.css)', () => {

    it('root should define --text-color fallback', () => {
      expect(varsCSS).toMatch(/:root\s*\{[^}]*--text-color:\s*var\(--color-text-primary\)/);
    });

    it('root should define --border-color fallback', () => {
      expect(varsCSS).toMatch(/:root\s*\{[^}]*--border-color:\s*var\(--color-border-primary\)/);
    });

    it('appearance rules should set --app-text intermediates', () => {
      // Two-axis architecture: appearance rules set --app-* intermediates,
      // variant rules map them to final --text-color etc.
      expect(varsCSS).toMatch(
        /\[data-appearance="primary"\]\s*\{[^}]*--app-text:\s*var\(--color-text-primary\)/
      );
    });

    it('variant outline rule should map --app-text to --text-color', () => {
      expect(varsCSS).toMatch(
        /\[data-variant="outline"\]\s*\{[^}]*--text-color:\s*var\(--app-text\)/
      );
    });

    it('variant filled rule should map --app-text-filled to --text-color', () => {
      expect(varsCSS).toMatch(
        /\[data-variant="filled"\]\s*\{[^}]*--text-color:\s*var\(--app-text-filled\)/
      );
    });

    it('every appearance should have its own [data-appearance] rule', () => {
      const appearances = ['primary', 'brand', 'secondary', 'tertiary', 'accent', 'success', 'danger', 'warning', 'info', 'link'];
      for (const appearance of appearances) {
        expect(varsCSS).toContain(`[data-appearance="${appearance}"]`);
      }
    });

    it('every variant should have its own [data-variant] rule', () => {
      const variants = ['outline', 'filled', 'ghost'];
      for (const variant of variants) {
        expect(varsCSS).toContain(`[data-variant="${variant}"]`);
      }
    });

    it('filled rules should NOT include a descendant inheritance selector', () => {
      // The old "variant inheritance" descendant selector was removed because
      // it silently overrode explicit variant/appearance on child elements
      // (specificity war with the direct [data-variant][data-appearance] rule).
      // Inheritance is now done via CSS custom-property cascade: filled parents
      // set vars on themselves, inherit-mode children read them. Explicit props
      // on a child always win.
      const appearances = ['primary', 'brand', 'secondary', 'tertiary', 'accent', 'success', 'danger', 'warning', 'info', 'link'];
      for (const appearance of appearances) {
        expect(varsCSS).not.toContain(
          `[data-vane-type="layout"][data-variant="filled"] [data-variant="outline"][data-appearance="${appearance}"]`
        );
      }
    });

    it('root should define the full outline-primary palette for inherit-mode fallback', () => {
      // Components that render in inherit mode (no data-variant / data-appearance)
      // read their colors from :root. :root must mirror outline-primary so that
      // e.g. a standalone <Button> looks identical to <Button primary outline>.
      expect(varsCSS).toMatch(/:root\s*\{[^}]*--text-color:\s*var\(--color-text-primary\)/);
      expect(varsCSS).toMatch(/:root\s*\{[^}]*--bg-color:\s*var\(--color-bg-primary\)/);
      expect(varsCSS).toMatch(/:root\s*\{[^}]*--border-color:\s*var\(--color-border-primary\)/);
      expect(varsCSS).toMatch(/:root\s*\{[^}]*--ring-color:\s*var\(--color-border-primary\)/);
    });

    it('no CSS rule should reference data-appearance="inherit"', () => {
      // inherit should NEVER appear as a CSS selector — it works by absence
      expect(varsCSS).not.toContain('data-appearance="inherit"');
    });
  });

  // ==========================================================================
  // GRANULAR INHERIT FLAGS
  // Test the individual inheritSize, inheritColor, inheritBg, inheritBorder
  // flags and their interaction with component defaults and explicit props.
  // ==========================================================================

  describe('Granular inherit flags', () => {
    it('Link with inheritSize emits text-[length:inherit] while keeping link appearance', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="/test">Link text</Link>
        </ThemeProvider>
      );
      const link = container.querySelector('a');
      expect(link).toHaveAttribute('data-appearance', 'link');
      expect(link).toHaveClass('text-[length:inherit]');
      expect(link).toHaveClass('leading-[inherit]');
    });

    it('Link with noInheritSize keeps own font-size', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="/test" noInheritSize>Link text</Link>
        </ThemeProvider>
      );
      const link = container.querySelector('a');
      expect(link).toHaveClass('text-(length:--fs)');
      expect(link).toHaveClass('leading-(--lh)');
    });

    it('inherit appearance sets all four flags (inheritSize, inheritColor, inheritBg, inheritBorder)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text inherit>Text</Text>
        </ThemeProvider>
      );
      const text = container.querySelector('p');
      expect(text).not.toHaveAttribute('data-appearance');
      expect(text).toHaveClass('text-[length:inherit]');
      expect(text).toHaveClass('leading-[inherit]');
    });

    it('inherit appearance + noInheritSize keeps own size but inherits color', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text inherit noInheritSize>Text</Text>
        </ThemeProvider>
      );
      const text = container.querySelector('p');
      expect(text).not.toHaveAttribute('data-appearance');
      expect(text).toHaveClass('text-(length:--fs)');
      expect(text).toHaveClass('leading-(--lh)');
    });

    it('Code with inheritSize default inherits font-size but keeps primary appearance', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Code>code</Code>
        </ThemeProvider>
      );
      const code = container.querySelector('code');
      expect(code).toHaveAttribute('data-appearance', 'primary');
      expect(code).toHaveClass('text-[length:inherit]');
    });

    it('Title (responsive) keeps own size — responsive overrides inheritSize', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Title>Title</Title>
        </ThemeProvider>
      );
      const title = container.querySelector('h3');
      expect(title).not.toHaveAttribute('data-appearance');
      expect(title).toHaveClass('text-(length:--fs-desktop)');
      expect(title).not.toHaveClass('text-[length:inherit]');
    });

    it('inheritColor suppresses data-appearance even with explicit appearance', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text primary inheritColor>Inheriting color despite primary</Text>
        </ThemeProvider>
      );
      const text = container.querySelector('p');
      // inheritColor wins — data-appearance is suppressed
      expect(text).not.toHaveAttribute('data-appearance');
    });

    it('Kbd with inheritSize default inherits font-size but keeps primary appearance', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Kbd>Ctrl+C</Kbd>
        </ThemeProvider>
      );
      const kbd = container.querySelector('kbd');
      expect(kbd).toHaveAttribute('data-appearance', 'primary');
      expect(kbd).toHaveClass('text-[length:inherit]');
    });

    it('Mark with inheritSize default inherits font-size but keeps warning appearance', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Mark>highlighted</Mark>
        </ThemeProvider>
      );
      const mark = container.querySelector('mark');
      expect(mark).toHaveAttribute('data-appearance', 'warning');
      expect(mark).toHaveClass('text-[length:inherit]');
    });
  });
});
