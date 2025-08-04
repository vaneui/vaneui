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
  "",
  {
    size: {
      px: new PxTheme({
        xs: 'px-1',
        sm: 'px-1.5',
        md: 'px-1.5',
        lg: 'px-2',
        xl: 'px-2',
      }),
      py: new PyTheme({
        xs: 'py-0',
        sm: 'py-0.5',
        md: 'py-1',
        lg: 'py-1',
        xl: 'py-1',
      }),
      text: new SizeTheme({
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      }),
      gap: new GapTheme({
        xs: 'gap-0.5',
        sm: 'gap-1',
        md: 'gap-1.5',
        lg: 'gap-2',
        xl: 'gap-2.5',
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
        xs: 'rounded',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      }),
      border: new BorderTheme(),
      ring: new RingTheme(),
    },
    typography: defaultTypographyTheme,
  },
  {
    inline: true,
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