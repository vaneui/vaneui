import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { BreadcrumbItemProps } from "./BreadcrumbItemProps";
import type { BreadcrumbItemTheme } from "./BreadcrumbTheme";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { CursorClassMapper, FocusVisibleClassMapper, TransitionClassMapper, WhitespaceClassMapper } from "../theme/layout";
import { FontWeightClassMapper } from "../theme/typography";
import { focusVisibleConsumerClass } from "../classes/appearanceClasses";
import { BREADCRUMB_ITEM_CATEGORIES } from "./BreadcrumbCategories";
import { breadcrumbItemDefaults } from "./breadcrumbItemDefaults";

// A link (`<a>`, or `tag`) or, with no href, plain text. It takes the trail's color; a link
// turns to the strong text color and underlines on hover, and the current page is in the
// strong color. The focus ring uses the Breadcrumb's focus color.
export const defaultBreadcrumbItemTheme = new ComponentTheme<BreadcrumbItemProps, BreadcrumbItemTheme>(
  "span",
  "vane-breadcrumb-item underline-offset-2 [&[href]]:hover:underline [&[href]]:hover:text-(--color-text-primary) aria-[current=page]:text-(--color-text-primary) rounded-[calc(2px*var(--br-scale))]",
  {
    appearance: {
      focusVisible: new SimpleConsumerClassMapper({ base: focusVisibleConsumerClass, alwaysOutput: true }, 'focusVisible'),
    },
    layout: {
      ...defaultLayoutClassMappers,
      focusVisible: new FocusVisibleClassMapper(),
      transition: new TransitionClassMapper(),
      whitespace: new WhitespaceClassMapper(),
      cursor: new CursorClassMapper(),
    },
    typography: {
      fontWeight: new FontWeightClassMapper(),
    },
  },
  breadcrumbItemDefaults,
  BREADCRUMB_ITEM_CATEGORIES,
  (props: BreadcrumbItemProps) => props.href ? "a" : "span",
  'ui'
);
