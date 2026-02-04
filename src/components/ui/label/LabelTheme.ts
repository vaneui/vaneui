import type {
  BaseTypographyComponentTheme,
  DefaultLayoutThemes,
} from "../theme/common/ComponentTheme";
import type { GapTheme } from "../theme/size/gapTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import type { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import type { FontSizeTheme } from "../theme/size/fontSizeTheme";
import type { LineHeightTheme } from "../theme/size/lineHeightTheme";
import type { BorderTheme } from "../theme/layout/borderTheme";
import type { RingTheme } from "../theme/layout/ringTheme";
import type { WrapTheme } from "../theme/layout/wrapTheme";
import type { DirectionTheme } from "../theme/layout/directionTheme";
import type { CursorTheme } from "../theme/layout/cursorTheme";

export interface LabelTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
    gap: GapTheme;
  };
  appearance: {
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
    shadow: ShadowAppearanceTheme;
  };
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    wrap: WrapTheme;
    flexDirection: DirectionTheme;
    cursor: CursorTheme;
  };
}
