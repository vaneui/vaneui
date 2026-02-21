import { ComponentTheme, textAppearance } from "../theme/common";
import { FontSizeClassMapper } from "../theme/size/fontSizeClassMapper";
import { DisplayClassMapper } from "../theme/layout/displayClassMapper";
import { HideClassMapper } from "../theme/layout/hideClassMapper";
import { ItemsClassMapper } from "../theme/layout/itemsClassMapper";
import { JustifyClassMapper } from "../theme/layout/justifyClassMapper";
import type { IconProps } from "./IconProps";
import type { IconTheme } from "./IconTheme";
import { ICON_CATEGORIES } from "../props/categoryBuilders";
import { iconDefaults } from "./iconDefaults";

export const defaultIconTheme = new ComponentTheme<IconProps, IconTheme>(
  "span",
  "vane-icon align-middle [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    size: {
      text: new FontSizeClassMapper(),
    },
    appearance: {
      text: textAppearance,
    },
    layout: {
      hide: new HideClassMapper(),
      display: new DisplayClassMapper(),
      items: new ItemsClassMapper(),
      justify: new JustifyClassMapper(),
    },
  },
  iconDefaults,
  ICON_CATEGORIES,
  undefined,
  'ui'
);
