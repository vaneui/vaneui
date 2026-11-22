import { lockScroll, unlockScroll } from '../utils/scrollLock';

// The lock hides the page's scrollbar and pads <body> by its width, so the page does not move.
// A gutter reserved with `scrollbar-gutter: stable` stays when the scrollbar goes, so padding it
// as well would shift the page left by the scrollbar width.
describe('scroll lock and the scrollbar gutter', () => {
  const html = document.documentElement;

  beforeEach(() => {
    // jsdom has no layout: a 1024px window with a 15px classic scrollbar
    Object.defineProperty(html, 'clientWidth', { configurable: true, value: 1009 });
  });

  afterEach(() => {
    unlockScroll();
    html.style.removeProperty('scrollbar-gutter');
    delete (html as unknown as Record<string, unknown>).clientWidth;
  });

  it('should pad the body by the scrollbar width when no gutter is reserved', () => {
    lockScroll();
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.paddingRight).toBe('15px');
  });

  it.each(['stable', 'stable both-edges'])('should not pad the body when the root has scrollbar-gutter: %s', (gutter) => {
    html.style.setProperty('scrollbar-gutter', gutter);
    lockScroll();
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.paddingRight).toBe('');
  });

  it('should restore the body when the lock is released', () => {
    document.body.style.paddingRight = '4px';
    html.style.setProperty('scrollbar-gutter', 'stable');
    lockScroll();
    unlockScroll();
    expect(document.body.style.overflow).toBe('');
    expect(document.body.style.paddingRight).toBe('4px');
    document.body.style.paddingRight = '';
  });
});
