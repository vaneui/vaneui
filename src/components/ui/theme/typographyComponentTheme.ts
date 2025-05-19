import { SizeTheme } from "./size/sizeTheme";
import { SizeKey } from "../props/propKeys";
import { textSizeClasses } from "../classes/typographyClasses";
import { TypographyComponentProps } from "../props/props";
import { SimpleComponentTheme } from "./common/simpleComponentTheme";

const typographyThemeDefaults: Partial<Record<keyof TypographyComponentProps, boolean>> = {
  md: true,
  default: true,
  sans: true,
  normal: true,
};

export const createTypographyComponentTheme = (
  base: string = "text-balance",
  textSizeMap: Record<SizeKey, string> = textSizeClasses,
  defaults: Partial<Record<keyof TypographyComponentProps, boolean>> = typographyThemeDefaults,
): SimpleComponentTheme<TypographyComponentProps> => {
  return SimpleComponentTheme.createSimpleComponentTheme<TypographyComponentProps>(
    base,
    new SizeTheme(
      undefined, // px
      undefined, // py
      textSizeMap, // text
      undefined  // gap
    ),
    defaults);
};

// Page title specific theme
export const pageTitleTheme: SimpleComponentTheme<TypographyComponentProps> = createTypographyComponentTheme(
  "text-balance tracking-tighter",
  {
    xs: "text-3xl max-lg:text-2xl max-md:text-xl",
    sm: "text-4xl max-lg:text-3xl max-md:text-2xl",
    md: "text-5xl max-lg:text-4xl max-md:text-3xl",
    lg: "text-6xl max-lg:text-5xl max-md:text-4xl",
    xl: "text-7xl max-lg:text-6xl max-md:text-5xl",
  },
  {...typographyThemeDefaults, semibold: true}
);

// Section title specific theme
export const sectionTitleTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme(
  "text-balance",
  {
    xs: "text-2xl max-lg:text-xl  max-md:text-lg",
    sm: "text-3xl max-lg:text-2xl max-md:text-xl",
    md: "text-4xl max-lg:text-3xl max-md:text-2xl",
    lg: "text-5xl max-lg:text-4xl max-md:text-3xl",
    xl: "text-6xl max-lg:text-5xl max-md:text-4xl",
  },
  {...typographyThemeDefaults, semibold: true}
);

// Title specific theme
export const titleTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme(
  "text-balance",
  {
    xs: "text-lg",
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  },
  {...typographyThemeDefaults, semibold: true}
);

// Text specific theme
export const textTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme(
  "p-0 m-0",
  textSizeClasses,
  {...typographyThemeDefaults, secondary: true}
);

// Link specific theme
export const linkTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme(
  "hover:underline",
  textSizeClasses,
  {...typographyThemeDefaults, link: true}
);

// List item specific theme
export const listItemTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme();

// List specific theme
export const listTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme("list-disc list-inside");
