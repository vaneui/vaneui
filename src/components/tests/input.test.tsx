import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Input,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Input Component Tests', () => {

  describe('Basic Input Rendering', () => {
    it('should render as input tag with default classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input placeholder="Test input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('w-full', 'transition-all', 'duration-200');
      expect(input).toHaveClass('text-(length:--fs)'); // md size
      expect(input).toHaveClass('px-(--px)', 'py-(--py)'); // padding
      expect(input).toHaveClass('font-sans', 'font-normal'); // typography
      expect(input).toHaveClass('rounded-(--br)'); // rounded
      expect(input).toHaveAttribute('placeholder', 'Test input');
    });

    it('should render with default appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--bg-color)'); // primary background
      expect(input).toHaveClass('text-(--text-color)'); // primary text
      // Note: border classes only appear when border prop is explicitly set
    });

    it('should render with ring classes by default (but not border)', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      // Border is not enabled by default based on current theme defaults
      expect(input).not.toHaveClass('border-[length:var(--bw)]');
      // Ring is enabled by default
      expect(input).toHaveClass('ring-[length:var(--rw)]', 'ring-inset'); // ring enabled
      expect(input).toHaveClass('ring-(--ring-color)'); // ring color
    });

    it('should render with focus-visible support by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('focus-visible:outline-2', 'focus-visible:outline-offset-2');
      expect(input).toHaveClass('focus-visible:outline-(--ring-color)');
    });
  });

  describe('Input Appearances', () => {
    it('should render with primary appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input primary placeholder="Primary input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--bg-color)'); // primary background
      expect(input).toHaveClass('text-(--text-color)'); // primary text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--ring-color)'); // primary ring
      expect(input).toHaveClass('focus-visible:outline-(--ring-color)'); // primary focus-visible
    });

    it('should render with secondary appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input secondary placeholder="Secondary input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--bg-color)'); // secondary background
      expect(input).toHaveClass('text-(--text-color)'); // secondary text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--ring-color)'); // secondary ring
      expect(input).toHaveClass('focus-visible:outline-(--ring-color)'); // secondary focus-visible
    });

    it('should render with success appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input success placeholder="Success input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--bg-color)'); // success background
      expect(input).toHaveClass('text-(--text-color)'); // success text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--ring-color)'); // success ring
      expect(input).toHaveClass('focus-visible:outline-(--ring-color)'); // success focus-visible
    });

    it('should render with danger appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input danger placeholder="Danger input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--bg-color)'); // danger background
      expect(input).toHaveClass('text-(--text-color)'); // danger text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--ring-color)'); // danger ring
      expect(input).toHaveClass('focus-visible:outline-(--ring-color)'); // danger focus-visible
    });

    it('should render with warning appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input warning placeholder="Warning input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--bg-color)'); // warning background
      expect(input).toHaveClass('text-(--text-color)'); // warning text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--ring-color)'); // warning ring
      expect(input).toHaveClass('focus-visible:outline-(--ring-color)'); // warning focus-visible
    });
  });

  describe('Input Sizes', () => {
    it('should render with xs size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input xs placeholder="Extra small input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('text-(length:--fs)'); // xs text size
      expect(input).toHaveAttribute('data-size', 'xs');
      expect(input).toHaveClass('px-(--px)', 'py-(--py)'); // xs padding
    });

    it('should render with sm size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input sm placeholder="Small input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('text-(length:--fs)'); // sm text size
      expect(input).toHaveAttribute('data-size', 'sm');
      expect(input).toHaveClass('px-(--px)', 'py-(--py)'); // sm padding
    });

    it('should render with lg size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input lg placeholder="Large input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('text-(length:--fs)'); // lg text size
      expect(input).toHaveAttribute('data-size', 'lg');
      expect(input).toHaveClass('px-(--px)', 'py-(--py)'); // lg padding
    });

    it('should render with xl size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input xl placeholder="Extra large input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('text-(length:--fs)'); // xl text size
      expect(input).toHaveAttribute('data-size', 'xl');
      expect(input).toHaveClass('px-(--px)', 'py-(--py)'); // xl padding
    });
  });

  describe('Input Variants', () => {
    it('should render with filled variant classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input filled primary placeholder="Filled input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--bg-color)'); // filled background
      expect(input).toHaveClass('text-(--text-color)'); // filled text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--ring-color)'); // filled ring
      expect(input).toHaveClass('focus-visible:outline-(--ring-color)'); // filled focus-visible
    });

    it('should render outline variant as default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input outline primary placeholder="Outline input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--bg-color)'); // outline background (not filled)
      expect(input).toHaveClass('text-(--text-color)'); // outline text
      // Border classes only appear when border prop is set
    });
  });

  describe('Input Border, Ring, and Focus Behavior', () => {
    it('should show border classes when border prop is enabled', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input border primary placeholder="Border input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('border-[length:var(--bw)]'); // border enabled
      expect(input).toHaveClass('border-(--border-color)'); // border color
    });

    it('should handle ring disabled state', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input noRing primary placeholder="No ring input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      // Should not have ring classes when noRing is true
      expect(input).not.toHaveClass('ring-[length:var(--rw)]', 'ring-inset');
      expect(input).not.toHaveClass('ring-(--ring-color)');
    });

    it('should handle focus-visible disabled state', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input noFocusVisible primary placeholder="No focus-visible input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      // Should not have focus-visible layout classes when noFocusVisible is true
      expect(input).not.toHaveClass('focus-visible:outline-2', 'focus-visible:outline-offset-2');
      // Note: appearance-based focus-visible classes behavior depends on theme implementation
    });
  });

  describe('Input HTML Attributes', () => {
    it('should pass through standard input attributes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input 
            type="email"
            name="email"
            id="test-input"
            placeholder="Enter email"
            required
            disabled
            value="test@example.com"
            autoComplete="email"
          />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('name', 'email');
      expect(input).toHaveAttribute('id', 'test-input');
      expect(input).toHaveAttribute('placeholder', 'Enter email');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('disabled');
      expect(input).toHaveAttribute('value', 'test@example.com');
      expect(input).toHaveAttribute('autoComplete', 'email');
    });

    it('should handle different input types', () => {
      const types = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'];
      
      types.forEach(type => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Input type={type as "text" | "email" | "password" | "number" | "tel" | "url" | "search"} placeholder={`${type} input`} />
          </ThemeProvider>
        );

        const input = container.querySelector('input');
        expect(input).toHaveAttribute('type', type);
      });
    });
  });

  describe('Input Custom Classes and Props', () => {
    it('should merge custom className with component classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input className="custom-input-class" primary />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('custom-input-class');
      expect(input).toHaveClass('w-full', 'transition-all'); // still has component classes
      expect(input).toHaveClass('bg-(--bg-color)'); // still has primary classes
    });

    it('should support custom tag override', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input tag="textarea" placeholder="Custom tag test" />
        </ThemeProvider>
      );

      const textarea = container.querySelector('textarea');
      const input = container.querySelector('input');
      
      expect(textarea).toBeInTheDocument();
      expect(input).not.toBeInTheDocument();
      expect(textarea).toHaveClass('w-full', 'transition-all');
      expect(textarea).toHaveAttribute('placeholder', 'Custom tag test');
    });
  });

  describe('Input Combination Tests', () => {
    it('should handle multiple appearance and size combinations', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input 
            success 
            lg 
            filled 
            className="combination-test"
            placeholder="Success large filled input"
          />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();

      // Size classes
      expect(input).toHaveClass('text-(length:--fs)', 'px-(--px)', 'py-(--py)');
      expect(input).toHaveAttribute('data-size', 'lg');

      // Success filled appearance classes
      expect(input).toHaveClass('bg-(--bg-color)');
      expect(input).toHaveClass('text-(--text-color)');
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--ring-color)');
      expect(input).toHaveClass('focus-visible:outline-(--ring-color)');
      
      // Custom class
      expect(input).toHaveClass('combination-test');
    });

    it('should work with form-related props and accessibility', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input 
            id="accessible-input"
            name="username"
            type="text"
            placeholder="Enter username"
            aria-label="Username input"
            aria-describedby="username-help"
            required
            danger
          />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'accessible-input');
      expect(input).toHaveAttribute('name', 'username');
      expect(input).toHaveAttribute('aria-label', 'Username input');
      expect(input).toHaveAttribute('aria-describedby', 'username-help');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveClass('bg-(--bg-color)'); // danger appearance
    });
  });

  describe('Read-only State', () => {
    it('should render with data-readonly attribute when readOnly is set', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input readOnly />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-readonly', 'true');
    });

    it('should pass readOnly through to native input element', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input readOnly />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toHaveAttribute('readOnly');
    });

    it('should not have data-readonly when readOnly is not set', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).not.toHaveAttribute('data-readonly');
    });

    it('should work alongside other props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input readOnly lg primary value="read only value" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toHaveAttribute('data-readonly', 'true');
      expect(input).toHaveAttribute('readOnly');
      expect(input).toHaveAttribute('data-size', 'lg');
      expect(input).toHaveAttribute('data-appearance', 'primary');
      expect(input).toHaveAttribute('value', 'read only value');
    });
  });

  describe('Input Shadow Behavior', () => {
    it('should not have shadow classes by default (noShadow is default)', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input primary />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      // Should not have shadow classes since noShadow is default for inputs
      expect(input).not.toHaveClass('shadow-ui');
    });

    it('should add shadow classes when shadow prop is enabled', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input shadow primary />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-vane-type', 'ui'); // UI component type
      expect(input).toHaveClass('shadow-(--shadow-base)');
    });
  });

  describe('Width Props', () => {
    it('should apply wFull class for full width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input wFull placeholder="Full width" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toHaveClass('w-full');
    });

    it('should apply wFit class for fit-content width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input wFit placeholder="Fit width" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toHaveClass('w-fit');
    });

    it('should apply wAuto class for auto width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input wAuto placeholder="Auto width" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toHaveClass('w-auto');
    });
  });

  describe('Height Props', () => {
    it('should apply hFull class for full height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input hFull />
        </ThemeProvider>
      );
      const el = container.querySelector('input');
      expect(el).toHaveClass('h-full');
    });

    it('should apply hFit class for fit-content height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input hFit />
        </ThemeProvider>
      );
      const el = container.querySelector('input');
      expect(el).toHaveClass('h-fit');
    });

    it('should apply hAuto class for auto height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input hAuto />
        </ThemeProvider>
      );
      const el = container.querySelector('input');
      expect(el).toHaveClass('h-auto');
    });
  });

  describe('Status Props (Validation)', () => {
    it('should apply error state classes when error prop is set', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input error placeholder="Error input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('border-red-500');
      expect(input).toHaveClass('ring-red-500/30');
    });

    it('should not apply error classes when error is false', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input placeholder="Normal input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).not.toHaveClass('border-red-500');
      expect(input).not.toHaveClass('ring-red-500/30');
    });

    it('should work with other props alongside error', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input error lg primary placeholder="Large error input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toHaveClass('border-red-500'); // error state
      expect(input).toHaveAttribute('data-size', 'lg'); // size prop
      expect(input).toHaveAttribute('data-appearance', 'primary'); // appearance
    });
  });
});