import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { SectionProps } from "./SectionProps";
import type { SectionTheme } from "./SectionTheme";
import { SECTION_CATEGORIES } from "./SectionCategories";
import { layoutSubThemes } from "../theme/common/layoutSubThemes";
import { sectionDefaults } from "./sectionDefaults";
import { BreakpointClassMapper } from "../theme/size/breakpointClassMapper";

export const defaultSectionTheme = new ComponentTheme<SectionProps, SectionTheme>(
  "div",
  "vane-section w-full",
  {
    ...layoutSubThemes,
    size: {
      ...layoutSubThemes.size,
      breakpoint: new BreakpointClassMapper(),
    },
  },
  sectionDefaults,
  SECTION_CATEGORIES,
  undefined,
  'layout'
);
