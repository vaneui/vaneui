import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Button,
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

  describe('Button Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button>Click me</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('w-fit', 'h-fit', 'cursor-pointer');
      expect(button).toHaveClass('text-base'); // md size
      expect(button).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(button).toHaveClass('font-sans'); // sans family
      expect(button).toHaveClass('font-semibold'); // semibold weight
      expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });
  });

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
  });

  describe('Divider Component', () => {
    it('should render with default theme classes', () => {
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

  describe('Component Variants', () => {
    it('Button with primary variant should have primary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button primary>Primary Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('text-(--text-color-primary)'); // primary color
      expect(button).toHaveClass('bg-(--background-color-primary)'); // primary background
      expect(button).toHaveClass('px-4', 'py-2'); // padding
    });

    it('Button with secondary variant should have secondary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button secondary>Secondary Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('text-(--text-color-secondary)'); // secondary color
      expect(button).toHaveClass('bg-(--background-color-secondary)'); // secondary background
    });

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

  describe('Custom className override', () => {
    it('should merge custom className with theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button className="custom-class">Custom Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('w-fit', 'h-fit', 'cursor-pointer'); // theme classes
      expect(button).toHaveClass('custom-class'); // custom class
    });
  });
});