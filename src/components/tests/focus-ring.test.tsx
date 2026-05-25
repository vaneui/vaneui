import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Card,
  Chip,
  Code,
  Link,
  NavLink,
  MenuItem,
  ThemeProvider,
  defaultTheme,
} from '../../index';

/**
 * Focus-ring coverage for interactive components.
 *
 * The `focusVisible` prop maps to `focus-visible:outline-2 focus-visible:outline-offset-2`
 * (FocusVisibleClassMapper). Two patterns are validated here:
 *
 * 1. **Always-on**: NavLink / MenuItem / Link default to `focusVisible: true`
 *    because they are always interactive (button or anchor).
 * 2. **Conditional**: Card / Chip / Code only inject `focusVisible: true`
 *    when `href` is set, since their default tag (`div`/`span`/`code`) is
 *    not focusable and the class would be dead.
 *
 * Users can opt out anywhere via `noFocusVisible`.
 */

const FOCUS_RING_CLASSES = ['focus-visible:outline-2', 'focus-visible:outline-offset-2'];

const wrap = (ui: React.ReactElement) => (
  <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>
);

describe('Focus ring defaults — always-on (NavLink, MenuItem, Link)', () => {
  it('NavLink renders focus-visible outline classes by default', () => {
    const { container } = render(wrap(<NavLink href="/docs">Docs</NavLink>));
    const a = container.querySelector('a');
    expect(a).toBeInTheDocument();
    expect(a).toHaveClass(...FOCUS_RING_CLASSES);
  });

  it('NavLink without href (renders as button) still has focus ring', () => {
    const { container } = render(wrap(<NavLink>Action</NavLink>));
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(...FOCUS_RING_CLASSES);
  });

  it('NavLink opt-out via noFocusVisible removes the outline classes', () => {
    const { container } = render(
      wrap(<NavLink href="/docs" noFocusVisible>Docs</NavLink>)
    );
    const a = container.querySelector('a');
    expect(a).not.toHaveClass(...FOCUS_RING_CLASSES);
  });

  it('MenuItem renders focus-visible outline classes by default', () => {
    // Render MenuItem directly. Wrapping in <Menu> would portal it outside
    // the container; the focus-ring class lives on the MenuItem itself.
    const { container } = render(wrap(<MenuItem>Edit</MenuItem>));
    const menuItem = container.querySelector('.vane-menu-item');
    expect(menuItem).toBeInTheDocument();
    expect(menuItem).toHaveClass(...FOCUS_RING_CLASSES);
  });

  it('MenuItem opt-out via noFocusVisible removes the outline classes', () => {
    const { container } = render(wrap(<MenuItem noFocusVisible>Edit</MenuItem>));
    const menuItem = container.querySelector('.vane-menu-item');
    expect(menuItem).not.toHaveClass(...FOCUS_RING_CLASSES);
  });

  it('Link renders focus-visible outline classes by default', () => {
    const { container } = render(wrap(<Link href="/page">Read more</Link>));
    const a = container.querySelector('a');
    expect(a).toBeInTheDocument();
    expect(a).toHaveClass(...FOCUS_RING_CLASSES);
  });

  it('Link opt-out via noFocusVisible removes the outline classes', () => {
    const { container } = render(
      wrap(<Link href="/page" noFocusVisible>Read more</Link>)
    );
    const a = container.querySelector('a');
    expect(a).not.toHaveClass(...FOCUS_RING_CLASSES);
  });
});

describe('Focus ring defaults — conditional on href (Card, Chip, Code)', () => {
  describe('Card', () => {
    it('without href (rendered as div) has NO focus-visible classes', () => {
      const { container } = render(wrap(<Card>Content</Card>));
      const div = container.querySelector('div.vane-card');
      expect(div).toBeInTheDocument();
      expect(div).not.toHaveClass(...FOCUS_RING_CLASSES);
    });

    it('with href (rendered as anchor) has focus-visible classes', () => {
      const { container } = render(
        wrap(<Card href="/details">Clickable card</Card>)
      );
      const a = container.querySelector('a.vane-card');
      expect(a).toBeInTheDocument();
      expect(a).toHaveClass(...FOCUS_RING_CLASSES);
    });

    it('with href + noFocusVisible opt-out removes the classes', () => {
      const { container } = render(
        wrap(<Card href="/details" noFocusVisible>Clickable card</Card>)
      );
      const a = container.querySelector('a.vane-card');
      expect(a).not.toHaveClass(...FOCUS_RING_CLASSES);
    });

    it('without href but with explicit focusVisible enables the ring', () => {
      // Edge case: user opts in even for non-anchor render.
      const { container } = render(
        wrap(<Card focusVisible>Card with explicit focus ring</Card>)
      );
      const div = container.querySelector('div.vane-card');
      expect(div).toHaveClass(...FOCUS_RING_CLASSES);
    });
  });

  describe('Chip', () => {
    it('without href (rendered as span) has NO focus-visible classes', () => {
      const { container } = render(wrap(<Chip>Tag</Chip>));
      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
      expect(span).not.toHaveClass(...FOCUS_RING_CLASSES);
    });

    it('with href (rendered as anchor) has focus-visible classes', () => {
      const { container } = render(
        wrap(<Chip href="/filter?tag=js">JavaScript</Chip>)
      );
      const a = container.querySelector('a');
      expect(a).toBeInTheDocument();
      expect(a).toHaveClass(...FOCUS_RING_CLASSES);
    });

    it('with href + noFocusVisible opt-out removes the classes', () => {
      const { container } = render(
        wrap(<Chip href="/filter" noFocusVisible>Tag</Chip>)
      );
      const a = container.querySelector('a');
      expect(a).not.toHaveClass(...FOCUS_RING_CLASSES);
    });
  });

  describe('Code', () => {
    it('without href (rendered as code) has NO focus-visible classes', () => {
      const { container } = render(wrap(<Code>npm install</Code>));
      const code = container.querySelector('code');
      expect(code).toBeInTheDocument();
      expect(code).not.toHaveClass(...FOCUS_RING_CLASSES);
    });

    it('with href (rendered as anchor) has focus-visible classes', () => {
      const { container } = render(
        wrap(<Code href="https://npmjs.com">@vaneui/ui</Code>)
      );
      const a = container.querySelector('a');
      expect(a).toBeInTheDocument();
      expect(a).toHaveClass(...FOCUS_RING_CLASSES);
    });

    it('with href + noFocusVisible opt-out removes the classes', () => {
      const { container } = render(
        wrap(<Code href="https://example.com" noFocusVisible>code</Code>)
      );
      const a = container.querySelector('a');
      expect(a).not.toHaveClass(...FOCUS_RING_CLASSES);
    });
  });
});

