import type { ReactElement } from "react";
import type { BaseComponentTheme } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";

/** Theme interface for button spinner element */
export interface ButtonSpinnerTheme extends BaseComponentTheme {
  spinnerElement: () => ReactElement;
  appearance: {
    text: SimpleConsumerClassMapper;
  };
}
