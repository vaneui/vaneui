/** Auto overflow - show scrollbars if needed */
export const OVERFLOW_AUTO = 'overflowAuto' as const;
/** Hidden overflow - clip content without scrollbars */
export const OVERFLOW_HIDDEN = 'overflowHidden' as const;
/** Clip overflow - hard clip without scrollbars */
export const OVERFLOW_CLIP = 'overflowClip' as const;
/** Visible overflow - content extends beyond bounds */
export const OVERFLOW_VISIBLE = 'overflowVisible' as const;
/** Scroll overflow - always show scrollbars */
export const OVERFLOW_SCROLL = 'overflowScroll' as const;
/** Auto overflow on X-axis only */
export const OVERFLOW_X_AUTO = 'overflowXAuto' as const;
/** Auto overflow on Y-axis only */
export const OVERFLOW_Y_AUTO = 'overflowYAuto' as const;
/** Hidden overflow on X-axis only */
export const OVERFLOW_X_HIDDEN = 'overflowXHidden' as const;
/** Hidden overflow on Y-axis only */
export const OVERFLOW_Y_HIDDEN = 'overflowYHidden' as const;
/** Clip overflow on X-axis only */
export const OVERFLOW_X_CLIP = 'overflowXClip' as const;
/** Clip overflow on Y-axis only */
export const OVERFLOW_Y_CLIP = 'overflowYClip' as const;
/** Visible overflow on X-axis only */
export const OVERFLOW_X_VISIBLE = 'overflowXVisible' as const;
/** Visible overflow on Y-axis only */
export const OVERFLOW_Y_VISIBLE = 'overflowYVisible' as const;
/** Scroll overflow on X-axis only */
export const OVERFLOW_X_SCROLL = 'overflowXScroll' as const;
/** Scroll overflow on Y-axis only */
export const OVERFLOW_Y_SCROLL = 'overflowYScroll' as const;

/** All overflow property values */
export const OVERFLOW_VALUES = [
  OVERFLOW_AUTO, OVERFLOW_HIDDEN, OVERFLOW_CLIP, OVERFLOW_VISIBLE, OVERFLOW_SCROLL,
  OVERFLOW_X_AUTO, OVERFLOW_Y_AUTO, OVERFLOW_X_HIDDEN, OVERFLOW_Y_HIDDEN,
  OVERFLOW_X_CLIP, OVERFLOW_Y_CLIP, OVERFLOW_X_VISIBLE, OVERFLOW_Y_VISIBLE,
  OVERFLOW_X_SCROLL, OVERFLOW_Y_SCROLL
] as const;