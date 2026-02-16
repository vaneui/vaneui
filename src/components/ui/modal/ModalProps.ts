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
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  FontFamilyProps,
  TextAlignProps,
  PaddingProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  WidthProps,
  HeightProps,
} from "../props";
import type { OverlayProps } from "../overlay";

/**
 * Modal component props
 */
export type ModalProps = BaseProps &
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
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  PaddingProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  WidthProps &
  HeightProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
    /** Whether modal is open (controlled mode). If omitted, uses internal state. */
    open?: boolean;
    /** Called when modal should close (Escape key, overlay click) */
    onClose?: () => void;
    /** Initial open state for uncontrolled mode (default: false) */
    defaultOpen?: boolean;
    /** Called when open state changes (both controlled and uncontrolled modes) */
    onOpenChange?: (open: boolean) => void;
    /** Close when clicking overlay (default: true) */
    closeOnOverlayClick?: boolean;
    /** Close when pressing Escape (default: true) */
    closeOnEscape?: boolean;
    /** Lock body scroll when open (default: true) */
    scrollLock?: boolean;
    /** Trap focus inside modal (default: true) */
    focusTrap?: boolean;
    /** Return focus to trigger element on close (default: true) */
    returnFocus?: boolean;
    /** Ref to element that should receive focus when modal opens */
    initialFocus?: React.RefObject<HTMLElement | null>;
    /** Props passed to the internal Overlay component */
    overlayProps?: Partial<OverlayProps>;
    /** Keep DOM mounted when closed (default: false) */
    keepMounted?: boolean;
    /** Disable enter/exit animations (default: false) */
    noAnimation?: boolean;
    /** Animation duration in ms (default: 200) */
    transitionDuration?: number;
    /** Full-screen modal with no border-radius and no overlay (default: false) */
    fullScreen?: boolean;
    /** Render inside portal to document.body (default: true) */
    portal?: boolean;
    /** Called when enter transition completes */
    onEnterComplete?: () => void;
    /** Called when exit transition completes */
    onExitComplete?: () => void;
    /** Modal title — renders a ModalHeader with content and optional close button */
    title?: React.ReactNode;
    /** Modal footer content — renders a ModalFooter */
    footer?: React.ReactNode;
    /** Show close button in header (default: true when title is set, false otherwise) */
    withCloseButton?: boolean;
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
