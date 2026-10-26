import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common/ComponentTheme";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { FlexClassMapper, OverflowClassMapper, RadiusClassMapper, TransitionClassMapper, WidthClassMapper } from "../theme/layout";
import type { MarginClassMapper } from "../theme/size";

/** Theme interface for the Progress track */
export interface ProgressTheme extends BaseComponentTheme {
  size: {
    margin: MarginClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    width: WidthClassMapper;
    flex: FlexClassMapper;
    radius: RadiusClassMapper;
    overflow: OverflowClassMapper;
    transition: TransitionClassMapper;
  };
}
