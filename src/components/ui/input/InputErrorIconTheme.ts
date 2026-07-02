import type { ReactElement } from "react";
import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { FontSizeClassMapper } from "../theme/size";
import type { PointerEventsClassMapper } from "../theme/layout";

/** Theme interface for the input error-icon element */
export interface InputErrorIconTheme extends BaseComponentTheme {
  /** The decorative alert SVG — replace via `themeOverride` to use a custom icon. */
  errorIconElement: () => ReactElement;
  size: {
    text: FontSizeClassMapper;
  };
  appearance: {
    color: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    pointerEvents: PointerEventsClassMapper;
  };
}
