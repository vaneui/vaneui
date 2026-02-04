import type {
  BaseComponentTheme,
  DefaultLayoutThemes,
} from "../theme/common/ComponentTheme";
import type { BorderTheme } from "../theme/layout/borderTheme";
import type { RingTheme } from "../theme/layout/ringTheme";
import type { FocusVisibleTheme } from "../theme/layout/focusVisibleTheme";
import type { RadiusTheme } from "../theme/layout/radiusTheme";
import type { ObjectFitTheme } from "../theme/layout/objectFitTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import type { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";

export interface ImgTheme extends BaseComponentTheme {
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    focusVisible: FocusVisibleTheme;
    radius: RadiusTheme;
    objectFit: ObjectFitTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
    focusVisible: SimpleConsumerTheme;
    shadow: ShadowAppearanceTheme;
  };
}
