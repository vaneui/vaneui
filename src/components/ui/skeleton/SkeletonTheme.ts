import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { RadiusClassMapper, ShrinkClassMapper, AspectClassMapper } from "../theme/layout";
import type { MarginClassMapper } from "../theme/size";

/** Theme interface for the Skeleton */
export interface SkeletonTheme extends BaseComponentTheme {
  size: {
    margin: MarginClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    radius: RadiusClassMapper;
    shrink: ShrinkClassMapper;
    aspect: AspectClassMapper;
  };
}
