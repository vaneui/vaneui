import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { BreadcrumbListProps } from "./BreadcrumbPartProps";
import type { BreadcrumbListTheme } from "./BreadcrumbTheme";
import { GapClassMapper } from "../theme/size";
import { WrapClassMapper } from "../theme/layout";
import { BREADCRUMB_LIST_CATEGORIES } from "./BreadcrumbCategories";
import { breadcrumbListDefaults } from "./breadcrumbListDefaults";

// The <ol> of the trail. It carries no size of its own: --gap comes from the Breadcrumb.
// Each <li> holds the separator (from the second item on) and the item, a gap apart.
export const defaultBreadcrumbListTheme = new ComponentTheme<BreadcrumbListProps, BreadcrumbListTheme>(
  "ol",
  "vane-breadcrumb-list [&>li]:inline-flex [&>li]:items-center [&>li]:gap-(--gap) [&>li]:min-w-0",
  {
    size: {
      gap: new GapClassMapper(),
    },
    layout: {
      ...defaultLayoutClassMappers,
      wrap: new WrapClassMapper(),
    },
  },
  breadcrumbListDefaults,
  BREADCRUMB_LIST_CATEGORIES,
  undefined,
  'ui'
);
