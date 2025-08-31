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
    it('should render with wrapper span and check element', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox />
        </ThemeProvider>
      );

      const wrapper = container.querySelector('span.inline-grid');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('inline-grid', 'items-center', 'justify-center');
      
      const checkbox = wrapper?.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveClass('peer', 'col-start-1', 'row-start-1', 'cursor-pointer', 'appearance-none');
      
      // Check element span
      const checkElement = wrapper?.querySelector('span.invisible');
      expect(checkElement).toBeInTheDocument();
      expect(checkElement).toHaveClass('invisible', 'col-start-1', 'row-start-1', 'peer-checked:visible');
      
      // SVG is inside the check element
      const svg = checkElement?.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
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
      expect(checkbox).toHaveClass('rounded-(--ui-border-radius-sm)'); // rounded default for md size
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
        // Border appearance is separate from checked state
        expect(checkbox).toHaveClass(`border-(--filled-border-color-${appearance})`);
      });
    });

    it('should render check element with correct props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox primary />
        </ThemeProvider>
      );

      const checkElement = container.querySelector('span.invisible');
      expect(checkElement).toBeInTheDocument();
      
      const svg = checkElement?.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 14 14');
      expect(svg).toHaveAttribute('fill', 'none');
    });

    it('should support shape variants', () => {
      const shapes = [
        { prop: 'pill', class: 'rounded-full' },
        { prop: 'sharp', class: 'rounded-none' },
        { prop: 'rounded', class: 'rounded-(--ui-border-radius-sm)' }
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
      // Border is not tied to checked state but to regular border appearance
      expect(checkbox).toHaveClass('border-(--filled-border-color-primary)');
      
      // Check element should also receive filled variant
      const checkElement = container.querySelector('span.invisible');
      expect(checkElement).toBeInTheDocument();
      
      const svg = checkElement?.querySelector('svg');
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
      // Outline variant uses regular border colors
      expect(checkbox).toHaveClass('border-(--border-color-secondary)');
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
      // Border is separate from checked state
      expect(checkbox).toHaveClass('border-(--filled-border-color-accent)');
    });

    describe('Check Element Color Tests', () => {
      it('should apply white text color to check element with filled variant for all appearances', () => {
        const appearances = ['default', 'primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info', 'accent'] as const;
        
        appearances.forEach(appearance => {
          const {container} = render(
            <ThemeProvider theme={defaultTheme}>
              <Checkbox filled {...{[appearance]: true}} />
            </ThemeProvider>
          );

          const checkElement = container.querySelector('span.invisible');
          expect(checkElement).toBeInTheDocument();
          // Filled variant should have light colored text for the check mark
          expect(checkElement).toHaveClass(`text-(--filled-text-color-${appearance})`);
        });
      });

      it('should apply colored text to check element with outline variant matching appearance colors', () => {
        const appearances = [
          { prop: 'default', expectedClass: 'text-(--text-color-default)' },
          { prop: 'primary', expectedClass: 'text-(--text-color-primary)' },
          { prop: 'secondary', expectedClass: 'text-(--text-color-secondary)' },
          { prop: 'tertiary', expectedClass: 'text-(--text-color-tertiary)' },
          { prop: 'success', expectedClass: 'text-(--text-color-success)' },
          { prop: 'danger', expectedClass: 'text-(--text-color-danger)' },
          { prop: 'warning', expectedClass: 'text-(--text-color-warning)' },
          { prop: 'info', expectedClass: 'text-(--text-color-info)' },
          { prop: 'accent', expectedClass: 'text-(--text-color-accent)' }
        ] as const;
        
        appearances.forEach(({prop, expectedClass}) => {
          const {container} = render(
            <ThemeProvider theme={defaultTheme}>
              <Checkbox outline {...{[prop]: true}} />
            </ThemeProvider>
          );

          const checkElement = container.querySelector('span.invisible');
          expect(checkElement).toBeInTheDocument();
          // Outline variant should have colored text matching the appearance
          expect(checkElement).toHaveClass(expectedClass);
        });
      });

      it('should apply proper check colors for mixed filled and outline variants', () => {
        const {container: filledContainer} = render(
          <ThemeProvider theme={defaultTheme}>
            <div>
              <Checkbox filled primary data-testid="filled-primary" />
              <Checkbox outline primary data-testid="outline-primary" />
              <Checkbox filled danger data-testid="filled-danger" />
              <Checkbox outline danger data-testid="outline-danger" />
            </div>
          </ThemeProvider>
        );

        // Test filled primary checkbox - should have white check
        const filledPrimaryWrapper = filledContainer.querySelector('[data-testid="filled-primary"]')?.parentElement;
        const filledPrimaryCheck = filledPrimaryWrapper?.querySelector('span.invisible');
        expect(filledPrimaryCheck).toHaveClass('text-(--filled-text-color-primary)');

        // Test outline primary checkbox - should have primary colored check  
        const outlinePrimaryWrapper = filledContainer.querySelector('[data-testid="outline-primary"]')?.parentElement;
        const outlinePrimaryCheck = outlinePrimaryWrapper?.querySelector('span.invisible');
        expect(outlinePrimaryCheck).toHaveClass('text-(--text-color-primary)');

        // Test filled danger checkbox - should have white check
        const filledDangerWrapper = filledContainer.querySelector('[data-testid="filled-danger"]')?.parentElement;
        const filledDangerCheck = filledDangerWrapper?.querySelector('span.invisible');
        expect(filledDangerCheck).toHaveClass('text-(--filled-text-color-danger)');

        // Test outline danger checkbox - should have danger colored check
        const outlineDangerWrapper = filledContainer.querySelector('[data-testid="outline-danger"]')?.parentElement;
        const outlineDangerCheck = outlineDangerWrapper?.querySelector('span.invisible');
        expect(outlineDangerCheck).toHaveClass('text-(--text-color-danger)');
      });

      it('should verify check element SVG uses currentColor for proper theming', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Checkbox outline success />
          </ThemeProvider>
        );

        const checkElement = container.querySelector('span.invisible');
        const svg = checkElement?.querySelector('svg');
        const path = svg?.querySelector('path');
        
        // Verify that the SVG path uses currentColor to inherit text color
        expect(path).toHaveAttribute('stroke', 'currentColor');
        // Verify check element has the proper color class
        expect(checkElement).toHaveClass('text-(--text-color-success)');
      });
    });
  });
});