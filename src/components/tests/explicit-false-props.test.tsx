import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';

// A prop set to `false` turns one key of a category off. These tests pin what is left after it.

describe('a prop set to false under a provider default', () => {
  // A provider that picks `filled` turns the component's own `outline` off; turning `filled`
  // off with a prop used to leave no variant, and without one the appearance mapped no colors.
  it('falls back to the component\'s own variant when the provider\'s variant is turned off', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
        <Button danger filled={false}>Delete</Button>
      </ThemeProvider>
    );
    const button = container.querySelector('button')!;
    expect(button).toHaveAttribute('data-appearance', 'danger');
    expect(button).toHaveAttribute('data-variant', 'outline');
  });

  it('falls back to the component\'s own size when the provider\'s size is turned off', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ button: { main: { lg: true } } }}>
        <Button lg={false}>Save</Button>
      </ThemeProvider>
    );
    expect(container.querySelector('button')).toHaveAttribute('data-size', 'sm');
  });

  it('falls back to the component\'s own appearance when the provider\'s appearance is turned off', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ badge: { success: true } }}>
        <Badge success={false}>New</Badge>
      </ThemeProvider>
    );
    expect(container.querySelector('.vane-badge')).toHaveAttribute('data-appearance', 'secondary');
  });

  it('keeps a key that another prop sets explicitly', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
        <Button danger filled={false} ghost>Delete</Button>
      </ThemeProvider>
    );
    expect(container.querySelector('button')).toHaveAttribute('data-variant', 'ghost');
  });

  it('leaves a provider default alone when no prop turns anything off', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
        <Button danger>Delete</Button>
      </ThemeProvider>
    );
    expect(container.querySelector('button')).toHaveAttribute('data-variant', 'filled');
  });
});

describe('turning the component\'s own variant off', () => {
  it('keeps the appearance colored with the next variant', () => {
    const { container } = render(<Button danger outline={false}>Delete</Button>);
    const button = container.querySelector('button')!;
    expect(button).toHaveAttribute('data-appearance', 'danger');
    expect(button).toHaveAttribute('data-variant', 'filled');
  });

  it('falls back to outline when a filled-by-default control is not filled', () => {
    const { container } = render(<Checkbox filled={false} aria-label="Agree" />);
    expect(container.querySelector('input')).toHaveAttribute('data-variant', 'outline');
  });
});
