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
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
