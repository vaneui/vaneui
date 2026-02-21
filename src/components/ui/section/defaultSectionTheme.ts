import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { SectionProps } from "./SectionProps";
import type { SectionTheme } from "./SectionTheme";
import { SECTION_CATEGORIES } from "./SectionCategories";
import { sectionDefaults } from "./sectionDefaults";
import { BreakpointClassMapper } from "../theme/size";
import { TextAlignClassMapper } from "../theme/typography";

export const defaultSectionTheme = new ComponentTheme<SectionProps, SectionTheme>(
  "div",
  "vane-section",
  {
    ...layoutClassMappers,
    size: {
      ...layoutClassMappers.size,
      breakpoint: new BreakpointClassMapper(),
    },
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  sectionDefaults,
  SECTION_CATEGORIES,
  undefined,
  'layout'
);
