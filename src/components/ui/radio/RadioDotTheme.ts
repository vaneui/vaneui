import type { ReactElement } from "react";
import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { FocusVisibleClassMapper } from "../theme/layout";

/** Theme interface for radio dot element */
export interface RadioDotTheme extends BaseComponentTheme {
  dotElement: () => ReactElement;
  appearance: {
    color: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    focusVisible: FocusVisibleClassMapper;
  };
}
