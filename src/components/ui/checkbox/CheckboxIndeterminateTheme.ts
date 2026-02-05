import type { ReactElement } from "react";
import type {
  BaseComponentTheme,
  DefaultLayoutClassMappers
} from "../theme/common/ComponentTheme";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";

/** Theme interface for checkbox indeterminate mark element */
export interface CheckboxIndeterminateTheme extends BaseComponentTheme {
  indeterminateElement: () => ReactElement;
  appearance: {
    color: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers;
}
