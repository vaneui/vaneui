import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  DisplayProps,
  PositionProps,
  OverflowProps,
  AppearanceProps,
  ShadowProps,
  RingProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  ItemsProps,
  JustifyProps,
  BlurProps,
  PointerEventsProps,
  WidthProps,
  HeightProps,
} from "../props";

/** Overlay component props */
export type OverlayProps = BaseProps &
  SizeProps &
  HideProps &
  DisplayProps &
  PositionProps &
  OverflowProps &
  AppearanceProps &
  ShadowProps &
  RingProps &
  VariantProps &
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
