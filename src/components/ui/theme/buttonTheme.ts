import { gapMap, pxMap, pyMap, textSizeMap } from "../classes/buttonClasses";
import { TypographyTheme } from "./typography/typographyTheme";
import { roundedMap } from "../classes/buttonClasses";
import { VariantAppearanceTheme } from "./appearance/variantAppearanceTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { ButtonProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";

export const defaultButtonTheme = new ComponentTheme<ButtonProps>(
  "button",
  "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new SizeTheme(pxMap),
      py: new SizeTheme(pyMap),
      text: new SizeTheme(textSizeMap),
      gap: new GapTheme(gapMap),
    },
    appearance: VariantAppearanceTheme.createDefault(),
    typography: TypographyTheme.createDefaultTypographyTheme(),
    layout: {
      radius: new RadiusTheme(roundedMap)
    },
  },
  {
    md: true,
    outline: true,
    default: true,
    rounded: true,
    sans: true,
    semibold: true,
    textCenter: true,
    noBorder: true,
  }
);
