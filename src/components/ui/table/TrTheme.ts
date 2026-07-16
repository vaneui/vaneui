import type { BaseComponentTheme } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";

export interface TrTheme extends BaseComponentTheme {
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
  };
}
