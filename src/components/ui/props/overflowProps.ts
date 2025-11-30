/**
 * Overflow props for controlling content overflow behavior
 */

export interface OverflowProps {
  /** Auto overflow - show scrollbars if needed */
  overflowAuto?: boolean;
  /** Hidden overflow - clip content without scrollbars */
  overflowHidden?: boolean;
  /** Clip overflow - hard clip without scrollbars */
  overflowClip?: boolean;
  /** Visible overflow - content extends beyond bounds */
  overflowVisible?: boolean;
  /** Scroll overflow - always show scrollbars */
  overflowScroll?: boolean;
  /** Auto overflow on X-axis only */
  overflowXAuto?: boolean;
  /** Auto overflow on Y-axis only */
  overflowYAuto?: boolean;
  /** Hidden overflow on X-axis only */
  overflowXHidden?: boolean;
  /** Hidden overflow on Y-axis only */
  overflowYHidden?: boolean;
  /** Clip overflow on X-axis only */
  overflowXClip?: boolean;
  /** Clip overflow on Y-axis only */
  overflowYClip?: boolean;
  /** Visible overflow on X-axis only */
  overflowXVisible?: boolean;
  /** Visible overflow on Y-axis only */
  overflowYVisible?: boolean;
  /** Scroll overflow on X-axis only */
  overflowXScroll?: boolean;
  /** Scroll overflow on Y-axis only */
  overflowYScroll?: boolean;
}
