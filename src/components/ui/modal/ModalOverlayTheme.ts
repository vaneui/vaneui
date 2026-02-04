import type {
  BaseComponentTheme,
  DefaultLayoutThemes,
} from "../theme/common/ComponentTheme";
import type { BlurTheme } from "../theme/layout/blurTheme";
import type { PointerEventsTheme } from "../theme/layout/pointerEventsTheme";
import type { RingTheme } from "../theme/layout/ringTheme";
import type { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";

export interface ModalOverlayTheme extends BaseComponentTheme {
  layout: DefaultLayoutThemes & {
    blur: BlurTheme;
    pointerEvents: PointerEventsTheme;
    ring: RingTheme;
    shadow: ShadowAppearanceTheme;
  };
  appearance: {
    ring: SimpleConsumerTheme;
  };
}
