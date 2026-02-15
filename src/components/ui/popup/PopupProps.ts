import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  PositionProps,
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
  PositionProps &
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
    /** Whether popup is open (controlled mode). If omitted, uses internal state. */
    open?: boolean;
    /** Called when popup should close (Escape key, click outside) */
    onClose?: () => void;
    /** Initial open state for uncontrolled mode (default: false) */
    defaultOpen?: boolean;
    /** Called when open state changes (both controlled and uncontrolled modes) */
    onOpenChange?: (open: boolean) => void;
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
    /** Animation duration in ms (default: 200) */
    transitionDuration?: number;
    /** ARIA role for the popup (default: "dialog") */
    role?: string;
    /** Show an arrow/pointer pointing toward the anchor (default: false) */
    arrow?: boolean;
    /** Prevent popup from opening (default: false) */
    disabled?: boolean;
    /** Called when enter transition completes */
    onEnterComplete?: () => void;
    /** Called when exit transition completes */
    onExitComplete?: () => void;
    /** Hide popup when anchor scrolls out of view (default: false) */
    hideWhenDetached?: boolean;
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
