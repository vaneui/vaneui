import type { ReactElement } from "react";
import type {
  BaseComponentTheme,
  DefaultLayoutThemes
} from "../theme/common/ComponentTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";

/** Theme interface for checkbox indeterminate mark element */
export interface CheckboxIndeterminateTheme extends BaseComponentTheme {
  indeterminateElement: () => ReactElement;
  appearance: {
    color: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes;
}
