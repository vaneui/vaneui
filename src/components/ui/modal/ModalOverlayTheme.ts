import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { BlurClassMapper, OverlayBackgroundClassMapper, PointerEventsClassMapper } from "../theme/layout";

export interface ModalOverlayTheme extends BaseComponentTheme {
  layout: DefaultSizedLayoutClassMappers & {
    blur: BlurClassMapper;
    overlayBackground: OverlayBackgroundClassMapper;
    pointerEvents: PointerEventsClassMapper;
  };
}
