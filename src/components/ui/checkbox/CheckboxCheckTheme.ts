import type { ReactElement } from "react";
import type {
  BaseComponentTheme,
  DefaultLayoutThemes
} from "../theme/common/ComponentTheme";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";

/** Theme interface for checkbox check mark element */
export interface CheckboxCheckTheme extends BaseComponentTheme {
  checkElement: () => ReactElement;
  appearance: {
    color: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutThemes & {
    focusVisible: FocusVisibleClassMapper;
  };
}
