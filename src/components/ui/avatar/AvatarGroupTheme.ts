import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { DirectionClassMapper } from "../theme/layout";
import type { MarginClassMapper } from "../theme/size";

/** Theme interface for the AvatarGroup */
export interface AvatarGroupTheme extends BaseComponentTheme {
  size: {
    margin: MarginClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    flexDirection: DirectionClassMapper;
  };
}
