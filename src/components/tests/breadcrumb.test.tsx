import '@testing-library/jest-dom';
import { createRef, forwardRef, type ReactElement } from 'react';
import type React from 'react';
import { render, screen } from '@testing-library/react';

import { Breadcrumb, BreadcrumbItem, ThemeProvider, defaultTheme } from '../../index';

const renderUi = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

const trail = (
  <Breadcrumb>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
    <BreadcrumbItem>Button</BreadcrumbItem>
  </Breadcrumb>
);

describe('Breadcrumb', () => {
  it('should render a labelled nav landmark around an ordered list of items', () => {
    const { container } = renderUi(trail);
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toHaveClass('vane-breadcrumb');
    const list = nav.querySelector('ol') as HTMLOListElement;
    expect(list).toHaveClass('vane-breadcrumb-list', 'flex', 'flex-wrap', 'items-center', 'gap-(--gap)');
    expect(list.children).toHaveLength(3);
    expect(Array.from(list.children).every(li => li.tagName === 'LI')).toBe(true);
    expect(container.querySelectorAll('.vane-breadcrumb-item')).toHaveLength(3);
  });

  it('should render items with href as links and the rest as text', () => {
    renderUi(trail);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
    expect(screen.getByText('Button').tagName).toBe('SPAN');
  });

  it('should mark the last item as the current page by default', () => {
    renderUi(trail);
    expect(screen.getByText('Button')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('aria-current');
  });

  it('should follow an explicit current instead of the last item', () => {
    renderUi(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs" current>Docs</BreadcrumbItem>
        <BreadcrumbItem href="/docs/button">Button</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Button' })).not.toHaveAttribute('aria-current');
  });

  it('should mark no item when the last one opts out', () => {
    const { container } = renderUi(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs" current={false}>Docs</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(container.querySelector('[aria-current]')).toBeNull();
  });

  it('should draw a hidden separator before every item but the first', () => {
    const { container } = renderUi(trail);
    const items = container.querySelectorAll('li');
    expect(items[0].querySelector('.vane-breadcrumb-separator')).toBeNull();
    for (const li of [items[1], items[2]]) {
      const separator = li.querySelector('.vane-breadcrumb-separator') as HTMLElement;
      expect(separator).toHaveAttribute('aria-hidden', 'true');
      expect(separator.querySelector('svg')).toBeInTheDocument();
      // the separator comes before the item in the same li
      expect(li.firstElementChild).toBe(separator);
    }
  });

  it('should draw a custom separator', () => {
    const { container } = renderUi(
      <Breadcrumb separator="/">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Docs</BreadcrumbItem>
      </Breadcrumb>
    );
    const separator = container.querySelector('.vane-breadcrumb-separator') as HTMLElement;
    expect(separator).toHaveTextContent('/');
    expect(separator.querySelector('svg')).toBeNull();
  });

  it('should take a router link through tag', () => {
    const RouterLink = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string }>(
      function RouterLink({ to, ...props }, ref) {
        return <a ref={ref} data-router="yes" href={to} {...props} />;
      }
    );
    renderUi(
      <Breadcrumb>
        <BreadcrumbItem tag={RouterLink} href="/docs">Docs</BreadcrumbItem>
        <BreadcrumbItem>Button</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('data-router', 'yes');
  });

  it('should style the trail with its defaults: sm, secondary', () => {
    renderUi(trail);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('data-size', 'sm');
    expect(nav).toHaveAttribute('data-appearance', 'secondary');
    expect(nav).toHaveClass('text-(length:--fs)');
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveClass('vane-breadcrumb-item', 'whitespace-nowrap', 'focus-visible:outline-2');
  });

  it('should take size and appearance props on the root', () => {
    renderUi(
      <Breadcrumb lg primary>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('data-size', 'lg');
    expect(nav).toHaveAttribute('data-appearance', 'primary');
  });

  it('should let aria-label be replaced, merge className and forward refs', () => {
    const navRef = createRef<HTMLElement>();
    const itemRef = createRef<HTMLElement>();
    renderUi(
      <Breadcrumb ref={navRef} aria-label="Fil d’Ariane" className="custom-nav">
        <BreadcrumbItem ref={itemRef} href="/" className="custom-item">Accueil</BreadcrumbItem>
      </Breadcrumb>
    );
    const nav = screen.getByRole('navigation', { name: 'Fil d’Ariane' });
    expect(navRef.current).toBe(nav);
    expect(nav).toHaveClass('custom-nav');
    const link = screen.getByRole('link', { name: 'Accueil' });
    expect(itemRef.current).toBe(link);
    expect(link).toHaveClass('custom-item');
  });

  it('should not leak its props to the DOM', () => {
    const { container } = renderUi(
      <Breadcrumb lg primary separator="/">
        <BreadcrumbItem href="/" fontBold current>Home</BreadcrumbItem>
      </Breadcrumb>
    );
    const nav = container.querySelector('nav') as HTMLElement;
    for (const attr of ['lg', 'primary', 'separator']) expect(nav).not.toHaveAttribute(attr);
    const link = container.querySelector('a') as HTMLElement;
    for (const attr of ['fontbold', 'current']) expect(link).not.toHaveAttribute(attr);
  });

  it('should render an item outside a Breadcrumb as a plain item with no separator', () => {
    const { container } = renderUi(<ol><BreadcrumbItem href="/">Home</BreadcrumbItem></ol>);
    expect(container.querySelector('.vane-breadcrumb-separator')).toBeNull();
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });
});
