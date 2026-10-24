import type { InteractiveComponentTheme, InteractiveLayoutClassMappers } from "../theme/common";
import type { IndicatorClassMapper } from "../theme/layout";

export type NavLinkTheme = InteractiveComponentTheme & {
  layout: InteractiveLayoutClassMappers & { indicator: IndicatorClassMapper };
};
