import type { ReactElement } from "react";
import type {
  BaseComponentTheme,
  DefaultLayoutThemes
} from "../theme/common/ComponentTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import type { FocusVisibleTheme } from "../theme/layout/focusVisibleTheme";

/** Theme interface for checkbox check mark element */
export interface CheckboxCheckTheme extends BaseComponentTheme {
  checkElement: () => ReactElement;
  appearance: {
    color: SimpleConsumerTheme;
    focusVisible: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes & {
    focusVisible: FocusVisibleTheme;
  };
}
