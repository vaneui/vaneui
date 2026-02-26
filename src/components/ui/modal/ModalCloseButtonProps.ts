import type {
  BaseProps,
  SizeProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  FocusVisibleProps,
  ShapeProps,
  PaddingProps,
  VariantProps,
  TransparentProps,
  CursorProps,
} from "../props";

/** ModalCloseButton theme props (customizable button appearance) */
export type ModalCloseButtonProps = BaseProps &
  SizeProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  FocusVisibleProps &
  ShapeProps &
  PaddingProps &
  VariantProps &
  TransparentProps &
  CursorProps;
