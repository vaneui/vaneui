import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { BreadcrumbSeparatorProps } from "./BreadcrumbPartProps";
import type { BreadcrumbSeparatorTheme } from "./BreadcrumbTheme";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { ShrinkClassMapper } from "../theme/layout";
import { BREADCRUMB_SEPARATOR_CATEGORIES } from "./BreadcrumbCategories";
import { breadcrumbSeparatorDefaults } from "./breadcrumbSeparatorDefaults";

// Decorative and hidden from assistive tech: the ordered list already says where each item sits.
export const defaultBreadcrumbSeparatorTheme = new ComponentTheme<BreadcrumbSeparatorProps, BreadcrumbSeparatorTheme>(
  "span",
  "vane-breadcrumb-separator",
  {
    separatorElement: () =>
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
      </svg>,
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
