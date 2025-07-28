import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  List,
  ListItem,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('List and ListItem Components Tests', () => {

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

    it('should apply different appearance variants', () => {
      const appearances = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'accent'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <List {...{[appearance]: true}}>
              <ListItem>Test item</ListItem>
            </List>
          </ThemeProvider>
        );

        const list = container.querySelector('ul');
        expect(list).toHaveClass(`text-(--text-color-${appearance})`);
      });
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List className="custom-list-class">
            <ListItem>Custom list item</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toHaveClass('list-disc', 'list-inside'); // theme classes
      expect(list).toHaveClass('custom-list-class'); // custom class
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

    it('should inherit text color from parent List with primary appearance', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List primary>
            <ListItem>Primary list item</ListItem>
            <ListItem>Another primary item</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      const listItems = container.querySelectorAll('li');
      
      // Verify the List has primary text color
      expect(list).toHaveClass('text-(--text-color-primary)');
      
      // Verify ListItems inherit the color through CSS (no explicit text color class)
      listItems.forEach(listItem => {
        expect(listItem).not.toHaveClass('text-(--text-color-default)');
        expect(listItem).not.toHaveClass('text-(--text-color-primary)');
        expect(listItem).not.toHaveClass('text-(--text-color-secondary)');
        // ListItem should inherit text color from parent List via CSS cascade
        const computedStyle = window.getComputedStyle(listItem);
        // Note: In actual browser, this would inherit the CSS custom property value
        // In test environment, we verify the inheritance pattern by ensuring no explicit color classes
      });
    });

    it('should inherit text color from parent List with secondary appearance', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List secondary>
            <ListItem>Secondary list item</ListItem>
            <ListItem>Another secondary item</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      const listItems = container.querySelectorAll('li');
      
      // Verify the List has secondary text color
      expect(list).toHaveClass('text-(--text-color-secondary)');
      
      // Verify ListItems inherit the color through CSS (no explicit text color class)
      listItems.forEach(listItem => {
        expect(listItem).not.toHaveClass('text-(--text-color-default)');
        expect(listItem).not.toHaveClass('text-(--text-color-primary)');
        expect(listItem).not.toHaveClass('text-(--text-color-secondary)');
        // ListItem should inherit text color from parent List via CSS cascade
      });
    });

    it('should inherit from different List appearance variants', () => {
      const appearances = ['success', 'danger', 'warning', 'info', 'accent'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <List {...{[appearance]: true}}>
              <ListItem>{appearance} list item</ListItem>
            </List>
          </ThemeProvider>
        );

        const list = container.querySelector('ul');
        const listItem = container.querySelector('li');
        
        // Verify the List has the correct appearance text color
        expect(list).toHaveClass(`text-(--text-color-${appearance})`);
        
        // Verify ListItem doesn't have any explicit text color classes (inherits from parent)
        expect(listItem).not.toHaveClass('text-(--text-color-default)');
        expect(listItem).not.toHaveClass(`text-(--text-color-${appearance})`);
      });
    });

    it('should work with nested List structures', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List primary>
            <ListItem>Primary parent item</ListItem>
            <List secondary>
              <ListItem>Secondary nested item</ListItem>
            </List>
          </List>
        </ThemeProvider>
      );

      const lists = container.querySelectorAll('ul');
      const [parentList, nestedList] = lists;
      const listItems = container.querySelectorAll('li');
      
      // Parent List should have primary color
      expect(parentList).toHaveClass('text-(--text-color-primary)');
      
      // Nested List should have secondary color
      expect(nestedList).toHaveClass('text-(--text-color-secondary)');
      
      // All ListItems should inherit from their immediate parent List
      listItems.forEach(listItem => {
        expect(listItem).not.toHaveClass('text-(--text-color-primary)');
        expect(listItem).not.toHaveClass('text-(--text-color-secondary)');
        expect(listItem).not.toHaveClass('text-(--text-color-default)');
      });
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem className="custom-item-class">Custom item content</ListItem>
          </List>
        </ThemeProvider>
      );

      const listItem = container.querySelector('li');
      expect(listItem).toHaveClass('custom-item-class');
      expect(listItem).toHaveTextContent('Custom item content');
    });

    it('should support different HTML tags', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem tag="div">Div list item</ListItem>
          </List>
        </ThemeProvider>
      );

      const listItem = container.querySelector('div');
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveTextContent('Div list item');
    });
  });
});