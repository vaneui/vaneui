import type { InteractiveComponentTheme, InteractiveLayoutClassMappers } from "../theme/common";
import type { DotClassMapper } from "../theme/layout";

/** Badge theme: the interactive mappers plus the status dot */
export interface BadgeTheme extends InteractiveComponentTheme {
  layout: InteractiveLayoutClassMappers & {
    dot: DotClassMapper;
  };
}
