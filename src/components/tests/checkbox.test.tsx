import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Checkbox,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Checkbox Component Tests', () => {

  describe('Checkbox Component', () => {
    it('should render with wrapper span and Check component', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox />
        </ThemeProvider>
      );

      const wrapper = container.querySelector('span.grid');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('grid', 'items-center', 'justify-center');
      
      const checkbox = wrapper?.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveClass('peer', 'col-start-1', 'row-start-1', 'cursor-pointer', 'appearance-none');
      
      const svg = wrapper?.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('invisible', 'col-start-1', 'row-start-1', 'peer-checked:visible');
      
      const path = svg?.querySelector('path');
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute('d', 'M3 8L6 11L11 3.5');
      expect(path).toHaveAttribute('stroke', 'currentColor');
    });

    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox />
        </ThemeProvider>
      );

      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveClass('cursor-pointer');
      expect(checkbox).toHaveClass('h-4', 'w-4'); // md size default
      expect(checkbox).toHaveClass('rounded-(--ui-border-radius-md)'); // rounded default
      expect(checkbox).toHaveClass('ring-(--filled-border-color-default)'); // ring from theme
    });

    it('should support checked state', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox checked readOnly />
        </ThemeProvider>
      );

      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeChecked();
    });

    it('should support disabled state', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox disabled />
        </ThemeProvider>
      );

      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeDisabled();
    });

    it('should support different sizes', () => {
      const sizes = [
        { prop: 'xs', classes: ['h-3', 'w-3'] },
        { prop: 'sm', classes: ['h-3.5', 'w-3.5'] },
        { prop: 'md', classes: ['h-4', 'w-4'] },
        { prop: 'lg', classes: ['h-4.5', 'w-4.5'] },
        { prop: 'xl', classes: ['h-5', 'w-5'] }
      ] as const;

      sizes.forEach(({prop, classes}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Checkbox {...{[prop]: true}} />
          </ThemeProvider>
        );

        const checkbox = container.querySelector('input[type="checkbox"]');
        expect(checkbox).toBeInTheDocument();
        classes.forEach(cls => {
          expect(checkbox).toHaveClass(cls);
        });
      });
    });

    it('should support checked appearance with color variants', () => {
      const appearances = ['default', 'primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Checkbox {...{[appearance]: true}} />
          </ThemeProvider>
        );

        const checkbox = container.querySelector('input[type="checkbox"]');
        expect(checkbox).toBeInTheDocument();
        // Check for checked state classes using filled theme (default)
        expect(checkbox).toHaveClass(`checked:bg-(--filled-background-color-${appearance})`);
        expect(checkbox).toHaveClass(`checked:border-(--filled-background-color-${appearance})`);
      });
    });

    it('should render Check component with correct props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox primary />
        </ThemeProvider>
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 14 14');
      expect(svg).toHaveAttribute('fill', 'none');
    });

    it('should support shape variants', () => {
      const shapes = [
        { prop: 'pill', class: 'rounded-full' },
        { prop: 'sharp', class: 'rounded-none' },
        { prop: 'rounded', class: 'rounded-(--ui-border-radius-md)' }
      ] as const;

      shapes.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Checkbox {...{[prop]: true}} />
          </ThemeProvider>
        );

        const checkbox = container.querySelector('input[type="checkbox"]');
        expect(checkbox).toHaveClass(expectedClass);
      });
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox className="custom-checkbox-class" />
        </ThemeProvider>
      );

      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass('cursor-pointer'); // theme classes
      expect(checkbox).toHaveClass('custom-checkbox-class'); // custom class
    });

    it('should handle form attributes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox id="test-id" name="test-checkbox" value="test-value" required />
        </ThemeProvider>
      );

      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveAttribute('id', 'test-id');
      expect(checkbox).toHaveAttribute('name', 'test-checkbox');
      expect(checkbox).toHaveAttribute('value', 'test-value');
      expect(checkbox).toBeRequired();
    });

    it('should support onChange handler', () => {
      const handleChange = jest.fn();
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox onChange={handleChange} />
        </ThemeProvider>
      );

      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      checkbox.click();
      expect(handleChange).toHaveBeenCalled();
    });

    it('should support filled variant', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox filled primary />
        </ThemeProvider>
      );

      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveClass('checked:bg-(--filled-background-color-primary)');
      expect(checkbox).toHaveClass('checked:border-(--filled-background-color-primary)');
      
      // Check component should also receive filled variant
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should support outline variant', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox outline secondary />
        </ThemeProvider>
      );

      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveClass('checked:bg-(--background-color-secondary)');
      expect(checkbox).toHaveClass('checked:border-(--background-color-secondary)');
    });

    it('should use filled variant by default based on theme defaults', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox accent />
        </ThemeProvider>
      );

      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      // Based on the theme defaults showing filled: true
      expect(checkbox).toHaveClass('checked:bg-(--filled-background-color-accent)');
      expect(checkbox).toHaveClass('checked:border-(--filled-background-color-accent)');
    });
  });
});