import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { SectionProps } from "./SectionProps";
import type { SectionTheme } from "./SectionTheme";
import { SECTION_CATEGORIES } from "./SectionCategories";
import { layoutClassMappers } from "../theme/common/layoutClassMappers";
import { sectionDefaults } from "./sectionDefaults";
import { BreakpointClassMapper } from "../theme/size/breakpointClassMapper";

export const defaultSectionTheme = new ComponentTheme<SectionProps, SectionTheme>(
  "div",
  "vane-section w-full",
  {
    ...layoutClassMappers,
    size: {
      ...layoutClassMappers.size,
      breakpoint: new BreakpointClassMapper(),
    },
  },
  sectionDefaults,
  SECTION_CATEGORIES,
  undefined,
  'layout'
);
