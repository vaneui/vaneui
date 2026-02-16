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
  ThemeProvider,
  defaultTheme
} from '../../index';

// Load vars.css for CSS rule verification tests
const varsCSS = fs.readFileSync(
  path.resolve(__dirname, '../css/vars.css'),
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

  describe('Card behavior (unchanged)', () => {
    it('Card should still have data-appearance="primary" (not inherit)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Default card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div.vane-card');
      expect(card).toHaveAttribute('data-appearance', 'primary');
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

    it('Divider should have bg-(--border-color) class by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider />
        </ThemeProvider>
      );

      const divider = container.querySelector('div.vane-divider');
      expect(divider).toHaveClass('bg-(--border-color)');
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
        expect(divider).toHaveClass('bg-(--border-color)');
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
        expect(divider).toHaveClass('bg-(--border-color)');
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

    it('outline+primary rule should set --text-color', () => {
      // The CSS rule that fires when data-variant="outline" data-appearance="primary"
      expect(varsCSS).toMatch(
        /\[data-variant="outline"\]\[data-appearance="primary"\]\s*\{[^}]*--text-color:/
      );
    });

    it('filled+primary rule should set --text-color to filled value', () => {
      expect(varsCSS).toMatch(
        /\[data-variant="filled"\]\[data-appearance="primary"\]\s*\{[^}]*--text-color:\s*var\(--color-text-filled-primary\)/
      );
    });

    it('filled+danger rule should set --text-color to filled-danger value', () => {
      expect(varsCSS).toMatch(
        /\[data-variant="filled"\]\[data-appearance="danger"\]\s*\{[^}]*--text-color:\s*var\(--color-text-filled-danger\)/
      );
    });

    it('every appearance should have both outline and filled rules', () => {
      const appearances = ['primary', 'brand', 'secondary', 'tertiary', 'accent', 'success', 'danger', 'warning', 'info', 'link'];
      for (const appearance of appearances) {
        expect(varsCSS).toContain(`[data-variant="outline"][data-appearance="${appearance}"]`);
        expect(varsCSS).toContain(`[data-variant="filled"][data-appearance="${appearance}"]`);
      }
    });

    it('no CSS rule should reference data-appearance="inherit"', () => {
      // inherit should NEVER appear as a CSS selector — it works by absence
      expect(varsCSS).not.toContain('data-appearance="inherit"');
    });
  });
});
