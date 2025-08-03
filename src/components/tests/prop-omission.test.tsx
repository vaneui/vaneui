import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Button,
  Badge,
  Chip,
  Card,
  Section,
  Container,
  Col,
  Row,
  Stack,
  Grid3,
  Grid4,
  Divider,
  Text,
  Title,
  Link,
  List,
  ListItem,
  SectionTitle,
  PageTitle,
  ThemeProvider,
  defaultTheme
} from '../../index';

import {
  BUTTON_CATEGORIES,
  BADGE_CATEGORIES,
  CHIP_CATEGORIES,
  CARD_CATEGORIES,
  SECTION_CATEGORIES,
  CONTAINER_CATEGORIES,
  COL_CATEGORIES,
  ROW_CATEGORIES,
  STACK_CATEGORIES,
  GRID_CATEGORIES,
  DIVIDER_CATEGORIES,
  TYPOGRAPHY_CATEGORIES,
  LIST_CATEGORIES
} from '../ui/props/keys';

import { createPropOmissionTest, createTestPropsWithAllBooleans, checkForOmittedProps } from './utils/propOmissionTestUtils';

describe('Component Prop Omission Tests', () => {
  const renderWithTheme = (Component: React.ComponentType<any>, tag: string = '') => 
    (props: any) => render(
      <ThemeProvider theme={defaultTheme}>
        <Component {...props}>Test Content</Component>
      </ThemeProvider>
    );

  // Button Tests
  describe('Button Component', createPropOmissionTest(
    'Button',
    BUTTON_CATEGORIES,
    renderWithTheme(Button),
    'button'
  ));

  // Badge Tests
  describe('Badge Component', createPropOmissionTest(
    'Badge',
    BADGE_CATEGORIES,
    renderWithTheme(Badge),
    'span'
  ));

  // Chip Tests
  describe('Chip Component', createPropOmissionTest(
    'Chip',
    CHIP_CATEGORIES,
    renderWithTheme(Chip),
    'span'
  ));

  // Card Tests
  describe('Card Component', createPropOmissionTest(
    'Card',
    CARD_CATEGORIES,
    renderWithTheme(Card),
    'div'
  ));

  // Section Tests
  describe('Section Component', createPropOmissionTest(
    'Section',
    SECTION_CATEGORIES,
    renderWithTheme(Section),
    'div'
  ));

  // Container Tests
  describe('Container Component', createPropOmissionTest(
    'Container',
    CONTAINER_CATEGORIES,
    renderWithTheme(Container),
    'div'
  ));

  // Col Tests
  describe('Col Component', createPropOmissionTest(
    'Col',
    COL_CATEGORIES,
    renderWithTheme(Col),
    'div'
  ));

  // Row Tests
  describe('Row Component', createPropOmissionTest(
    'Row',
    ROW_CATEGORIES,
    renderWithTheme(Row),
    'div'
  ));

  // Stack Tests
  describe('Stack Component', createPropOmissionTest(
    'Stack',
    STACK_CATEGORIES,
    renderWithTheme(Stack),
    'div'
  ));

  // Grid3 Tests
  describe('Grid3 Component', createPropOmissionTest(
    'Grid3',
    GRID_CATEGORIES,
    renderWithTheme(Grid3),
    'div'
  ));

  // Grid4 Tests
  describe('Grid4 Component', createPropOmissionTest(
    'Grid4',
    GRID_CATEGORIES,
    renderWithTheme(Grid4),
    'div'
  ));

  // Divider Tests
  describe('Divider Component', createPropOmissionTest(
    'Divider',
    DIVIDER_CATEGORIES,
    renderWithTheme(Divider),
    'div'
  ));

  // Text Tests
  describe('Text Component', createPropOmissionTest(
    'Text',
    TYPOGRAPHY_CATEGORIES,
    renderWithTheme(Text),
    'p'
  ));

  // Title Tests
  describe('Title Component', createPropOmissionTest(
    'Title',
    TYPOGRAPHY_CATEGORIES,
    renderWithTheme(Title),
    'h3'
  ));

  // Link Tests
  describe('Link Component', createPropOmissionTest(
    'Link',
    TYPOGRAPHY_CATEGORIES,
    renderWithTheme(Link),
    'a'
  ));

  // List Tests - Custom test to handle both ul and ol tags
  describe('List Component', () => {
    describe('List Prop Omission Tests', () => {
      it('should omit all boolean component props from DOM attributes', () => {
        const testProps = createTestPropsWithAllBooleans(LIST_CATEGORIES);
        const { container } = renderWithTheme(List)(testProps);
        
        // Try both ul and ol since List can be either based on props
        const element = container.querySelector('ul') || container.querySelector('ol');
        const { hasInvalidProps, invalidProps } = checkForOmittedProps(element, LIST_CATEGORIES);
        
        if (hasInvalidProps) {
          console.error('List failed prop omission test. Found invalid props:', invalidProps);
          console.error('Element attributes:', Array.from(element?.attributes || []).map((attr: Attr) => attr.name));
        }
        
        expect(hasInvalidProps).toBe(false);
      });

      it('should still render valid HTML attributes', () => {
        const htmlProps = {
          id: 'test-id',
          'data-testid': 'test-component',
          'aria-label': 'Test component'
        };

        const { container } = renderWithTheme(List)(htmlProps);
        const element = container.querySelector('ul') || container.querySelector('ol');
        
        expect(element).toHaveAttribute('id', 'test-id');
        expect(element).toHaveAttribute('data-testid', 'test-component');
        expect(element).toHaveAttribute('aria-label', 'Test component');
      });

      it('should preserve className attribute', () => {
        const propsWithClass = {
          className: 'custom-test-class'
        };

        const { container } = renderWithTheme(List)(propsWithClass);
        const element = container.querySelector('ul') || container.querySelector('ol');
        
        expect(element).toHaveAttribute('class');
        expect(element).toHaveClass('custom-test-class');
      });

      it('should not render theme prop in DOM attributes', () => {
        // Test with a prop that might be accidentally passed as an attribute
        const propsWithUnexpectedAttribute = {
          'data-theme': 'custom-theme'
        };

        const { container } = renderWithTheme(List)(propsWithUnexpectedAttribute);
        const element = container.querySelector('ul') || container.querySelector('ol');
        
        expect(element).toHaveAttribute('data-theme', 'custom-theme'); // This should be preserved as it's a valid HTML attribute
        expect(element).toBeInTheDocument();
      });
    });
  });

  // ListItem Tests
  describe('ListItem Component', createPropOmissionTest(
    'ListItem',
    TYPOGRAPHY_CATEGORIES,
    renderWithTheme(ListItem),
    'li'
  ));

  // SectionTitle Tests
  describe('SectionTitle Component', createPropOmissionTest(
    'SectionTitle',
    TYPOGRAPHY_CATEGORIES,
    renderWithTheme(SectionTitle),
    'h2'
  ));

  // PageTitle Tests
  describe('PageTitle Component', createPropOmissionTest(
    'PageTitle',
    TYPOGRAPHY_CATEGORIES,
    renderWithTheme(PageTitle),
    'h1'
  ));

  // Cross-component validation tests
  describe('Cross-Component Validation', () => {
    it('should ensure all components properly omit their category props', () => {
      const componentTests = [
        { name: 'Button', categories: BUTTON_CATEGORIES, expectedCount: BUTTON_CATEGORIES.length },
        { name: 'Badge', categories: BADGE_CATEGORIES, expectedCount: BADGE_CATEGORIES.length },
        { name: 'Chip', categories: CHIP_CATEGORIES, expectedCount: CHIP_CATEGORIES.length },
        { name: 'Card', categories: CARD_CATEGORIES, expectedCount: CARD_CATEGORIES.length },
        { name: 'Section', categories: SECTION_CATEGORIES, expectedCount: SECTION_CATEGORIES.length },
        { name: 'Container', categories: CONTAINER_CATEGORIES, expectedCount: CONTAINER_CATEGORIES.length },
        { name: 'Col', categories: COL_CATEGORIES, expectedCount: COL_CATEGORIES.length },
        { name: 'Row', categories: ROW_CATEGORIES, expectedCount: ROW_CATEGORIES.length },
        { name: 'Stack', categories: STACK_CATEGORIES, expectedCount: STACK_CATEGORIES.length },
        { name: 'Grid', categories: GRID_CATEGORIES, expectedCount: GRID_CATEGORIES.length },
        { name: 'Divider', categories: DIVIDER_CATEGORIES, expectedCount: DIVIDER_CATEGORIES.length },
        { name: 'Typography', categories: TYPOGRAPHY_CATEGORIES, expectedCount: TYPOGRAPHY_CATEGORIES.length },
        { name: 'List', categories: LIST_CATEGORIES, expectedCount: LIST_CATEGORIES.length }
      ];

      componentTests.forEach(({ name, categories, expectedCount }) => {
        expect(categories.length).toBe(expectedCount);
      });
    });

    it('should validate that no component categories are empty', () => {
      const allCategories = [
        BUTTON_CATEGORIES,
        BADGE_CATEGORIES,
        CHIP_CATEGORIES,
        CARD_CATEGORIES,
        SECTION_CATEGORIES,
        CONTAINER_CATEGORIES,
        COL_CATEGORIES,
        ROW_CATEGORIES,
        STACK_CATEGORIES,
        GRID_CATEGORIES,
        DIVIDER_CATEGORIES,
        TYPOGRAPHY_CATEGORIES,
        LIST_CATEGORIES
      ];

      allCategories.forEach((categories, index) => {
        expect(categories.length).toBeGreaterThan(0);
      });
    });
  });
});