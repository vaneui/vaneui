import '@testing-library/jest-dom';
import { useRef } from 'react';
import { render, act } from '@testing-library/react';

import { Popup, ThemeProvider, defaultTheme } from '../../index';
import { resetStackCount } from '../utils/stackingContext';
import { resetOverlayStack } from '../utils/overlayStack';
import { resetEscapeStack } from '../utils/escapeStack';

// The JS positioning path (engines without CSS anchor positioning; jsdom always takes it) must
// follow the anchor when layout moves it, not only on scroll and resize: content above the anchor
// grows, or the popup's own content changes size.

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
const frames = async (n: number) => {
  for (let i = 0; i < n; i++) await nextFrame();
};

describe('Popup on the JS positioning path', () => {
  const rects: Record<string, { top: number; left: number; width: number; height: number }> = {};
  let measured = 0;
  let original: typeof HTMLElement.prototype.getBoundingClientRect;

  beforeEach(() => {
    resetStackCount();
    resetOverlayStack();
    resetEscapeStack();
    rects.anchor = { top: 100, left: 50, width: 80, height: 30 };
    rects.pop = { top: 0, left: 0, width: 120, height: 40 };
    measured = 0;
    original = HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function (this: HTMLElement) {
      const r = rects[this.dataset.testid ?? ''];
      if (!r) return original.call(this);
      measured++;
      return { ...r, x: r.left, y: r.top, right: r.left + r.width, bottom: r.top + r.height, toJSON: () => r } as DOMRect;
    };
  });

  afterEach(() => {
    HTMLElement.prototype.getBoundingClientRect = original;
  });

  function Harness({ placeTop = false }: { placeTop?: boolean }) {
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <ThemeProvider theme={defaultTheme}>
        <div data-testid="spacer" />
        <button ref={ref} data-testid="anchor">Anchor</button>
        <Popup
          open
          anchorRef={ref}
          placeBottomStart={!placeTop}
          placeTopStart={placeTop}
          aria-label="Details"
          noAnimation
          closeOnClickOutside={false}
          data-testid="pop"
        >
          <span data-testid="content">Details</span>
        </Popup>
      </ThemeProvider>
    );
  }

  const popup = () => document.body.querySelector('[data-testid="pop"]') as HTMLElement;

  it('should follow an anchor that layout moves without a scroll or resize', async () => {
    const { getByTestId } = render(<Harness />);
    expect(popup().style.top).toBe('134px'); // anchor bottom 130 + offset 4

    // content above the anchor grows by 150px
    await act(async () => {
      rects.anchor = { ...rects.anchor, top: 250 };
      getByTestId('spacer').style.height = '150px';
      await frames(2);
    });
    expect(popup().style.top).toBe('284px');
  });

  it('should keep a top-placed popup on its anchor when its content grows', async () => {
    const { getByTestId } = render(<Harness placeTop />);
    expect(popup().style.top).toBe('56px'); // anchor top 100 - offset 4 - height 40

    await act(async () => {
      rects.pop = { ...rects.pop, height: 80 };
      getByTestId('content').textContent = 'Details with a much longer description';
      await frames(2);
    });
    expect(popup().style.top).toBe('16px');
  });

  it('should measure once more after the first frame on open', async () => {
    render(<Harness placeTop />);
    expect(popup().style.top).toBe('56px');

    // the popup settles to its final size after the first layout, with no DOM change
    rects.pop = { ...rects.pop, height: 60 };
    await act(async () => {
      await frames(2);
    });
    expect(popup().style.top).toBe('36px');
  });

  it('should stop measuring once nothing has moved', async () => {
    const { getByTestId } = render(<Harness />);
    await act(async () => {
      rects.anchor = { ...rects.anchor, top: 250 };
      getByTestId('spacer').style.height = '150px';
      await frames(6);
    });
    // the move, then one more look after the popup's own style update
    await act(async () => {
      await frames(6);
    });
    const settled = measured;
    await act(async () => {
      await frames(10);
    });
    expect(measured).toBe(settled);
  });
});
