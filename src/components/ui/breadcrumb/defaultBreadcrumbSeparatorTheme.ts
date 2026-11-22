import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { BreadcrumbSeparatorProps } from "./BreadcrumbPartProps";
import type { BreadcrumbSeparatorTheme } from "./BreadcrumbTheme";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { ShrinkClassMapper } from "../theme/layout";
import { BREADCRUMB_SEPARATOR_CATEGORIES } from "./BreadcrumbCategories";
import { breadcrumbSeparatorDefaults } from "./breadcrumbSeparatorDefaults";
import { breadcrumbSeparatorIcon } from "./breadcrumbSeparatorIcon";

// Decorative and hidden from assistive tech: the ordered list already says where each item sits.
export const defaultBreadcrumbSeparatorTheme = new ComponentTheme<BreadcrumbSeparatorProps, BreadcrumbSeparatorTheme>(
  "span",
  "vane-breadcrumb-separator",
  {
    separatorElement: breadcrumbSeparatorIcon,
    appearance: {
      color: new SimpleConsumerClassMapper({ base: "text-(--color-text-tertiary)", alwaysOutput: true }, 'text'),
    },
    layout: {
      ...defaultLayoutClassMappers,
      shrink: new ShrinkClassMapper(),
    },
  },
  breadcrumbSeparatorDefaults,
  BREADCRUMB_SEPARATOR_CATEGORIES,
  undefined,
  'ui'
);
