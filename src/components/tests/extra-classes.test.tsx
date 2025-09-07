import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Button,
  Badge,
  Text,
  List,
  ListItem,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Extra Classes Functionality Tests', () => {
  
  describe('Button Component Extra Classes', () => {
    it('should apply extra classes when corresponding prop is true', () => {
      const extraClasses = {
        button: {
          primary: 'shadow-lg border-2',
          lg: 'font-bold'
        }
      };

      const { container } = render(
        <ThemeProvider theme={defaultTheme} extraClasses={extraClasses}>
          <Button primary lg>Test Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('shadow-lg', 'border-2', 'font-bold');
    });

    it('should not apply extra classes when corresponding prop is false', () => {
      const extraClasses = {
        button: {
          primary: 'shadow-lg border-2',
          secondary: 'opacity-50'
        }
      };

      const { container } = render(
        <ThemeProvider theme={defaultTheme} extraClasses={extraClasses}>
          <Button primary>Test Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('shadow-lg', 'border-2');
      expect(button).not.toHaveClass('opacity-50');
    });

    it('should work without extra classes defined', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Button primary>Test Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-(--background-color-primary)'); // Should have normal theme classes
    });
  });

  describe('Badge Component Extra Classes', () => {
    it('should apply multiple extra classes from different categories', () => {
      const extraClasses = {
        badge: {
          success: 'animate-pulse',
          sm: 'tracking-wide',
          rounded: 'border-dashed'
        }
      };

      const { container } = render(
        <ThemeProvider theme={defaultTheme} extraClasses={extraClasses}>
          <Badge success sm rounded>Success Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toHaveClass('animate-pulse', 'tracking-wide', 'border-dashed');
    });

    it('should handle extra classes with multiple CSS classes in one string', () => {
      const extraClasses = {
        badge: {
          danger: 'shadow-red-500 border-red-600 animate-bounce'
        }
      };

      const { container } = render(
        <ThemeProvider theme={defaultTheme} extraClasses={extraClasses}>
          <Badge danger>Danger Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toHaveClass('shadow-red-500', 'border-red-600', 'animate-bounce');
    });
  });

  describe('List Component Extra Classes', () => {
    it('should apply extra classes based on list style', () => {
      const extraClasses = {
        list: {
          disc: 'pl-6 space-y-2',
          decimal: 'pl-8 space-y-4'
        }
      };

      // Test disc list
      const { container: discContainer } = render(
        <ThemeProvider theme={defaultTheme} extraClasses={extraClasses}>
          <List disc>
            <ListItem>Item 1</ListItem>
          </List>
        </ThemeProvider>
      );

      const discList = discContainer.querySelector('ul');
      expect(discList).toHaveClass('pl-6', 'space-y-2');
      expect(discList).not.toHaveClass('pl-8', 'space-y-4');

      // Test decimal list
      const { container: decimalContainer } = render(
        <ThemeProvider theme={defaultTheme} extraClasses={extraClasses}>
          <List decimal>
            <ListItem>Item 1</ListItem>
          </List>
        </ThemeProvider>
      );

      const decimalList = decimalContainer.querySelector('ol');
      expect(decimalList).toHaveClass('pl-8', 'space-y-4');
      expect(decimalList).not.toHaveClass('pl-6', 'space-y-2');
    });
  });

  describe('Text Component Extra Classes', () => {
    it('should apply extra classes based on size and appearance', () => {
      const extraClasses = {
        text: {
          xl: 'leading-relaxed',
          primary: 'font-semibold'
        }
      };

      const { container } = render(
        <ThemeProvider theme={defaultTheme} extraClasses={extraClasses}>
          <Text xl primary>Large Primary Text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('leading-relaxed', 'font-semibold');
    });
  });

  describe('Multiple Components with Extra Classes', () => {
    it('should apply different extra classes to different components', () => {
      const extraClasses = {
        button: {
          primary: 'transform hover:scale-105'
        },
        badge: {
          success: 'animate-pulse'
        },
        text: {
          lg: 'tracking-wide'
        }
      };

      const { container } = render(
        <ThemeProvider theme={defaultTheme} extraClasses={extraClasses}>
          <div>
            <Button primary>Button</Button>
            <Badge success>Badge</Badge>
            <Text lg>Text</Text>
          </div>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      const badge = container.querySelector('span');
      const text = container.querySelector('p');

      expect(button).toHaveClass('transform', 'hover:scale-105');
      expect(badge).toHaveClass('animate-pulse');
      expect(text).toHaveClass('tracking-wide');

      // Ensure components don't get each other's extra classes
      expect(button).not.toHaveClass('animate-pulse', 'tracking-wide');
      expect(badge).not.toHaveClass('transform', 'hover:scale-105', 'tracking-wide');
      expect(text).not.toHaveClass('transform', 'hover:scale-105', 'animate-pulse');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty extra classes object', () => {
      const extraClasses = {};

      const { container } = render(
        <ThemeProvider theme={defaultTheme} extraClasses={extraClasses}>
          <Button primary>Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-(--background-color-primary)'); // Should still have theme classes
    });

    it('should handle undefined extra classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme} extraClasses={undefined}>
          <Button primary>Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-(--background-color-primary)'); // Should still have theme classes
    });

    it('should handle extra classes with empty strings', () => {
      const extraClasses = {
        button: {
          primary: '',
          secondary: 'custom-extra-class'
        }
      };

      const { container } = render(
        <ThemeProvider theme={defaultTheme} extraClasses={extraClasses}>
          <Button secondary>Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('custom-extra-class');
    });

    it('should merge extra classes with existing extraClasses in theme', () => {
      // First set some extra classes in a theme
      const customTheme = { ...defaultTheme };
      customTheme.button.extraClasses = { primary: 'existing-class' };

      const extraClasses = {
        button: {
          primary: 'new-class',
          secondary: 'secondary-class'
        }
      };

      const { container } = render(
        <ThemeProvider theme={customTheme} extraClasses={extraClasses}>
          <Button primary>Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('new-class'); // Should override existing
      expect(button).not.toHaveClass('existing-class'); // Should be replaced
    });
  });
});