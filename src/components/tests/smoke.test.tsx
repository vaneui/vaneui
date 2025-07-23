import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Badge,
  Card,
  Chip,
  Divider,
  Container,
  Section,
  Col,
  Row,
  Stack,
  Grid3,
  Grid4,
  Text,
  Title,
  PageTitle,
  SectionTitle,
  Link,
  List,
  ListItem,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Component Smoke Tests - Default Theme Classes', () => {


  describe('Badge Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge>Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('w-fit', 'h-fit', 'whitespace-nowrap');
      expect(badge).toHaveClass('text-base'); // md size
      expect(badge).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(badge).toHaveClass('font-sans');
      expect(badge).toHaveClass('font-semibold'); // semibold weight
      expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'uppercase');
    });

    it('should render transparent and link badges with transparent border/ring and no shadow', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge id="transparent" transparent>Transparent Badge</Badge>
          <Badge id="link" link>Link Badge</Badge>
        </ThemeProvider>
      );

      const badge1 = container.querySelector('#transparent');
      const badge2 = container.querySelector('#link');

      // Should not have shadows
      expect(badge1).not.toHaveClass('shadow-sm', 'hover:shadow-md');
      expect(badge2).not.toHaveClass('shadow-sm', 'hover:shadow-md');

      // Should have transparent border classes
      expect(badge1).toHaveClass('border-transparent');
      expect(badge2).toHaveClass('border-transparent');

      // Should have transparent ring classes
      expect(badge1).toHaveClass('ring-transparent');
      expect(badge2).toHaveClass('ring-transparent');
    });
  });

  describe('Card Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Card content</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('px-4', 'py-4', 'gap-4', 'flex');
      expect(card).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(card).toHaveClass('bg-(--layout-background-default)', 'rounded-xl', 'flex-col');
      expect(card).toHaveClass('border-(--border-color-default)', 'hover:border', 'active:border');
    });
  });

  describe('Chip Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip>Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('w-fit', 'h-fit', 'whitespace-nowrap');
      expect(chip).toHaveClass('text-base'); // md size
      expect(chip).toHaveClass('text-(--text-color-secondary)'); // secondary appearance (default for chip)
      expect(chip).toHaveClass('font-mono'); // mono font for chip
      expect(chip).toHaveClass('font-normal'); // normal weight
      expect(chip).toHaveClass('inline-flex', 'items-center', 'rounded-lg');
    });

    it('should render transparent and link chips with transparent border/ring and no shadow', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip id="transparent" transparent>Transparent Chip</Chip>
          <Chip id="link" link>Link Chip</Chip>
        </ThemeProvider>
      );

      const chip1 = container.querySelector('#transparent');
      const chip2 = container.querySelector('#link');

      // Should not have shadows
      expect(chip1).not.toHaveClass('shadow-sm', 'hover:shadow-md');
      expect(chip2).not.toHaveClass('shadow-sm', 'hover:shadow-md');

      // Should have transparent border classes
      expect(chip1).toHaveClass('border-transparent');
      expect(chip2).toHaveClass('border-transparent');

      // Should have transparent ring classes
      expect(chip1).toHaveClass('ring-transparent');
      expect(chip2).toHaveClass('ring-transparent');
    });
  });

  describe('Divider Component', () => {
    it('should render with default theme classes and no padding by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      // Divider uses base component theme with default appearance
      expect(divider).toHaveClass('bg-(--border-color-default)'); // default border color
      expect(divider).toHaveClass('h-px', 'w-full');
      expect(divider).toHaveClass('py-0'); // no padding by default
    });

    it('should apply padding when padding prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider padding/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('py-6'); // md size padding from PyTheme
    });

    it('should apply different padding sizes', () => {
      const {container: containerXs} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider padding xs/>
        </ThemeProvider>
      );

      const {container: containerLg} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider padding lg/>
        </ThemeProvider>
      );

      const dividerXs = containerXs.querySelector('div');
      const dividerLg = containerLg.querySelector('div');

      expect(dividerXs).toHaveClass('py-2'); // xs size padding
      expect(dividerLg).toHaveClass('py-8'); // lg size padding
    });

    it('should explicitly apply noPadding when noPadding prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider noPadding/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('py-0'); // no padding
    });
  });

  describe('Layout Components', () => {
    it('Container should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container>Container content</Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toBeInTheDocument();
      expect(containerEl).toHaveClass('bg-transparent'); // transparent background
      expect(containerEl).toHaveClass('mx-auto', 'w-full', 'max-w-5xl');
    });

    it('Section should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section>Section content</Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('bg-(--layout-background-default)'); // layout background
      expect(section).toHaveClass('w-full', 'gap-8', 'flex', 'flex-col', 'items-start');
    });

    it('Row should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row>Row content</Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toBeInTheDocument();
      expect(row).toHaveClass('bg-transparent'); // transparent background
      expect(row).toHaveClass('flex', 'flex-row', 'gap-4', 'items-center');
    });

    it('Col should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col>Col content</Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toBeInTheDocument();
      expect(col).toHaveClass('bg-transparent'); // transparent background
      expect(col).toHaveClass('flex', 'flex-col', 'gap-4');
    });

    it('Stack should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack>Stack content</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveClass('bg-transparent'); // transparent background
      expect(stack).toHaveClass('flex', 'flex-wrap', 'flex-col', 'gap-4');
    });

    it('Stack should apply row direction when row prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack row>Stack row content</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveClass('flex-row'); // row direction
      expect(stack).not.toHaveClass('flex-col'); // should not have column
    });

    it('Stack should apply column direction when column prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack column>Stack column content</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveClass('flex-col'); // column direction
      expect(stack).not.toHaveClass('flex-row'); // should not have row
    });

    it('Stack should apply reverse direction when reverse prop is true with row', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack row reverse>Stack row reverse content</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveClass('flex-row-reverse'); // row reverse direction
    });

    it('Stack should apply reverse direction when reverse prop is true with column', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack column reverse>Stack column reverse content</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveClass('flex-col-reverse'); // column reverse direction
    });

    it('Grid3 should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3>Grid content</Grid3>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3');
      expect(grid).toHaveClass('gap-6', 'max-lg:gap-4');
    });

    it('Grid4 should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4>Grid content</Grid4>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4');
      expect(grid).toHaveClass('gap-6', 'max-lg:gap-4');
    });
  });

  describe('Typography Components', () => {
    it('Text should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text>Text content</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('p-0', 'm-0', 'w-fit');
      expect(text).toHaveClass('text-base'); // md size
      expect(text).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(text).toHaveClass('font-sans');
      expect(text).toHaveClass('font-normal');
    });

    it('Title should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title>Title content</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-balance', 'w-fit');
      expect(title).toHaveClass('text-2xl'); // md size for title
      expect(title).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(title).toHaveClass('font-sans');
      expect(title).toHaveClass('font-semibold');
    });

    it('PageTitle should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle>Page Title</PageTitle>
        </ThemeProvider>
      );

      const pageTitle = container.querySelector('h1');
      expect(pageTitle).toBeInTheDocument();
      expect(pageTitle).toHaveClass('text-balance', 'tracking-tight', 'w-fit');
      expect(pageTitle).toHaveClass('text-5xl'); // md size for page title
      expect(pageTitle).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(pageTitle).toHaveClass('font-sans');
      expect(pageTitle).toHaveClass('font-semibold');
    });

    it('SectionTitle should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle>Section Title</SectionTitle>
        </ThemeProvider>
      );

      const sectionTitle = container.querySelector('h2');
      expect(sectionTitle).toBeInTheDocument();
      expect(sectionTitle).toHaveClass('text-balance', 'w-fit');
      expect(sectionTitle).toHaveClass('text-4xl'); // md size for section title
      expect(sectionTitle).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(sectionTitle).toHaveClass('font-sans');
      expect(sectionTitle).toHaveClass('font-semibold');
    });

    it('Link should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test">Link content</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('hover:underline', 'w-fit');
      expect(link).toHaveClass('text-base'); // md size
      expect(link).toHaveClass('text-(--text-color-link)'); // link appearance
      expect(link).toHaveClass('font-sans');
      expect(link).toHaveClass('font-normal');
    });

    it('List should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('list-disc', 'list-inside');
      expect(list).toHaveClass('text-base'); // md size
      expect(list).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(list).toHaveClass('font-sans');
      expect(list).toHaveClass('font-normal');
    });

    it('ListItem should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem>List item content</ListItem>
          </List>
        </ThemeProvider>
      );

      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
      // ListItem inherits classes from parent List, no direct classes applied
      expect(listItem).toBeInTheDocument();
    });
  });

  describe('Badge and Chip Border, Ring, and Shadow Behavior', () => {
    it('should have transparent borders, rings, and no shadows for transparent and link variants in both outline and filled modes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge id="badge-outline-transparent" transparent>Outline Transparent</Badge>
          <Badge id="badge-outline-link" link>Outline Link</Badge>
          <Badge id="badge-filled-transparent" filled transparent>Filled Transparent</Badge>
          <Badge id="badge-filled-link" filled link>Filled Link</Badge>

          <Chip id="chip-outline-transparent" transparent>Outline Transparent</Chip>
          <Chip id="chip-outline-link" link>Outline Link</Chip>
          <Chip id="chip-filled-transparent" filled transparent>Filled Transparent</Chip>
          <Chip id="chip-filled-link" filled link>Filled Link</Chip>
        </ThemeProvider>
      );

      // Test all badge variants
      const badgeOutlineTransparent = container.querySelector('#badge-outline-transparent');
      const badgeOutlineLink = container.querySelector('#badge-outline-link');
      const badgeFilledTransparent = container.querySelector('#badge-filled-transparent');
      const badgeFilledLink = container.querySelector('#badge-filled-link');

      [badgeOutlineTransparent, badgeOutlineLink, badgeFilledTransparent, badgeFilledLink].forEach(badge => {
        expect(badge).not.toHaveClass('shadow-sm', 'hover:shadow-md', 'shadow-lg');
        expect(badge).toHaveClass('border-transparent');
        expect(badge).toHaveClass('ring-transparent');
      });

      // Test all chip variants
      const chipOutlineTransparent = container.querySelector('#chip-outline-transparent');
      const chipOutlineLink = container.querySelector('#chip-outline-link');
      const chipFilledTransparent = container.querySelector('#chip-filled-transparent');
      const chipFilledLink = container.querySelector('#chip-filled-link');

      [chipOutlineTransparent, chipOutlineLink, chipFilledTransparent, chipFilledLink].forEach(chip => {
        expect(chip).not.toHaveClass('shadow-sm', 'hover:shadow-md', 'shadow-lg');
        expect(chip).toHaveClass('border-transparent');
        expect(chip).toHaveClass('ring-transparent');
      });
    });
  });

  describe('Component Variants', () => {
    it('Text with different size should have correct size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text lg>Large text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('text-lg'); // lg size
    });

    it('List with different size should have correct padding', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List lg>
            <ListItem>Item</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('text-lg', 'pl-8'); // lg size should have pl-8 padding
    });
  });

  describe('Typography Layout Props', () => {
    it('Text should apply display layout props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text flex>Text with flex display</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('flex'); // display: flex
    });

    it('Title should apply position layout props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title relative>Title with relative position</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('relative'); // position: relative
    });

    it('PageTitle should apply flex items alignment props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle flex itemsCenter>Page Title with items center</PageTitle>
        </ThemeProvider>
      );

      const pageTitle = container.querySelector('h1');
      expect(pageTitle).toBeInTheDocument();
      expect(pageTitle).toHaveClass('flex'); // display: flex
      expect(pageTitle).toHaveClass('items-center'); // align-items: center
    });

    it('SectionTitle should apply justify content props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle flex justifyCenter>Section Title with justify center</SectionTitle>
        </ThemeProvider>
      );

      const sectionTitle = container.querySelector('h2');
      expect(sectionTitle).toBeInTheDocument();
      expect(sectionTitle).toHaveClass('flex'); // display: flex
      expect(sectionTitle).toHaveClass('justify-center'); // justify-content: center
    });

    it('Link should apply overflow props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" overflowHidden>Link with overflow hidden</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('overflow-hidden'); // overflow: hidden
    });

    it('Text should apply multiple layout props together', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text flex itemsCenter justifyBetween relative>Text with multiple layout props</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('flex'); // display: flex
      expect(text).toHaveClass('items-center'); // align-items: center
      expect(text).toHaveClass('justify-between'); // justify-content: space-between
      expect(text).toHaveClass('relative'); // position: relative
    });

    it('List should apply layout props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List flex itemsStart>
            <ListItem>Item with layout</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('flex'); // display: flex
      expect(list).toHaveClass('items-start'); // align-items: flex-start
    });

    it('Typography components should support responsive hide props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text mdHide>Text hidden on medium screens</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('max-md:hidden'); // hidden on medium and smaller screens
    });

    it('Typography components should support grid display', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title grid>Grid title</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('grid'); // display: grid
    });

    it('Typography components should support absolute positioning', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" absolute>Absolute positioned link</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('absolute'); // position: absolute
    });
  });

});