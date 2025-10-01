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
      expect(input).toHaveClass('[--fs-unit:8]', 'text-(length:--fs)'); // md size
      expect(input).toHaveClass('px-(--ui-px)', 'py-(--ui-py)'); // padding
      expect(input).toHaveClass('font-sans', 'font-normal'); // typography
      expect(input).toHaveClass('rounded-(--ui-br)'); // rounded
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
      expect(input).toHaveClass('bg-(--color-bg-default)'); // default background
      expect(input).toHaveClass('text-(--color-text-default)'); // default text
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
      expect(input).not.toHaveClass('border');
      // Ring is enabled by default
      expect(input).toHaveClass('ring', 'ring-inset'); // ring enabled
      expect(input).toHaveClass('ring-(--color-border-default)'); // ring color
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
      expect(input).toHaveClass('focus-visible:outline-(--color-border-default)');
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
      expect(input).toHaveClass('bg-(--color-bg-primary)'); // primary background
      expect(input).toHaveClass('text-(--color-text-primary)'); // primary text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--color-border-primary)'); // primary ring
      expect(input).toHaveClass('focus-visible:outline-(--color-border-primary)'); // primary focus-visible
    });

    it('should render with secondary appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input secondary placeholder="Secondary input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--color-bg-secondary)'); // secondary background
      expect(input).toHaveClass('text-(--color-text-secondary)'); // secondary text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--color-border-secondary)'); // secondary ring
      expect(input).toHaveClass('focus-visible:outline-(--color-border-secondary)'); // secondary focus-visible
    });

    it('should render with success appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input success placeholder="Success input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--color-bg-success)'); // success background
      expect(input).toHaveClass('text-(--color-text-success)'); // success text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--color-border-success)'); // success ring
      expect(input).toHaveClass('focus-visible:outline-(--color-border-success)'); // success focus-visible
    });

    it('should render with danger appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input danger placeholder="Danger input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--color-bg-danger)'); // danger background
      expect(input).toHaveClass('text-(--color-text-danger)'); // danger text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--color-border-danger)'); // danger ring
      expect(input).toHaveClass('focus-visible:outline-(--color-border-danger)'); // danger focus-visible
    });

    it('should render with warning appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input warning placeholder="Warning input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--color-bg-warning)'); // warning background
      expect(input).toHaveClass('text-(--color-text-warning)'); // warning text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--color-border-warning)'); // warning ring
      expect(input).toHaveClass('focus-visible:outline-(--color-border-warning)'); // warning focus-visible
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
      expect(input).toHaveClass('[--fs-unit:6]', 'text-(length:--fs)'); // xs text size
      expect(input).toHaveClass('px-(--ui-px)', 'py-(--ui-py)'); // xs padding
    });

    it('should render with sm size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input sm placeholder="Small input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('[--fs-unit:7]', 'text-(length:--fs)'); // sm text size
      expect(input).toHaveClass('px-(--ui-px)', 'py-(--ui-py)'); // sm padding
    });

    it('should render with lg size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input lg placeholder="Large input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('[--fs-unit:9]', 'text-(length:--fs)'); // lg text size
      expect(input).toHaveClass('px-(--ui-px)', 'py-(--ui-py)'); // lg padding
    });

    it('should render with xl size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input xl placeholder="Extra large input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('[--fs-unit:10]', 'text-(length:--fs)'); // xl text size
      expect(input).toHaveClass('px-(--ui-px)', 'py-(--ui-py)'); // xl padding
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
      expect(input).toHaveClass('bg-(--color-bg-filled-primary)'); // filled background
      expect(input).toHaveClass('text-(--color-text-filled-primary)'); // filled text
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--color-border-filled-primary)'); // filled ring
      expect(input).toHaveClass('focus-visible:outline-(--color-border-filled-primary)'); // filled focus-visible
    });

    it('should render outline variant as default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input outline primary placeholder="Outline input" />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('bg-(--color-bg-primary)'); // outline background (not filled)
      expect(input).toHaveClass('text-(--color-text-primary)'); // outline text
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
      expect(input).toHaveClass('border'); // border enabled
      expect(input).toHaveClass('border-(--color-border-primary)'); // border color
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
      expect(input).not.toHaveClass('ring', 'ring-inset');
      expect(input).not.toHaveClass('ring-(--color-border-primary)');
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
      expect(input).toHaveClass('bg-(--color-bg-primary)'); // still has primary classes
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
      expect(input).toHaveClass('[--fs-unit:9]', 'text-(length:--fs)', 'px-(--ui-px)', 'py-(--ui-py)');
      
      // Success filled appearance classes
      expect(input).toHaveClass('bg-(--color-bg-filled-success)');
      expect(input).toHaveClass('text-(--color-text-filled-success)');
      // Border classes only appear when border prop is set
      expect(input).toHaveClass('ring-(--color-border-filled-success)');
      expect(input).toHaveClass('focus-visible:outline-(--color-border-filled-success)');
      
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
      expect(input).toHaveClass('bg-(--color-bg-danger)'); // danger appearance
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
      expect(input).not.toHaveClass('shadow-sm', 'hover:shadow-md');
    });

    it('should add shadow classes when shadow prop is enabled', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Input shadow primary />
        </ThemeProvider>
      );

      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('shadow-sm', 'hover:shadow-md');
    });
  });
});