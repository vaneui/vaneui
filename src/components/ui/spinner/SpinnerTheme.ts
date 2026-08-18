import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common/ComponentTheme";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { FontSizeClassMapper, MarginClassMapper } from "../theme/size";

/** Theme interface for the Spinner component */
export interface SpinnerTheme extends BaseComponentTheme {
  size: {
    text: FontSizeClassMapper;
    margin: MarginClassMapper;
  };
  appearance: {
    text: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers;
}
