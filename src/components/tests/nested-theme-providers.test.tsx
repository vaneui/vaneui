import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Button,
  Badge,
  Title,
  Text,
  ThemeProvider,
  ThemeProps
} from '../../index';
import { mergeDefaults } from '../utils/deepMerge';

describe('Nested ThemeProvider Tests', () => {
  
  describe('Theme Override Isolation', () => {
    it('should apply theme overrides only to inner elements', () => {
      const outerOverride = (theme: ThemeProps) => {
        console.log('Before override:', theme.title.defaults);
        theme.title.defaults = mergeDefaults(
          theme.title.defaults as Record<string, boolean>, 
          { primary: true }
        );
        console.log('After override:', theme.title.defaults);
        return theme;
      };

      const innerOverride = (theme: ThemeProps) => {
        theme.title.defaults = mergeDefaults(
          theme.title.defaults as Record<string, boolean>, 
          { secondary: true }
        );
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={outerOverride}>
          <div>
            <Title className="outer-title">Title 1</Title>
            <ThemeProvider themeOverride={innerOverride}>
              <Title className="inner-title">Title 2</Title>
            </ThemeProvider>
            <Title className="outer-title-2">Title 3</Title>
          </div>
        </ThemeProvider>
      );

      const outerTitle1 = container.querySelector('.outer-title');
      const innerTitle = container.querySelector('.inner-title');
      const outerTitle2 = container.querySelector('.outer-title-2');

      // Outer titles should have primary appearance from outer override
      expect(outerTitle1).toHaveClass('text-(--color-text-primary)');
      expect(outerTitle2).toHaveClass('text-(--color-text-primary)');

      // Inner title should have secondary appearance from inner override
      expect(innerTitle).toHaveClass('text-(--color-text-secondary)');
      expect(innerTitle).not.toHaveClass('text-(--color-text-primary)');
    });
  });

  describe('Extra Classes Isolation', () => {
    it('should apply extra classes only to inner elements', () => {
      const outerExtraClasses = {
        title: {
          primary: 'outer-shadow-lg outer-border-2'
        }
      };

      const innerExtraClasses = {
        title: {
          secondary: 'inner-animate-pulse inner-opacity-90'
        }
      };

      const { container } = render(
        <ThemeProvider extraClasses={outerExtraClasses}>
          <div>
            <Title primary className="outer-title">Title 1</Title>
            <ThemeProvider extraClasses={innerExtraClasses}>
              <Title secondary className="inner-title">Title 2</Title>
            </ThemeProvider>
            <Title primary className="outer-title-2">Title 3</Title>
          </div>
        </ThemeProvider>
      );

      const outerTitle1 = container.querySelector('.outer-title');
      const innerTitle = container.querySelector('.inner-title');
      const outerTitle2 = container.querySelector('.outer-title-2');

      // Outer titles should have outer extra classes
      expect(outerTitle1).toHaveClass('outer-shadow-lg', 'outer-border-2');
      expect(outerTitle2).toHaveClass('outer-shadow-lg', 'outer-border-2');

      // Inner title should have inner extra classes
      expect(innerTitle).toHaveClass('inner-animate-pulse', 'inner-opacity-90');
      
      // Inner title should NOT have outer extra classes because it's using 'secondary' prop
      // and outer extra classes are only for 'primary' prop
      expect(innerTitle).not.toHaveClass('outer-shadow-lg');
      expect(innerTitle).not.toHaveClass('outer-border-2');
    });

    it('should combine theme overrides and extra classes correctly in nested providers', () => {
      const outerOverride = (theme: ThemeProps) => {
        theme.button.defaults = mergeDefaults(
          theme.button.defaults as Record<string, boolean>, 
          { primary: true }
        );
        return theme;
      };

      const innerOverride = (theme: ThemeProps) => {
        theme.button.defaults = mergeDefaults(
          theme.button.defaults as Record<string, boolean>, 
          { lg: true }
        );
        return theme;
      };

      const outerExtraClasses = {
        button: {
          primary: 'transform hover:scale-105'
        }
      };

      const innerExtraClasses = {
        button: {
          lg: 'font-bold tracking-wide'
        }
      };

      const { container } = render(
        <ThemeProvider themeOverride={outerOverride} extraClasses={outerExtraClasses}>
          <div>
            <Button className="outer-button">Button 1</Button>
            <ThemeProvider themeOverride={innerOverride} extraClasses={innerExtraClasses}>
              <Button className="inner-button">Button 2</Button>
            </ThemeProvider>
          </div>
        </ThemeProvider>
      );

      const outerButton = container.querySelector('.outer-button');
      const innerButton = container.querySelector('.inner-button');

      // Outer button should have primary appearance and its extra classes
      expect(outerButton).toHaveClass('bg-(--color-bg-primary)');
      expect(outerButton).toHaveClass('transform', 'hover:scale-105');

      // Inner button should have lg size and its extra classes from inner override
      // Note: inner override sets lg: true as default
      expect(innerButton).toHaveClass('[--fs-unit:9]', 'text-(length:--fs)'); // lg from defaults
      expect(innerButton).toHaveClass('font-bold', 'tracking-wide');
      
      // Inner button SHOULD inherit outer extra classes in merge mode
      // because it still has primary: true from the outer override
      expect(innerButton).toHaveClass('transform');
      expect(innerButton).toHaveClass('hover:scale-105');
    });
  });

  describe('Multiple Nested Levels', () => {
    it('should handle three levels of nesting correctly', () => {
      const level1ExtraClasses = {
        text: {
          md: 'level-1-class'
        }
      };

      const level2ExtraClasses = {
        text: {
          lg: 'level-2-class'
        }
      };

      const level3ExtraClasses = {
        text: {
          xl: 'level-3-class'
        }
      };

      const { container } = render(
        <ThemeProvider extraClasses={level1ExtraClasses}>
          <div>
            <Text md className="level-1-text">Level 1 Text</Text>
            <ThemeProvider extraClasses={level2ExtraClasses}>
              <div>
                <Text lg className="level-2-text">Level 2 Text</Text>
                <ThemeProvider extraClasses={level3ExtraClasses}>
                  <Text xl className="level-3-text">Level 3 Text</Text>
                </ThemeProvider>
              </div>
            </ThemeProvider>
          </div>
        </ThemeProvider>
      );

      const level1Text = container.querySelector('.level-1-text');
      const level2Text = container.querySelector('.level-2-text');
      const level3Text = container.querySelector('.level-3-text');

      // Each level should only have its own extra classes
      expect(level1Text).toHaveClass('level-1-class');
      expect(level1Text).not.toHaveClass('level-2-class', 'level-3-class');

      expect(level2Text).toHaveClass('level-2-class');
      expect(level2Text).not.toHaveClass('level-1-class', 'level-3-class');

      expect(level3Text).toHaveClass('level-3-class');
      expect(level3Text).not.toHaveClass('level-1-class', 'level-2-class');
    });
  });

  describe('Default Props Isolation', () => {
    it('should isolate themeDefaults between nested providers', () => {
      const outerDefaults = {
        badge: { success: true }
      };

      const innerDefaults = {
        badge: { danger: true }
      };

      const { container } = render(
        <ThemeProvider themeDefaults={outerDefaults}>
          <div>
            <Badge className="outer-badge">Outer Badge</Badge>
            <ThemeProvider themeDefaults={innerDefaults}>
              <Badge className="inner-badge">Inner Badge</Badge>
            </ThemeProvider>
            <Badge className="outer-badge-2">Outer Badge 2</Badge>
          </div>
        </ThemeProvider>
      );

      const outerBadge1 = container.querySelector('.outer-badge');
      const innerBadge = container.querySelector('.inner-badge');
      const outerBadge2 = container.querySelector('.outer-badge-2');

      // Outer badges should have success appearance
      expect(outerBadge1).toHaveClass('bg-(--color-bg-success)');
      expect(outerBadge2).toHaveClass('bg-(--color-bg-success)');

      // Inner badge should have danger appearance
      expect(innerBadge).toHaveClass('bg-(--color-bg-danger)');
      expect(innerBadge).not.toHaveClass('bg-(--color-bg-success)');
    });
  });

  describe('Complete Isolation Test', () => {
    it('should isolate all theme modifications (overrides, defaults, and extra classes)', () => {
      const outerOverride = (theme: ThemeProps) => {
        theme.button.defaults = mergeDefaults(
          theme.button.defaults as Record<string, boolean>, 
          { outline: true }
        );
        return theme;
      };

      const innerOverride = (theme: ThemeProps) => {
        theme.button.defaults = mergeDefaults(
          theme.button.defaults as Record<string, boolean>, 
          { filled: true }
        );
        return theme;
      };

      const outerDefaults = {
        button: { primary: true, lg: true }
      };

      const innerDefaults = {
        button: { secondary: true, sm: true }
      };

      const outerExtraClasses = {
        button: {
          primary: 'outer-primary-class',
          lg: 'outer-lg-class'
        }
      };

      const innerExtraClasses = {
        button: {
          secondary: 'inner-secondary-class',
          sm: 'inner-sm-class'
        }
      };

      const { container } = render(
        <ThemeProvider 
          themeOverride={outerOverride}
          themeDefaults={outerDefaults}
          extraClasses={outerExtraClasses}
        >
          <div>
            <Button border className="outer-button">Outer Button</Button>
            <ThemeProvider 
              themeOverride={innerOverride}
              themeDefaults={innerDefaults}
              extraClasses={innerExtraClasses}
            >
              <Button className="inner-button">Inner Button</Button>
            </ThemeProvider>
          </div>
        </ThemeProvider>
      );

      const outerButton = container.querySelector('.outer-button');
      const innerButton = container.querySelector('.inner-button');

      // Outer button checks
      // outline variant = true from themeOverride + primary & lg from themeDefaults
      expect(outerButton).toHaveClass('bg-(--color-bg-primary)'); // outline variant with primary appearance
      expect(outerButton).toHaveClass('border-(--color-border-primary)'); // primary from defaults
      expect(outerButton).toHaveClass('[--fs-unit:9]', 'text-(length:--fs)'); // lg from defaults
      expect(outerButton).toHaveClass('outer-primary-class', 'outer-lg-class'); // extra classes

      // Inner button checks
      // filled variant = true from themeOverride + secondary & sm from themeDefaults
      expect(innerButton).toHaveClass('bg-(--color-bg-filled-secondary)'); // filled variant with secondary appearance
      expect(innerButton).not.toHaveClass('bg-(--color-bg-secondary)'); // not outline variant
      expect(innerButton).toHaveClass('[--fs-unit:7]', 'text-(length:--fs)'); // sm from defaults
      expect(innerButton).toHaveClass('inner-secondary-class', 'inner-sm-class'); // extra classes
      
      // Inner button should NOT have outer classes - proper isolation
      expect(innerButton).not.toHaveClass('outer-primary-class');
      expect(innerButton).not.toHaveClass('outer-lg-class');
      expect(innerButton).not.toHaveClass('[--fs-unit:9]');
    });
  });

  describe('Empty Nested Provider', () => {
    it('should use defaultTheme when nested provider has no customizations', () => {
      const outerExtraClasses = {
        title: {
          primary: 'outer-custom-class'
        }
      };

      const { container } = render(
        <ThemeProvider extraClasses={outerExtraClasses}>
          <div>
            <Title primary className="outer-title">Outer Title</Title>
            <ThemeProvider>
              <Title primary className="inner-title">Inner Title</Title>
            </ThemeProvider>
          </div>
        </ThemeProvider>
      );

      const outerTitle = container.querySelector('.outer-title');
      const innerTitle = container.querySelector('.inner-title');

      // Outer title should have extra classes
      expect(outerTitle).toHaveClass('outer-custom-class');

      // Inner title SHOULD inherit outer extra classes in merge mode (default)
      expect(innerTitle).toHaveClass('outer-custom-class');

      // Both should have primary appearance
      expect(outerTitle).toHaveClass('text-(--color-text-primary)');
      expect(innerTitle).toHaveClass('text-(--color-text-primary)');
    });
  });
});