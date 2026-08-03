import { render } from '@testing-library/react';
import { Card, ThemeProvider } from '../..';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Border & margin composability (Tier 3)', () => {
  it('composes marginT + marginB into both side classes', () => {
    const { container } = renderWithTheme(<Card marginT marginB>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('mt-(--margin)');
    expect(el.className).toContain('mb-(--margin)');
  });

  it('composes borderT + borderL into both side classes', () => {
    const { container } = renderWithTheme(<Card borderT borderL>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('border-t-[length:var(--bw)]');
    expect(el.className).toContain('border-l-[length:var(--bw)]');
  });

  it('lets noMargin reset win over a side margin toggle', () => {
    const { container } = renderWithTheme(<Card noMargin marginT>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('m-0');
    expect(el.className).not.toContain('mt-(--margin)');
  });

  it('composes borderX + borderT into both classes', () => {
    const { container } = renderWithTheme(<Card borderX borderT>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('border-x-[length:var(--bw)]');
    expect(el.className).toContain('border-t-[length:var(--bw)]');
  });
});
