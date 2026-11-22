import type { ReactElement } from "react";
import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { BorderClassMapper, RadiusClassMapper, RingClassMapper, ShrinkClassMapper } from "../theme/layout";
import type { MarginClassMapper } from "../theme/size";
import type { FontWeightClassMapper } from "../theme/typography";

/** Theme interface for the Avatar */
export interface AvatarTheme extends BaseComponentTheme {
  /** The icon shown with no image, initials or children; replace via `themeOverride` */
  fallbackElement: () => ReactElement;
  size: {
    margin: MarginClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    border: BorderClassMapper;
    ring: RingClassMapper;
    radius: RadiusClassMapper;
    shrink: ShrinkClassMapper;
  };
  typography: {
    fontWeight: FontWeightClassMapper;
  };
}
