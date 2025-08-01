import { DirectionTheme } from "./layout/directionTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { StackProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { BgAppearanceTheme } from "./appearance/bgAppearanceTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import { STACK_CATEGORIES } from "../props";

export interface StackTheme extends BaseComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    direction: DirectionTheme;
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
  appearance: {
    background: BgAppearanceTheme;
    border: GenericVariantTheme<TextAppearanceTheme>;
    ring: GenericVariantTheme<TextAppearanceTheme>;
  }
}

export const defaultStackTheme = new ComponentTheme<StackProps, StackTheme>(
  "div",
  "",
  {
    size: {
      px: new PxTheme({
        padding: {
          xs: 'px-2',
          sm: 'px-3',
          md: 'px-4',
          lg: 'px-5',
          xl: 'px-6',
        }
      }),
      py: new PyTheme({
        padding: {
          xs: 'py-2',
          sm: 'py-3',
          md: 'py-4',
          lg: 'py-5',
          xl: 'py-6',
        }
      }),
      gap: new GapTheme(),
    },
    layout: {
      ...defaultLayoutTheme,
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: new RadiusTheme(),
    },
    appearance: {
      background: new BgAppearanceTheme(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
    }
  },
  {
    md: true,
    flex: true,
    column: true,
    flexWrap: true,
    gap: true,
    padding: true,
    noBorder: true,
    noRing: true,
    sharp: true,
  },
  STACK_CATEGORIES
);
