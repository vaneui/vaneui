import { twMerge } from "tailwind-merge";
import { BaseComponentProps, BreakpointProps, ItemsProps, CommonAppearanceProps, FontFamilyProps, FontStyleProps, FontWeightProps, GapProps, HideProps, PositionProps, ReverseProps, ColProps, RowProps, TextAppearanceProps, TextDecorationProps, TextTransformProps, SizeProps } from "../ui/props/props";
import { fontFamilyClasses, fontStyleClasses, fontWeightClasses, textAppearanceClasses, textDecorationClasses, textTransformClasses } from "../ui/props/commonValues";
import { CommonAppearanceSettings, FontFamilySettings, FontStyleSettings, FontWeightSettings, TextAppearanceSettings, TextDecorationSettings, TextTransformSettings, TypographySettings } from "../ui/settings";

function getBooleanClass<T extends Record<string, boolean | undefined>>(
  props: T,
  classes?: Record<keyof T, string>,
  fallbackKey?: keyof T
): string {
  if (!classes) return "";
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key) && props[key]) {
      return classes[key] ?? "";
    }
  }
  return fallbackKey ? classes[fallbackKey] ?? "" : "";
}

export function componentBuilder(
  baseProps: BaseComponentProps,
  defaultTag: string,
  baseClasses?: string
) {
  const extraClasses: string[] = [];
  const { className, children, tag, ...other } = baseProps;
  const otherProps: (typeof other) & Partial<ReverseProps & ItemsProps & GapProps & RowProps & ColProps> = { ...other };
  const propsToRemove: string[] = []

  const registerKeys = (keys: string[]) => {
    keys.forEach((key) => propsToRemove.push(key));
  };

  const withBooleanProps = <T extends Record<string, string>>(
    propMap: Record<keyof T, string>,
    fallbackKey?: keyof T,
    settings?: { [key: string]: boolean }
  ) => {
    // Build a subset of props from otherProps for the keys in the map.
    const propsSubset: Partial<Record<keyof T, boolean>> = {} as Partial<Record<keyof T, boolean>>;
    const keys = Object.keys(propMap) as (keyof T)[];
    keys.forEach((key) => {
      if (key in otherProps) {
        propsSubset[key] = otherProps[key as keyof typeof otherProps];
      }
    });

    if (settings) {
      const settingsClass = getBooleanClass(settings || {}, propMap);
      extraClasses.push(settingsClass);
    }

    // Compute the class.
    const newClass = getBooleanClass(propsSubset, propMap, fallbackKey);
    extraClasses.push(newClass);

    // Register all keys found in the map.
    registerKeys(keys as string[]);
    return builder;
  };

  function finalize(): React.ReactElement {
    const Tag = tag || defaultTag;
    const merged = twMerge(baseClasses, ...extraClasses, className);

    propsToRemove.forEach(key => delete otherProps[key as keyof typeof otherProps])

    return (
      <Tag className={merged} {...otherProps}>
        {children}
      </Tag>
    );
  }

  const builder = {
    withBooleanProps,

    withSizes: (sizeMap: Record<keyof SizeProps, string>) => withBooleanProps(sizeMap, "md"),
    withBreakpoints: (breakpointMap: Record<keyof BreakpointProps, string>) => withBooleanProps(breakpointMap),
    withReverse: (reverseMap: Record<keyof ReverseProps, string>) => withBooleanProps(reverseMap),
    withItems: (itemsMap: Record<keyof ItemsProps, string>) => withBooleanProps(itemsMap),
    withHide: (hideMap: Record<keyof HideProps, string>) => withBooleanProps(hideMap),
    withPosition: (positionMap: Record<keyof PositionProps, string>) => withBooleanProps(positionMap),
    withFontWeight: (fontWeight: Record<keyof FontWeightProps, string>, settings: FontWeightSettings) => withBooleanProps(fontWeight, undefined, settings),
    withFontStyle: (fontStyle: Record<keyof FontStyleProps, string>, settings: FontStyleSettings) => withBooleanProps(fontStyle, undefined, settings),
    withFontFamily: (fontFamily: Record<keyof FontFamilyProps, string>, settings: FontFamilySettings) => withBooleanProps(fontFamily, undefined, settings),
    withTextDecoration: (textDecoration: Record<keyof TextDecorationProps, string>, settings: TextDecorationSettings) => withBooleanProps(textDecoration, undefined, settings),
    withTextTransform: (textTransform: Record<keyof TextTransformProps, string>, settings: TextTransformSettings) => withBooleanProps(textTransform, undefined, settings),
    withTextAppearance: (appearance: Record<keyof TextAppearanceProps & CommonAppearanceProps, string>, settings: TextAppearanceSettings) => withBooleanProps(appearance, "default", settings),

    withGaps: (gapMap: Record<keyof GapProps, string>, sizeMap: Record<keyof SizeProps, string>) =>
      otherProps.noGap !== undefined && otherProps.noGap ? withBooleanProps(gapMap) : builder.withSizes(sizeMap),

    withTypography: (settings: TypographySettings) => builder
      .withFontFamily(fontFamilyClasses, settings?.fontFamily ?? {})
      .withFontStyle(fontStyleClasses, settings?.fontStyle ?? {})
      .withFontWeight(fontWeightClasses, settings?.fontWeight ?? {})
      .withTextDecoration(textDecorationClasses, settings?.textDecoration ?? {})
      .withTextTransform(textTransformClasses, settings?.textTransform ?? {})
      .withTextAppearance(textAppearanceClasses, settings?.textAppearance ?? {}),

    withAppearance: (appearance: Record<keyof CommonAppearanceProps, string>, settings: CommonAppearanceSettings) => withBooleanProps(appearance, "default", settings),

    build() {
      builder.withHide({
        xsHide: "max-xs:hidden",
        smHide: "max-sm:hidden",
        mdHide: "max-md:hidden",
        lgHide: "max-lg:hidden",
        xlHide: "max-xl:hidden"
      })
      builder.withPosition({
        relative: "relative",
        absolute: "absolute",
        fixed: "fixed",
        sticky: "sticky",
        static: "static"
      })
      return finalize();
    },
  };

  return builder;
}
