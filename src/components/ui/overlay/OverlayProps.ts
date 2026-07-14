import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  DisplayProps,
  PositionProps,
  OverflowProps,
  TransparentProps,
  ResponsiveProps,
  ItemsProps,
  JustifyProps,
  BlurProps,
  PointerEventsProps,
  WidthProps,
  HeightProps,
} from "../props";

/**
 * Overlay component props.
 *
 * Overlay is a plain backdrop scrim: it renders a fixed, full-viewport layer
 * with a semi-transparent background (--overlay-bg). It intentionally does NOT
 * take appearance/variant/shadow/ring — a fullscreen inset-0 scrim can't show a
 * box-shadow or a filled/appearance background, so those props would be inert.
 * Use `transparent` to suppress the scrim, `blur` for a backdrop blur.
 */
export type OverlayProps = BaseProps &
  SizeProps &
  HideProps &
  DisplayProps &
  PositionProps &
  OverflowProps &
  TransparentProps &
  ResponsiveProps &
  ItemsProps &
  JustifyProps &
  BlurProps &
  PointerEventsProps &
  WidthProps &
  HeightProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
    /** Whether overlay is visible (default: true) */
    open?: boolean;
    /** Called when overlay background is clicked */
    onClose?: () => void;
    /** Render inside portal to document.body (default: true) */
    portal?: boolean;
    /** Keep DOM mounted when closed (default: false) */
    keepMounted?: boolean;
    /** Disable enter/exit animations (default: false) */
    noAnimation?: boolean;
    /** Animation duration in ms (default: 200) */
    transitionDuration?: number;
    /** Called when enter transition completes */
    onEnterComplete?: () => void;
    /** Called when exit transition completes */
    onExitComplete?: () => void;
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
