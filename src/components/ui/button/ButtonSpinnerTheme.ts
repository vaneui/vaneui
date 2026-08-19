import type { BaseComponentTheme } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";

/** Theme interface for button spinner element */
export interface ButtonSpinnerTheme extends BaseComponentTheme {
  appearance: {
    text: SimpleConsumerClassMapper;
  };
}
