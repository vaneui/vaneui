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
  FlexDirectionProps,
  MarginProps,
} from "../props";
import type { CleanHTMLProps } from "../props/baseProps";

/** AvatarGroup component props */
export type AvatarGroupProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  FlexDirectionProps &
  MarginProps &
  CleanHTMLProps<React.HTMLAttributes<HTMLDivElement>> & {
  /** Show at most this many avatars; the rest become one "+N" avatar */
  max?: number;
  /** Total count when the children are only the first few (a server sends 5 of 120); the "+N" counts the rest */
  total?: number;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
