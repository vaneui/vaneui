/**
 * Test-side constants for the theme system's CSS class encodings.
 *
 * These are INTENTIONAL test-side copies of the encodings produced by the
 * theme class mappers (ring, border, and font-size mappers). Do NOT import
 * them from production code — sourcing the expected strings from the mappers
 * themselves would make every assertion tautological (the implementation
 * would be compared against itself and could never fail).
 *
 * Instead, these constants pin the public CSS-class contract. When a mapper
 * encoding changes deliberately, this file is the ONE place the tests need
 * updating.
 */

/** Ring width consumer class emitted by the `ring` prop. */
export const RING_WIDTH_CLASS = 'ring-[length:var(--rw)]';

/** Inset modifier emitted alongside RING_WIDTH_CLASS by the `ring` prop. */
export const RING_INSET_CLASS = 'ring-inset';

/** Border width consumer class emitted by the `border` prop. */
export const BORDER_WIDTH_CLASS = 'border-[length:var(--bw)]';

/** Font size consumer class emitted by the size props (xs/sm/md/lg/xl). */
export const FONT_SIZE_CLASS = 'text-(length:--fs)';
