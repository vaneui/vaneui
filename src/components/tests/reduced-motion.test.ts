import * as fs from 'fs';
import * as path from 'path';

/**
 * Tests for prefers-reduced-motion CSS support (REC-A11Y-04).
 *
 * Verifies that rules.css contains a @media (prefers-reduced-motion: reduce)
 * block that disables animations and transitions for users who prefer reduced
 * motion at the OS level.
 *
 * This is a CSS-level accessibility feature, independent of the programmatic
 * `noAnimation` prop available on Modal, Popup, and Overlay components.
 */

const cssFilePath = path.resolve(__dirname, '../css/rules.css');
const cssContent = fs.readFileSync(cssFilePath, 'utf-8');

describe('prefers-reduced-motion support', () => {
  it('should contain a @media (prefers-reduced-motion: reduce) block', () => {
    expect(cssContent).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('should target overlay animations with [data-state]', () => {
    expect(cssContent).toContain('.vane-overlay[data-state]');
    // Verify it's inside the reduced-motion media query
    const mediaBlock = extractReducedMotionBlock(cssContent);
    expect(mediaBlock).toContain('.vane-overlay[data-state]');
  });

  it('should target modal animations with [data-state]', () => {
    expect(cssContent).toContain('.vane-modal[data-state]');
    const mediaBlock = extractReducedMotionBlock(cssContent);
    expect(mediaBlock).toContain('.vane-modal[data-state]');
  });

  it('should target popup animations with [data-state]', () => {
    expect(cssContent).toContain('.vane-popup[data-state]');
    const mediaBlock = extractReducedMotionBlock(cssContent);
    expect(mediaBlock).toContain('.vane-popup[data-state]');
  });

  it('should target spinner animation', () => {
    const mediaBlock = extractReducedMotionBlock(cssContent);
    expect(mediaBlock).toContain('.vane-button-spinner-ring');
  });

  it('should use 0.01ms duration (not 0s) to preserve JS event listeners', () => {
    const mediaBlock = extractReducedMotionBlock(cssContent);
    expect(mediaBlock).toContain('animation-duration: 0.01ms');
    expect(mediaBlock).toContain('animation-iteration-count: 1');
    expect(mediaBlock).not.toContain('animation-duration: 0s');
    expect(mediaBlock).not.toContain('animation-duration: 0ms');
  });

  it('should target transitions on [data-vane-type] elements', () => {
    const mediaBlock = extractReducedMotionBlock(cssContent);
    expect(mediaBlock).toContain('[data-vane-type]');
    expect(mediaBlock).toContain('transition-duration: 0.01ms');
  });

  it('should use !important to override existing animation/transition rules', () => {
    const mediaBlock = extractReducedMotionBlock(cssContent);
    expect(mediaBlock).toContain('animation-duration: 0.01ms !important');
    expect(mediaBlock).toContain('animation-iteration-count: 1 !important');
    expect(mediaBlock).toContain('transition-duration: 0.01ms !important');
  });
});

describe('noAnimation prop independence', () => {
  it('should still exist on Modal component', () => {
    const modalSource = fs.readFileSync(
      path.resolve(__dirname, '../ui/modal/ModalProps.ts'), 'utf-8'
    );
    expect(modalSource).toContain('noAnimation');
  });

  it('should still exist on Popup component', () => {
    const popupSource = fs.readFileSync(
      path.resolve(__dirname, '../ui/popup/PopupProps.ts'), 'utf-8'
    );
    expect(popupSource).toContain('noAnimation');
  });

  it('should still exist on Overlay component', () => {
    const overlaySource = fs.readFileSync(
      path.resolve(__dirname, '../ui/overlay/OverlayProps.ts'), 'utf-8'
    );
    expect(overlaySource).toContain('noAnimation');
  });
});

/**
 * Extracts the content of the @media (prefers-reduced-motion: reduce) block
 * from the CSS source. Uses brace counting to find the matching closing brace.
 */
function extractReducedMotionBlock(css: string): string {
  const marker = '@media (prefers-reduced-motion: reduce)';
  const startIndex = css.indexOf(marker);
  if (startIndex === -1) return '';

  // Find the opening brace after the marker
  const braceStart = css.indexOf('{', startIndex);
  if (braceStart === -1) return '';

  let depth = 1;
  let i = braceStart + 1;
  while (i < css.length && depth > 0) {
    if (css[i] === '{') depth++;
    if (css[i] === '}') depth--;
    i++;
  }

  return css.substring(startIndex, i);
}
