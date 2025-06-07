import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { CardProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { ShadowTheme } from "./layout/shadowTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { roundedMap } from "../classes/badgeClasses";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { commonGaps } from "../classes/spacingClasses";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import {
  borderAppearanceClasses,
  layoutBackgroundAppearanceClasses,
  ringAppearanceClasses
} from "../classes/appearanceClasses";
import { textAppearanceClasses } from "../classes/typographyClasses";
import { LayoutAppearanceTheme } from "./appearance/layoutAppearanceTheme";

export interface CardTheme<P> extends BaseComponentTheme<P> {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
    shadow: ShadowTheme;
  };
  layout: DefaultLayoutThemes<P> & {
    border: BorderTheme;
    radius: RadiusTheme;
    wrap: WrapTheme;
    direction: DirectionTheme;
  };
  appearance: {
    background: LayoutAppearanceTheme;
    text: TextAppearanceTheme;
    border: TextAppearanceTheme;
    ring: TextAppearanceTheme;
  };
}

export const defaultCardTheme = new ComponentTheme<CardProps, CardTheme<CardProps>>(
  "div",
  "flex overflow-hidden",
  {
    size: {
      px: new PxTheme({
        padding: {
          xs: 'px-3',
          sm: 'px-4',
          md: 'px-5',
          lg: 'px-6',
          xl: 'px-8',
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
      gap: new GapTheme({gap: commonGaps}),
      shadow: new ShadowTheme(),
    },
    layout: {
      border: new BorderTheme(),
      radius: new RadiusTheme({rounded: roundedMap}),
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
    },
    appearance: {
      background: LayoutAppearanceTheme.createDefaultStyle({
        base: layoutBackgroundAppearanceClasses,
      }),
      text: TextAppearanceTheme.createDefaultStyle({base: textAppearanceClasses}),
      border: TextAppearanceTheme.createDefaultStyle({base: borderAppearanceClasses}),
      ring: TextAppearanceTheme.createDefaultStyle({base: ringAppearanceClasses}),
    }
  },
  {
    md: true,
    default: true,
    rounded: true,
    normal: true,
    column: true,
    noBorder: true,
  }
);
