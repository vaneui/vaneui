import { gapMap, pxMap, pyMap, textSizeMap } from "../classes/buttonClasses";
import { TypographyTheme } from "./typography/typographyTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { TextTheme } from "./size/textTheme";
import { GapSizeTheme } from "./size/gapSizeTheme";
import { roundedMap } from "../classes/buttonClasses";
import { VariantAppearanceTheme } from "./appearance/variantAppearanceTheme";
import { RadiusLayoutTheme } from "./layout/radiusLayoutTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { ButtonProps } from "../props/props";

export const defaultButtonTheme = new ComponentTheme<ButtonProps>(
  "button",
  "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme(pxMap),
      py: new PyTheme(pyMap),
      text: new TextTheme(textSizeMap),
      gap: new GapSizeTheme(gapMap),
    },
    appearance: VariantAppearanceTheme.createDefault(),
    typography: TypographyTheme.createDefaultTypographyTheme(),
    radius: RadiusLayoutTheme.createBaseLayoutTheme(roundedMap),
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
