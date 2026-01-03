import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Button, Badge, Stack, Row, ThemeProvider, ThemeProps } from '../../index';

describe('Theme Override Tests', () => {
  describe('CSS Class Application', () => {
    it('should apply overridden CSS classes to button elements', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.appearance.text.outline.primary.base = 'text-blue-500';
        theme.button.themes.appearance.text.outline.primary.hover = 'hover:text-blue-700';
        theme.button.themes.appearance.text.outline.primary.active = 'active:text-blue-900';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button>Test Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('text-blue-500');
      expect(button).toHaveClass('hover:text-blue-700');
      expect(button).toHaveClass('active:text-blue-900');
    });

    it('should override background colors and apply to button elements', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.appearance.background.outline.primary.base = 'bg-red-100';
        theme.button.themes.appearance.background.outline.primary.hover = 'hover:bg-red-200';
        theme.button.themes.appearance.background.outline.primary.active = 'active:bg-red-300';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button>Background Test</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-red-100');
      expect(button).toHaveClass('hover:bg-red-200');
      expect(button).toHaveClass('active:bg-red-300');
    });

    it('should override border styles and apply to button elements', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.layout.border.border = 'border-2'
        theme.button.themes.appearance.border.outline.primary.base = 'border-green-500';
        theme.button.themes.appearance.border.outline.primary.hover = 'hover:border-green-600';
        theme.button.themes.appearance.border.outline.primary.active = 'active:border-green-700';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button border>Border Test</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('border-2'); // border width from BorderTheme
      expect(button).toHaveClass('border-green-500');
      expect(button).toHaveClass('hover:border-green-600');
      expect(button).toHaveClass('active:border-green-700');
    });

    it('should override filled variant styles and apply correctly', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.appearance.text.filled.primary.base = 'text-yellow-100';
        theme.button.themes.appearance.background.filled.primary.base = 'bg-purple-600';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button filled primary>Filled Primary</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('text-yellow-100');
      expect(button).toHaveClass('bg-purple-600');
    });

    it('should allow multiple component theme overrides', () => {
      const overrideFunc = (theme: ThemeProps) => {
        // Override button theme
        theme.button.themes.appearance.text.outline.primary.base = 'text-blue-500';
        theme.button.themes.appearance.background.filled.primary.base = 'bg-blue-600';
        
        // Override badge theme
        theme.badge.themes.appearance.text.outline.primary.base = 'text-green-500';
        theme.badge.themes.appearance.background.filled.primary.base = 'bg-green-600';
        
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button>Button Test</Button>
          <Button filled>Filled Button</Button>
          <Badge>Badge Test</Badge>
          <Badge filled>Filled Badge</Badge>
        </ThemeProvider>
      );

      const outlineButton = container.querySelectorAll('button')[0];
      const filledButton = container.querySelectorAll('button')[1];
      const outlineBadge = container.querySelectorAll('span')[0];
      const filledBadge = container.querySelectorAll('span')[1];

      expect(outlineButton).toHaveClass('text-blue-500');
      expect(filledButton).toHaveClass('bg-blue-600');
      expect(outlineBadge).toHaveClass('text-green-500');
      expect(filledBadge).toHaveClass('bg-green-600');
    });

    it('should override ring and shadow styles correctly', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.appearance.ring.outline.primary.base = 'ring-orange-500';
        if (theme.button.themes.appearance.shadow.outline.primary) {
          theme.button.themes.appearance.shadow.outline.primary.md.base = 'shadow-lg shadow-orange-500/50';
        }
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button>Ring & Shadow Test</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('ring-orange-500');
      expect(button).toHaveClass('shadow-lg');
      expect(button).toHaveClass('shadow-orange-500/50');
    });
  });

  describe('Combined Theme Overrides', () => {
    it('should combine themeOverride with themeDefaults for button styling', () => {
      const overrideFunc = (theme: ThemeProps) => {
        // Override specific appearance classes
        theme.button.themes.appearance.text.outline.primary.base = 'text-custom-primary';
        theme.button.themes.appearance.background.filled.secondary.base = 'bg-custom-secondary';
        return theme;
      };

      const { container } = render(
        <ThemeProvider 
          themeOverride={overrideFunc}
          themeDefaults={{
            button: { primary: true, lg: true, rounded: true }
          }}
        >
          <Button className="combined-test-1">Primary Default</Button>
          <Button filled secondary className="combined-test-2">Secondary Filled</Button>
          <Button outline primary className="combined-test-3">Primary Outline</Button>
        </ThemeProvider>
      );

      const primaryDefault = container.querySelector('.combined-test-1');
      const secondaryFilled = container.querySelector('.combined-test-2');
      const primaryOutline = container.querySelector('.combined-test-3');

      // Primary button should have default primary styling + size defaults
      expect(primaryDefault).toHaveClass('[background:var(--color-bg-primary)]');
      expect(primaryDefault).toHaveClass('text-(length:--fs)'); // font size consumer class
      expect(primaryDefault).toHaveClass('rounded-(--br)'); // rounded shape

      // Secondary filled should use custom background
      expect(secondaryFilled).toHaveClass('bg-custom-secondary'); // from themeOverride
      expect(secondaryFilled).toHaveClass('text-(length:--fs)'); // font size consumer class

      // Primary outline should use custom text color
      expect(primaryOutline).toHaveClass('text-custom-primary'); // from themeOverride
      expect(primaryOutline).toHaveClass('text-(length:--fs)'); // font size consumer class
    });

    it('should handle complex theme override and defaults combinations', () => {
      const complexOverrideFunc = (theme: ThemeProps) => {
        // Override multiple aspects of button appearance
        theme.button.themes.appearance.text.filled.primary.base = 'text-indigo-100';
        theme.button.themes.appearance.text.filled.primary.hover = 'hover:text-indigo-50';
        theme.button.themes.appearance.background.filled.primary.base = 'bg-gradient-to-r from-indigo-500 to-purple-600';
        theme.button.themes.appearance.border.filled.primary.base = 'border-2 border-indigo-400';
        
        // Also override badge for testing multiple components
        theme.badge.themes.appearance.text.outline.primary.base = 'text-pink-600';
        return theme;
      };

      const { container } = render(
        <ThemeProvider 
          themeOverride={complexOverrideFunc}
          themeDefaults={{
            button: { filled: true, primary: true, semibold: true, xl: true },
            badge: { outline: true, pill: true, sm: true }
          }}
        >
          <Button border className="complex-button">Complex Button</Button>
          <Badge className="complex-badge">Complex Badge</Badge>
        </ThemeProvider>
      );

      const button = container.querySelector('.complex-button');
      const badge = container.querySelector('.complex-badge');

      // Button should combine overrides with defaults
      expect(button).toHaveClass('text-indigo-100');
      expect(button).toHaveClass('hover:text-indigo-50');
      expect(button).toHaveClass('bg-gradient-to-r');
      expect(button).toHaveClass('from-indigo-500');
      expect(button).toHaveClass('to-purple-600');
      expect(button).toHaveClass('border-[length:var(--bw)]'); // border width from BorderTheme
      expect(button).toHaveClass('border-indigo-400');
      expect(button).toHaveClass('font-semibold'); // from themeDefaults
      expect(button).toHaveClass('text-(length:--fs)'); // font size consumer class

      // Badge should have overridden text and default styling
      expect(badge).toHaveClass('text-pink-600'); // from themeOverride
      expect(badge).toHaveClass('text-(length:--fs)'); // font size consumer class
      expect(badge).toHaveClass('rounded-full'); // pill maps to rounded-full
    });

    it('should allow nested providers with different override and default combinations', () => {
      const outerOverride = (theme: ThemeProps) => {
        theme.button.themes.appearance.text.outline.primary.base = 'text-red-500';
        return theme;
      };

      const innerOverride = (theme: ThemeProps) => {
        theme.button.themes.appearance.background.filled.primary.base = 'bg-blue-500';
        return theme;
      };

      const { container } = render(
        <ThemeProvider 
          themeOverride={outerOverride}
          themeDefaults={{ button: { outline: true, lg: true } }}
        >
          <Button className="outer-button">Outer Button</Button>
          
          <ThemeProvider 
            themeOverride={innerOverride}
            themeDefaults={{ button: { filled: true, primary: true, sm: true } }}
          >
            <Button className="inner-button">Inner Button</Button>
          </ThemeProvider>
        </ThemeProvider>
      );

      const outerButton = container.querySelector('.outer-button');
      const innerButton = container.querySelector('.inner-button');

      // Outer button uses outer theme override and defaults
      expect(outerButton).toHaveClass('text-red-500'); // from outer override
      expect(outerButton).toHaveClass('text-(length:--fs)'); // font size consumer class

      // Inner button uses inner theme override and defaults
      expect(innerButton).toHaveClass('bg-blue-500'); // from inner override
      expect(innerButton).toHaveClass('text-(length:--fs)'); // font size consumer class
      // Note: filled variant uses white text by default, outer text override may not be visible
    });

    it('should preserve theme overrides across multiple component instances', () => {
      const persistentOverride = (theme: ThemeProps) => {
        theme.button.themes.appearance.text.outline.primary.base = 'text-violet-600';
        theme.button.themes.appearance.background.filled.primary.base = 'bg-violet-600';
        theme.button.themes.appearance.border.outline.primary.base = 'border-violet-400';
        return theme;
      };

      const { container } = render(
        <ThemeProvider 
          themeOverride={persistentOverride}
          themeDefaults={{ button: { medium: true } }}
        >
          <div>
            <Button className="instance-1">Button 1</Button>
            <Button filled className="instance-2">Button 2</Button>
            <Button border outline className="instance-3">Button 3</Button>
          </div>
        </ThemeProvider>
      );

      const button1 = container.querySelector('.instance-1');
      const button2 = container.querySelector('.instance-2');
      const button3 = container.querySelector('.instance-3');

      // All buttons should have the medium weight from defaults
      expect(button1).toHaveClass('font-medium');
      expect(button2).toHaveClass('font-medium');
      expect(button3).toHaveClass('font-medium');

      // All buttons should use overridden colors consistently
      expect(button1).toHaveClass('text-violet-600'); // default outline
      expect(button2).toHaveClass('bg-violet-600'); // filled variant
      expect(button3).toHaveClass('border-violet-400'); // explicit outline
    });

    it('should handle appearance theme overrides with layout customizations', () => {
      const layoutOverride = (theme: ThemeProps) => {
        // Override appearance - size variables are now set via CSS in vars.css
        theme.button.themes.appearance.background.filled.primary.base = 'bg-emerald-500';
        return theme;
      };

      const { container } = render(
        <ThemeProvider
          themeOverride={layoutOverride}
          themeDefaults={{
            button: { filled: true, primary: true, md: true, padding: true }
          }}
        >
          <Button className="size-test-md">MD Button</Button>
          <Button lg className="size-test-lg">LG Button</Button>
        </ThemeProvider>
      );

      const mdButton = container.querySelector('.size-test-md');
      const lgButton = container.querySelector('.size-test-lg');

      // Buttons should have consumer classes (CSS variables are set in vars.css)
      expect(mdButton).toHaveClass('text-(length:--fs)'); // FontSizeTheme CSS variable consumer
      expect(mdButton).toHaveClass('px-(--px)'); // PxTheme CSS variable consumer
      expect(mdButton).toHaveClass('py-(--py)'); // PyTheme CSS variable consumer
      expect(mdButton).toHaveClass('bg-emerald-500'); // overridden background

      // LG button should have same consumer classes
      expect(lgButton).toHaveClass('text-(length:--fs)');
      expect(lgButton).toHaveClass('px-(--px)');
      expect(lgButton).toHaveClass('py-(--py)');
      expect(lgButton).toHaveClass('bg-emerald-500'); // same background override
    });

    it('should output data-size attribute for CSS targeting', () => {
      const { container } = render(
        <ThemeProvider>
          <Button sm className="sm-button">SM Button</Button>
          <Button md className="md-button">MD Button</Button>
          <Button lg className="lg-button">LG Button</Button>
        </ThemeProvider>
      );

      const smButton = container.querySelector('.sm-button');
      const mdButton = container.querySelector('.md-button');
      const lgButton = container.querySelector('.lg-button');

      // Buttons should have data-size attributes for CSS to target
      expect(smButton).toHaveAttribute('data-size', 'sm');
      expect(mdButton).toHaveAttribute('data-size', 'md');
      expect(lgButton).toHaveAttribute('data-size', 'lg');

      // All buttons should have consumer classes
      expect(smButton).toHaveClass('px-(--px)');
      expect(mdButton).toHaveClass('px-(--px)');
      expect(lgButton).toHaveClass('px-(--px)');
    });

    it('should output CSS variable consumer classes consistently', () => {
      const { container } = render(
        <ThemeProvider>
          <Button sm className="sm-button">SM Button</Button>
          <Button md className="md-button">MD Button</Button>
        </ThemeProvider>
      );

      const smButton = container.querySelector('.sm-button');
      const mdButton = container.querySelector('.md-button');

      // Both buttons should have same consumer classes (values set via CSS)
      expect(smButton).toHaveClass('py-(--py)');
      expect(mdButton).toHaveClass('py-(--py)');
      expect(smButton).toHaveClass('px-(--px)');
      expect(mdButton).toHaveClass('px-(--px)');
      expect(smButton).toHaveClass('text-(length:--fs)');
      expect(mdButton).toHaveClass('text-(length:--fs)');
    });
  });
  describe('Size and Layout Theme Class Field Overrides', () => {
    it('should override fontSize consumer class', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.size.text.fontSize = 'text-xl';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button>Custom Font Size</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('text-xl');
      expect(button).not.toHaveClass('text-(length:--fs)');
    });

    it('should override py consumer class', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.size.py.py = 'py-6';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button>Custom Padding Y</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('py-6');
      expect(button).not.toHaveClass('py-(--py)');
    });

    it('should override px consumer class', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.size.px.px = 'px-10';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button>Custom Padding X</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('px-10');
      expect(button).not.toHaveClass('px-(--px)');
    });

    it('should override lineHeight consumer class', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.size.lineHeight.lineHeight = 'leading-loose';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button>Custom Line Height</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('leading-loose');
      expect(button).not.toHaveClass('leading-(--lh)');
    });

    it('should override rounded consumer class', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.layout.radius.rounded = 'rounded-2xl';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button rounded>Custom Rounded</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('rounded-2xl');
      expect(button).not.toHaveClass('rounded-(--br)');
    });

    it('should override gap consumer class for layout components', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.stack.themes.size.gap.gap = 'gap-8';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Stack gap className="custom-stack">
            <div>Item 1</div>
            <div>Item 2</div>
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('.custom-stack');
      expect(stack).toHaveClass('gap-8');
      expect(stack).not.toHaveClass('gap-(--gap)');
    });

    it('should override multiple size theme fields simultaneously', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.size.text.fontSize = 'text-2xl';
        theme.button.themes.size.py.py = 'py-4';
        theme.button.themes.size.px.px = 'px-8';
        theme.button.themes.size.lineHeight.lineHeight = 'leading-relaxed';
        theme.button.themes.layout.radius.rounded = 'rounded-lg';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button rounded>Fully Customized</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('text-2xl');
      expect(button).toHaveClass('py-4');
      expect(button).toHaveClass('px-8');
      expect(button).toHaveClass('leading-relaxed');
      expect(button).toHaveClass('rounded-lg');
      // Should not have default consumer classes
      expect(button).not.toHaveClass('text-(length:--fs)');
      expect(button).not.toHaveClass('py-(--py)');
      expect(button).not.toHaveClass('px-(--px)');
      expect(button).not.toHaveClass('leading-(--lh)');
      expect(button).not.toHaveClass('rounded-(--br)');
    });

    it('should override gap for Row component', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.row.themes.size.gap.gap = 'gap-12';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Row gap className="custom-row">
            <div>Item 1</div>
            <div>Item 2</div>
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('.custom-row');
      expect(row).toHaveClass('gap-12');
      expect(row).not.toHaveClass('gap-(--gap)');
    });
  });

});
