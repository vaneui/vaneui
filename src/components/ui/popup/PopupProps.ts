import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  DisplayProps,
  OverflowProps,
  WrapProps,
  GapProps,
  FlexDirectionProps,
  AppearanceProps,
  ShadowProps,
  ShapeProps,
  PaddingProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  BorderProps,
  RingProps,
  TransitionProps,
  WidthProps,
  HeightProps,
  PlacementProps,
} from '../props';

/**
 * Popup component props
 */
export type PopupProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  DisplayProps &
  OverflowProps &
  WrapProps &
  GapProps &
  FlexDirectionProps &
  AppearanceProps &
  ShadowProps &
  ShapeProps &
  PaddingProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  BorderProps &
  RingProps &
  TransitionProps &
  WidthProps &
  HeightProps &
  PlacementProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
    /** Whether popup is open */
    open: boolean;
    /** Called when popup should close (Escape key, click outside) */
    onClose?: () => void;
    /** Reference to anchor element */
    anchorRef: React.RefObject<HTMLElement | null>;
    /** Offset from anchor in pixels (default: 4) */
    offset?: number;
    /** Close when pressing Escape (default: true) */
    closeOnEscape?: boolean;
    /** Close when clicking outside (default: true) */
    closeOnClickOutside?: boolean;
    /** Render inside portal (default: true) */
    portal?: boolean;
    /** Match anchor width (default: false) */
    matchWidth?: boolean;
    /** Keep DOM mounted when closed (default: false) */
    keepMounted?: boolean;
    /** Disable enter/exit animations (default: false) */
    noAnimation?: boolean;
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
