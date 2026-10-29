import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common/ComponentTheme";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { HeightClassMapper, RadiusClassMapper, TransitionClassMapper, WidthClassMapper } from "../theme/layout";

/** Theme interface for the Progress fill element */
export interface ProgressFillTheme extends BaseComponentTheme {
  appearance: {
    background: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    width: WidthClassMapper;
    height: HeightClassMapper;
    radius: RadiusClassMapper;
    transition: TransitionClassMapper;
  };
}
