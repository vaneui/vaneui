import { ComponentTheme, defaultSizedLayoutClassMappers } from "../theme/common";
import type { SkeletonProps } from "./SkeletonProps";
import type { SkeletonTheme } from "./SkeletonTheme";
import { RadiusClassMapper, ShrinkClassMapper, AspectClassMapper } from "../theme/layout";
import { MarginClassMapper } from "../theme/size";
import { SKELETON_CATEGORIES } from "./SkeletonCategories";
import { skeletonDefaults } from "./skeletonDefaults";

// One line of text tall at its size (rules.css) until an aspect prop, a height prop or a class
// sets the height; the placeholder fill and the pulse come from the `skeleton` rules.
export const defaultSkeletonTheme = new ComponentTheme<SkeletonProps, SkeletonTheme>(
  "div",
  "vane-skeleton min-h-(--min-h)",
  {
    size: {
      margin: new MarginClassMapper(),
    },
    layout: {
      ...defaultSizedLayoutClassMappers,
      radius: new RadiusClassMapper(),
      shrink: new ShrinkClassMapper(),
      aspect: new AspectClassMapper(),
    },
  },
  skeletonDefaults,
  SKELETON_CATEGORIES,
  undefined,
  'ui'
);
