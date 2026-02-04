import type {
  BaseComponentTheme,
  DefaultLayoutThemes
} from "../theme/common/ComponentTheme";
import type { RadiusTheme } from "../theme/layout/radiusTheme";
import type { BorderTheme } from "../theme/layout/borderTheme";
import type { RingTheme } from "../theme/layout/ringTheme";
import type { FocusVisibleTheme } from "../theme/layout/focusVisibleTheme";
import type { CursorTheme } from "../theme/layout/cursorTheme";
import type { TransitionTheme } from "../theme/layout/transitionTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import type { SizeTheme } from "../theme/size/sizeTheme";
import type { FontSizeTheme } from "../theme/size/fontSizeTheme";
import type { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import type { StatusTheme } from "../theme/appearance/statusTheme";

/** Theme interface for checkbox input element */
export interface CheckboxTheme extends BaseComponentTheme {
  size: {
    size: SizeTheme;
    text: FontSizeTheme;
  };
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    focusVisible: FocusVisibleTheme;
    cursor: CursorTheme;
    transition: TransitionTheme;
    radius: RadiusTheme;
  };
  appearance: {
    accent: SimpleConsumerTheme;
    background: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
    focusVisible: SimpleConsumerTheme;
    check: SimpleConsumerTheme;
    shadow: ShadowAppearanceTheme;
    status: StatusTheme;
  };
}
