import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common/ComponentTheme";
import type { FlexClassMapper, RadiusClassMapper, WidthClassMapper } from "../theme/layout";
import type { MarginClassMapper } from "../theme/size";

/** Theme interface for the Progress component */
export interface ProgressTheme extends BaseComponentTheme {
  size: {
    margin: MarginClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    width: WidthClassMapper;
    flex: FlexClassMapper;
    radius: RadiusClassMapper;
  };
}
