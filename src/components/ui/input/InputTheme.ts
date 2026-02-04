import type { DirectionTheme } from "../theme/layout/directionTheme";
import type {
  BaseTypographyComponentTheme,
  DefaultLayoutThemes,
} from "../theme/common/ComponentTheme";
import type { FontSizeTheme } from "../theme/size/fontSizeTheme";
import type { LineHeightTheme } from "../theme/size/lineHeightTheme";
import type { GapTheme } from "../theme/size/gapTheme";
import type { BorderTheme } from "../theme/layout/borderTheme";
import type { RadiusTheme } from "../theme/layout/radiusTheme";
import type { RingTheme } from "../theme/layout/ringTheme";
import type { FocusVisibleTheme } from "../theme/layout/focusVisibleTheme";
import type { CursorTheme } from "../theme/layout/cursorTheme";
import type { PxTheme } from "../theme/size/pxTheme";
import type { PyTheme } from "../theme/size/pyTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import type { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import type { WrapTheme } from "../theme/layout/wrapTheme";
import type { TransitionTheme } from "../theme/layout/transitionTheme";
import type { WidthTheme } from "../theme/layout/widthTheme";
import type { StatusTheme } from "../theme/appearance/statusTheme";

export interface InputTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
    focusVisible: SimpleConsumerTheme;
    shadow: ShadowAppearanceTheme;
    status: StatusTheme;
  };
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    focusVisible: FocusVisibleTheme;
    cursor: CursorTheme;
    radius: RadiusTheme;
    wrap: WrapTheme;
    flexDirection: DirectionTheme;
    transition: TransitionTheme;
    width: WidthTheme;
  };
}
