import { ComponentTheme, defaultLayoutClassMappers } from "../../theme/common/ComponentTheme";
import type { TypographyProps } from "../common";
import type { LinkIconTheme } from "./LinkIconTheme";
import { SizeClassMapper } from "../../theme/size/sizeClassMapper";
import { ICON_CATEGORIES } from "../../props/categoryBuilders";
import { linkIconDefaults } from "./linkIconDefaults";

const lineHeightClass = 'h-[calc(var(--lh)*var(--fs))]';

export const defaultLinkIconTheme = new ComponentTheme<TypographyProps, LinkIconTheme>(
  "span",
  "align-top",
  {
    size: {
      height: new SizeClassMapper({
        xs: lineHeightClass,
        sm: lineHeightClass,
        md: lineHeightClass,
        lg: lineHeightClass,
        xl: lineHeightClass,
      }),
    },
    layout: defaultLayoutClassMappers,
  },
  linkIconDefaults,
  ICON_CATEGORIES,
  undefined,
  'ui'
);
