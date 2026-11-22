import type React from 'react';
import type {
  BaseProps,
  FontWeightProps,
  FocusVisibleProps,
  TransitionProps,
  WhitespaceProps,
  CursorProps,
} from "../props";
import type { CleanHTMLProps } from "../props/baseProps";

/** BreadcrumbItem component props */
export type BreadcrumbItemProps = BaseProps &
  FontWeightProps &
  FocusVisibleProps &
  TransitionProps &
  WhitespaceProps &
  CursorProps &
  CleanHTMLProps<React.HTMLAttributes<HTMLElement>> &
  Partial<CleanHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>> & {
  /** Link target; without it the item is plain text */
  href?: string;
  /** The page the user is on: `aria-current="page"` and the strong text color. The last item is the current one unless an item sets it */
  current?: boolean;
  /** Custom HTML tag or React component to render as, such as a router's Link */
  tag?: React.ElementType;
};
