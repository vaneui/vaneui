import '@testing-library/jest-dom';
import { createRef, type ReactElement } from 'react';
import { render } from '@testing-library/react';

import {
  Badge, Button, Card, Checkbox, Col, Input, Skeleton, Text, Title, ThemeProvider, defaultTheme,
} from '../../index';
import { ComponentTheme } from '../ui/theme/common/ComponentTheme';

const renderUi = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

const byTestId = (container: HTMLElement, id: string) =>
  container.querySelector(`[data-testid="${id}"]`) as HTMLElement;

/** Every ComponentTheme instance reachable from the default theme, with its path. */
function themeNodes(node: unknown, path: string[] = [], seen = new Set<unknown>()): Array<{ path: string; theme: ComponentTheme<object, object> }> {
  if (!node || typeof node !== 'object' || seen.has(node)) return [];
  seen.add(node);
  if (node instanceof ComponentTheme) return [{ path: path.join('.'), theme: node as ComponentTheme<object, object> }];
  return Object.entries(node).flatMap(([key, value]) => themeNodes(value, [...path, key], seen));
}

describe('skeleton prop', () => {
  it('marks the component as a placeholder: data-skeleton, aria-busy and inert', () => {
    const { container } = renderUi(<Button skeleton data-testid="b">Save</Button>);
    const button = byTestId(container, 'b');
    expect(button).toHaveAttribute('data-skeleton', '');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('inert');
    expect(button).toHaveClass('select-none');
  });

  it('does not reach the DOM as an attribute', () => {
    const { container } = renderUi(<Card skeleton data-testid="c">Body</Card>);
    expect(byTestId(container, 'c')).not.toHaveAttribute('skeleton');
  });

  it('adds nothing without the prop', () => {
    const { container } = renderUi(<Button data-testid="b">Save</Button>);
    const button = byTestId(container, 'b');
    expect(button).not.toHaveAttribute('data-skeleton');
    expect(button).not.toHaveAttribute('aria-busy');
    expect(button).not.toHaveAttribute('inert');
    expect(button).not.toHaveClass('select-none');
  });

  it('keeps an aria-busy and an inert the caller passes', () => {
    const { container } = renderUi(
      <>
        <Button skeleton aria-busy={false} data-testid="busy">Save</Button>
        <Button skeleton inert={false} data-testid="inert">Save</Button>
      </>
    );
    expect(byTestId(container, 'busy')).toHaveAttribute('aria-busy', 'false');
    expect(byTestId(container, 'inert')).not.toHaveAttribute('inert');
    expect(byTestId(container, 'inert')).toHaveAttribute('data-skeleton');
  });

  it('marks only the container: the components inside it turn into placeholders through the stylesheet', () => {
    const { container } = renderUi(
      <Card skeleton data-testid="card">
        <Title data-testid="title">Ada Lovelace</Title>
        <Text>Analyst</Text>
        <Button data-testid="button">Follow</Button>
      </Card>
    );
    expect(byTestId(container, 'card')).toHaveAttribute('data-skeleton');
    expect(byTestId(container, 'title')).not.toHaveAttribute('data-skeleton');
    expect(byTestId(container, 'button')).not.toHaveAttribute('data-skeleton');
    // inert on the container covers every control inside it
    expect(byTestId(container, 'button').closest('[inert]')).toBe(byTestId(container, 'card'));
  });

  it('lands on the control of a form component', () => {
    const { container } = renderUi(
      <>
        <Checkbox skeleton aria-label="Agree" />
        <Input skeleton aria-label="Name" endSection="kg" />
      </>
    );
    expect(container.querySelector('input[type="checkbox"]')).toHaveAttribute('data-skeleton');
    expect(container.querySelector('input:not([type])')).toHaveAttribute('data-skeleton');
    expect(container.querySelector('.vane-input-wrapper')).not.toHaveAttribute('data-skeleton');
  });

  it('can be turned on for every instance through themeDefaults', () => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ badge: { skeleton: true } }}>
        <Badge data-testid="badge">New</Badge>
      </ThemeProvider>
    );
    expect(byTestId(container, 'badge')).toHaveAttribute('data-skeleton');
  });

  it('is a category of every component that takes the hide props', () => {
    const nodes = themeNodes(defaultTheme);
    expect(nodes.length).toBeGreaterThan(50);
    const missing = nodes
      .filter(({ theme }) => {
        const { categories } = theme as unknown as { categories: readonly string[] };
        return categories.includes('hide') && !categories.includes('skeleton');
      })
      .map(({ path }) => path);
    expect(missing).toEqual([]);
  });
});

describe('Skeleton', () => {
  it('renders a full-width placeholder box hidden from assistive tech', () => {
    const { container } = renderUi(<Skeleton data-testid="s" />);
    const box = byTestId(container, 's');
    expect(box.tagName).toBe('DIV');
    expect(box).toHaveClass('vane-skeleton', 'w-full', 'block');
    expect(box).toHaveAttribute('data-skeleton', '');
    expect(box).toHaveAttribute('aria-hidden', 'true');
    expect(box).toHaveAttribute('data-size', 'md');
    expect(box).toHaveAttribute('data-vane-type', 'ui');
    // hidden from assistive tech, so there is nothing to mark busy
    expect(box).not.toHaveAttribute('aria-busy');
  });

  it('takes the size, shape and aspect props', () => {
    const { container } = renderUi(
      <>
        <Skeleton lg data-testid="lg" />
        <Skeleton pill aspectSquare data-testid="circle" />
        <Skeleton sharp aspectVideo data-testid="video" />
      </>
    );
    expect(byTestId(container, 'lg')).toHaveAttribute('data-size', 'lg');
    expect(byTestId(container, 'circle')).toHaveClass('rounded-full', 'aspect-square');
    expect(byTestId(container, 'video')).toHaveClass('rounded-none', 'aspect-video');
  });

  it('forwards the ref, merges className and switches the tag', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = renderUi(<Skeleton ref={ref} tag="span" className="h-40" data-testid="s" />);
    const box = byTestId(container, 's');
    expect(ref.current).toBe(box);
    expect(box.tagName).toBe('SPAN');
    expect(box).toHaveClass('h-40', 'vane-skeleton');
  });

  it('marks it busy once the caller turns aria-hidden off', () => {
    const { container } = renderUi(<Skeleton aria-hidden={false} data-testid="s" />);
    const box = byTestId(container, 's');
    expect(box).toHaveAttribute('aria-hidden', 'false');
    expect(box).toHaveAttribute('aria-busy', 'true');
  });

  it('keeps boolean props off the DOM', () => {
    const { container } = renderUi(<Col><Skeleton xl pill aspectSquare wFit data-testid="s" /></Col>);
    const box = byTestId(container, 's');
    for (const name of ['xl', 'pill', 'aspectsquare', 'wfit', 'skeleton']) {
      expect(box).not.toHaveAttribute(name);
    }
  });
});
