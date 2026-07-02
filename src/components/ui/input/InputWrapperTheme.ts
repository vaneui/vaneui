import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { WidthClassMapper } from "../theme/layout";

/** Theme interface for the input wrapper element */
export interface InputWrapperTheme extends BaseComponentTheme {
  layout: DefaultLayoutClassMappers & {
    width: WidthClassMapper;
  };
}
