import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { BlurClassMapper, OverlayBackgroundClassMapper, PointerEventsClassMapper } from "../theme/layout";

export interface OverlayTheme extends BaseComponentTheme {
  layout: DefaultSizedLayoutClassMappers & {
    blur: BlurClassMapper;
    overlayBackground: OverlayBackgroundClassMapper;
    pointerEvents: PointerEventsClassMapper;
  };
}
