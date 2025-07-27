import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
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

describe('Typography Components Tests', () => {

  describe('Text Component', () => {
    it('should render with default theme classes', () => {
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

    it('should apply different size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text lg>Large text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('text-lg'); // lg size
    });

    it('should apply layout props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text flex itemsCenter justifyBetween relative>Text with multiple layout props</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('flex', 'items-center', 'justify-between', 'relative');
    });

    it('should support responsive hide props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text mdHide>Text hidden on medium screens</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('max-md:hidden');
    });
  });

  describe('Title Component', () => {
    it('should render with default theme classes', () => {
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

    it('should apply position layout props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title relative>Title with relative position</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).toHaveClass('relative');
    });

    it('should support grid display', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title grid>Grid title</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).toHaveClass('grid');
    });
  });

  describe('PageTitle Component', () => {
    it('should render with default theme classes', () => {
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

    it('should apply flex items alignment props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle flex itemsCenter>Page Title with items center</PageTitle>
        </ThemeProvider>
      );

      const pageTitle = container.querySelector('h1');
      expect(pageTitle).toHaveClass('flex', 'items-center');
    });
  });

  describe('SectionTitle Component', () => {
    it('should render with default theme classes', () => {
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

    it('should apply justify content props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle flex justifyCenter>Section Title with justify center</SectionTitle>
        </ThemeProvider>
      );

      const sectionTitle = container.querySelector('h2');
      expect(sectionTitle).toHaveClass('flex', 'justify-center');
    });
  });

  describe('Link Component', () => {
    it('should render with default theme classes', () => {
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

    it('should apply overflow props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" overflowHidden>Link with overflow hidden</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toHaveClass('overflow-hidden');
    });

    it('should support absolute positioning', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" absolute>Absolute positioned link</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toHaveClass('absolute');
    });
  });

  describe('List Component', () => {
    it('should render with default theme classes', () => {
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

    it('should render with different size and padding', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List lg>
            <ListItem>Item</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toHaveClass('text-lg', 'pl-8'); // lg size should have pl-8 padding
    });

    it('should apply layout props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List flex itemsStart>
            <ListItem>Item with layout</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toHaveClass('flex', 'items-start');
    });
  });

  describe('ListItem Component', () => {
    it('should render correctly within a List', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem>List item content</ListItem>
          </List>
        </ThemeProvider>
      );

      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveTextContent('List item content');
    });
  });

  describe('Typography Appearance Variants', () => {
    it('should apply different appearance variants', () => {
      const {container: primaryContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text primary>Primary text</Text>
        </ThemeProvider>
      );

      const {container: secondaryContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text secondary>Secondary text</Text>
        </ThemeProvider>
      );

      const primaryText = primaryContainer.querySelector('p');
      const secondaryText = secondaryContainer.querySelector('p');

      expect(primaryText).toHaveClass('text-(--text-color-primary)');
      expect(secondaryText).toHaveClass('text-(--text-color-secondary)');
    });
  });

  describe('Typography Font Properties', () => {
    it('should apply different font weights', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text bold>Bold text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('font-bold');
    });

    it('should apply different font families', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text serif>Serif text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('font-serif');
    });

    it('should apply text decoration styles', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text underline>Underlined text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('underline');
    });

    it('should apply text transform styles', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text uppercase>Uppercase text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('uppercase');
    });
  });

  describe('Custom className override', () => {
    it('should merge custom className with theme classes for Text', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text className="custom-text-class">Custom Text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('text-base', 'font-sans'); // theme classes
      expect(text).toHaveClass('custom-text-class'); // custom class
    });

    it('should merge custom className with theme classes for Title', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title className="custom-title-class">Custom Title</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).toHaveClass('text-2xl', 'font-semibold'); // theme classes
      expect(title).toHaveClass('custom-title-class'); // custom class
    });
  });
});