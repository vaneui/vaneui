import {
  BaseTypographyComponentTheme,
  ComponentTheme,
  defaultLayoutTheme,
  DefaultLayoutThemes,
  defaultTypographyTheme
} from "./common/ComponentTheme";
import { CodeProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { CODE_CATEGORIES } from "../props";

export interface CodeTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    text: SizeTheme;
    gap: GapTheme;
  };
  appearance: {
    background: GenericVariantTheme<TextAppearanceTheme>;
    text: GenericVariantTheme<TextAppearanceTheme>;
    border: GenericVariantTheme<TextAppearanceTheme>;
    ring: GenericVariantTheme<TextAppearanceTheme>;
    shadow: GenericVariantTheme<ShadowAppearanceTheme>;
  };
  layout: DefaultLayoutThemes & {
    radius: RadiusTheme;
    border: BorderTheme;
    ring: RingTheme;
  };
}

export const defaultCodeTheme = new ComponentTheme<CodeProps, CodeTheme>(
  "code",
  "w-fit h-fit transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme({
        padding: {
          xs: 'px-1',
          sm: 'px-1.5',
          md: 'px-2',
          lg: 'px-2.5',
          xl: 'px-3',
        }
      }),
      py: new PyTheme({
        padding: {
          xs: 'py-0.5',
          sm: 'py-0.5',
          md: 'py-1',
          lg: 'py-1.5',
          xl: 'py-2',
        }
      }),
      text: new SizeTheme({
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      }),
      gap: new GapTheme({
        gap: {
          xs: 'gap-0.5',
          sm: 'gap-1',
          md: 'gap-1.5',
          lg: 'gap-2',
          xl: 'gap-2.5',
        }
      })
    },
    appearance: {
      background: GenericVariantTheme.createSimpleUIElementBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextTheme(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      shadow: GenericVariantTheme.createUIElementShadowTheme()
    },
    layout: {
      ...defaultLayoutTheme,
      radius: new RadiusTheme({
        rounded: {
          xs: 'rounded',
          sm: 'rounded-sm',
          md: 'rounded-md',
          lg: 'rounded-lg',
          xl: 'rounded-xl',
        }
      }),
      border: new BorderTheme(),
      ring: new RingTheme(),
    },
    typography: defaultTypographyTheme,
  },
  {
    outline: true,
    default: true,
    rounded: true,
    mono: true,
    padding: true,
    gap: true,
    ring: true,
  },
  CODE_CATEGORIES
);