import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { WidthClassMapper } from "../theme/layout";

/** Theme interface for the select wrapper element */
export interface SelectWrapperTheme extends BaseComponentTheme {
  layout: DefaultLayoutClassMappers & {
    width: WidthClassMapper;
  };
}
