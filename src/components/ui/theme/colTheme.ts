import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { ColProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BgAppearanceTheme } from "./appearance/bgAppearanceTheme";
import { extractKeysFromCategories } from "../../utils/componentUtils";
import { COL_CATEGORIES } from "../props";

export interface ColTheme extends BaseComponentTheme {
  size: {
    gap: GapTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    direction: DirectionTheme;
  };
  appearance: {
    background: BgAppearanceTheme;
  }
}

export const defaultColTheme = new ComponentTheme<ColProps, ColTheme>(
  "div",
  "",
  {
    size: {
      gap: new GapTheme(),
    },
    layout: {
      ...defaultLayoutTheme,
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
    },
    appearance: {
      background: new BgAppearanceTheme(),
    }
  },
  {
    column: true,
    md: true,
    flex: true,
    transparent: true,
    gap: true,
  },
  (props, defaults) => extractKeysFromCategories(props, defaults, COL_CATEGORIES)
);
