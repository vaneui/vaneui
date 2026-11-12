import '@testing-library/jest-dom';
import { useRef } from 'react';
import { render, act } from '@testing-library/react';

import { addAnchorName } from '../utils/anchorName';
import { Popup, ThemeProvider, defaultTheme } from '../../index';

const anchorNames = (el: HTMLElement) => el.style.getPropertyValue('anchor-name');

describe('addAnchorName', () => {
  let anchor: HTMLButtonElement;

  beforeEach(() => {
    anchor = document.createElement('button');
    document.body.appendChild(anchor);
  });

  afterEach(() => {
    anchor.remove();
  });

  it('should set the name on an element that has none', () => {
    addAnchorName(anchor, '--a');
    expect(anchorNames(anchor)).toBe('--a');
  });

  it('should list every name when several popups share the element', () => {
    addAnchorName(anchor, '--a');
    addAnchorName(anchor, '--b');
    expect(anchorNames(anchor)).toBe('--a, --b');
  });

  it('should remove only its own name on cleanup', () => {
    const removeA = addAnchorName(anchor, '--a');
    const removeB = addAnchorName(anchor, '--b');

    removeA();
    expect(anchorNames(anchor)).toBe('--b');

    removeB();
    expect(anchorNames(anchor)).toBe('');
    expect(anchor.getAttribute('style') ?? '').not.toContain('anchor-name');
  });

  it('should keep a name the page set itself', () => {
    anchor.style.setProperty('anchor-name', '--page');
    const remove = addAnchorName(anchor, '--a');
    expect(anchorNames(anchor)).toBe('--page, --a');

    remove();
    expect(anchorNames(anchor)).toBe('--page');
  });

  it('should not list a name twice, and treat "none" as an empty list', () => {
    anchor.style.setProperty('anchor-name', 'none');
    addAnchorName(anchor, '--a');
    addAnchorName(anchor, '--a');
    expect(anchorNames(anchor)).toBe('--a');
  });

  it('should tolerate a cleanup that runs twice', () => {
    const removeA = addAnchorName(anchor, '--a');
    addAnchorName(anchor, '--b');
    removeA();
    removeA();
    expect(anchorNames(anchor)).toBe('--b');
  });
});

// Two popups anchored to one element, on the CSS anchor-positioning path. jsdom has no CSS.supports,
// so the path is switched on before the first Popup renders (the check is made once and remembered).
describe('Popup anchor-name with a shared anchor', () => {
  const originalCSS = (globalThis as { CSS?: unknown }).CSS;

  beforeAll(() => {
    (globalThis as { CSS?: unknown }).CSS = { supports: () => true };
  });

  afterAll(() => {
    (globalThis as { CSS?: unknown }).CSS = originalCSS;
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  function TwoPopups({ first, second }: { first: boolean; second: boolean }) {
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <ThemeProvider theme={defaultTheme}>
        <button ref={anchorRef} data-testid="anchor">Anchor</button>
        <Popup open={first} anchorRef={anchorRef} aria-label="First" data-testid="first">One</Popup>
        <Popup open={second} anchorRef={anchorRef} aria-label="Second" data-testid="second">Two</Popup>
      </ThemeProvider>
    );
  }

  const settle = () => act(() => { jest.advanceTimersByTime(250); });
  const positionAnchorOf = (testId: string) =>
    (document.querySelector(`[data-testid="${testId}"]`) as HTMLElement).style.getPropertyValue('position-anchor');

  it('should give the anchor one name per open popup, each popup pointing at its own', () => {
    const { getByTestId } = render(<TwoPopups first second />);
    settle();

    const names = anchorNames(getByTestId('anchor')).split(', ');
    expect(names).toHaveLength(2);
    expect(names).toContain(positionAnchorOf('first'));
    expect(names).toContain(positionAnchorOf('second'));
    expect(positionAnchorOf('first')).not.toBe(positionAnchorOf('second'));
  });

  it('should keep the second popup anchored after the first one closes and unmounts', () => {
    const { getByTestId, rerender, queryByTestId } = render(<TwoPopups first second />);
    settle();
    const secondName = positionAnchorOf('second');

    rerender(<TwoPopups first={false} second />);
    // the first popup is still fading out, so its name is still listed
    expect(anchorNames(getByTestId('anchor')).split(', ')).toHaveLength(2);

    settle();
    expect(queryByTestId('first')).not.toBeInTheDocument();
    expect(anchorNames(getByTestId('anchor'))).toBe(secondName);
  });

  it('should clear the property once the last popup is gone', () => {
    const { getByTestId, rerender } = render(<TwoPopups first second />);
    settle();

    rerender(<TwoPopups first={false} second={false} />);
    settle();

    expect(anchorNames(getByTestId('anchor'))).toBe('');
  });
});
