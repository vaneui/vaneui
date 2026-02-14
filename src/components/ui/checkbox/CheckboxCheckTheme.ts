import type { ReactElement } from "react";
import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { FocusVisibleClassMapper } from "../theme/layout";

/** Theme interface for checkbox check mark element */
export interface CheckboxCheckTheme extends BaseComponentTheme {
  checkElement: () => ReactElement;
  appearance: {
    color: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    focusVisible: FocusVisibleClassMapper;
  };
}
