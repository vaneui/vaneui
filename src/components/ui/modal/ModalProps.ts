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
    /** Whether modal is open */
    open: boolean;
    /** Called when modal should close (Escape key, overlay click) */
    onClose: () => void;
    /** Close when clicking overlay (default: true) */
    closeOnOverlayClick?: boolean;
    /** Close when pressing Escape (default: true) */
    closeOnEscape?: boolean;
    /** Lock body scroll when open (default: true) */
    scrollLock?: boolean;
    /** Trap focus inside modal (default: true) */
    focusTrap?: boolean;
    /** Props passed to the internal Overlay component */
    overlayProps?: Partial<OverlayProps>;
    /** Keep DOM mounted when closed (default: false) */
    keepMounted?: boolean;
    /** Disable enter/exit animations (default: false) */
    noAnimation?: boolean;
    /** Show close "X" button in top-right corner (default: false) */
    closeButton?: boolean;
    /** Center modal vertically (default: true). Set false for top-aligned. */
    centered?: boolean;
    /** Full-screen modal with no border-radius and no overlay (default: false) */
    fullScreen?: boolean;
    /** ID of the element that labels the modal */
    ariaLabelledBy?: string;
    /** ID of the element that describes the modal */
    ariaDescribedBy?: string;
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
