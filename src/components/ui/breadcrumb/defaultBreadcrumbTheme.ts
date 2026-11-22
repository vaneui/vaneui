import { ComponentTheme, defaultLayoutClassMappers, textAppearance } from "../theme/common";
import type { BreadcrumbProps } from "./BreadcrumbProps";
import type { BreadcrumbTheme } from "./BreadcrumbTheme";
import { FontSizeClassMapper, MarginClassMapper } from "../theme/size";
import { FontFamilyClassMapper, FontWeightClassMapper } from "../theme/typography";
import { BREADCRUMB_CATEGORIES } from "./BreadcrumbCategories";
import { breadcrumbDefaults } from "./breadcrumbDefaults";

// The <nav> landmark. Its size sets the text size, gap and separator size of the whole
// trail through the cascade, and its appearance the color of the links.
export const defaultBreadcrumbTheme = new ComponentTheme<BreadcrumbProps, BreadcrumbTheme>(
  "nav",
  "vane-breadcrumb",
  {
    size: {
      text: new FontSizeClassMapper(),
      margin: new MarginClassMapper(),
    },
    appearance: {
      text: textAppearance,
    },
    layout: defaultLayoutClassMappers,
    typography: {
      fontFamily: new FontFamilyClassMapper(),
      fontWeight: new FontWeightClassMapper(),
    },
  },
  breadcrumbDefaults,
  BREADCRUMB_CATEGORIES,
  undefined,
  'ui'
);
