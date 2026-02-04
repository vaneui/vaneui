import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { SectionProps } from "./SectionProps";
import type { SectionTheme } from "./SectionTheme";
import { SECTION_CATEGORIES } from "./SectionCategories";
import { layoutSubThemes } from "../theme/common/layoutSubThemes";
import { sectionDefaults } from "./sectionDefaults";
import { BreakpointTheme } from "../theme/size/breakpointTheme";

export const defaultSectionTheme = new ComponentTheme<SectionProps, SectionTheme>(
  "div",
  "vane-section w-full",
  {
    ...layoutSubThemes,
    size: {
      ...layoutSubThemes.size,
      breakpoint: new BreakpointTheme(),
    },
  },
  sectionDefaults,
  SECTION_CATEGORIES,
  undefined,
  'layout'
);
