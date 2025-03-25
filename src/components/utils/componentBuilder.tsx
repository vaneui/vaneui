import {twMerge} from "tailwind-merge";
import {
  BaseComponentProps,
  BreakpointProps,
  ItemsProps,
  CommonAppearanceProps,
  FontFamilyProps,
  FontStyleProps,
  FontWeightProps,
  GapProps,
  HideProps,
  PositionProps,
  ReverseProps,
  ColProps,
  RowProps,
  TextAppearanceProps,
  TextDecorationProps,
  TextTransformProps,
  SizeProps,
  TextAlignProps,
  JustifyProps,
  StackDirectionProps,
  BorderAppearanceProps,
  NoBorderProps,
  NoGapProps,
  RoundedProps,
  PillProps,
  SharpProps,
  WrapProps
} from "../ui/props/props";
import {
  fontFamilyClasses,
  fontStyleClasses,
  fontWeightClasses,
  textAlignClasses,
  textAppearanceClasses,
  textDecorationClasses,
  textTransformClasses
} from "../ui/props/typographyValues";
import {
  CommonAppearanceSettings,
  FontFamilySettings,
  FontStyleSettings,
  FontWeightSettings,
  TextAlignSettings,
  TextAppearanceSettings,
  TextDecorationSettings,
  TextTransformSettings,
  TypographySettings,
  ItemsSettings,
  JustifySettings,
  StackDirectionSettings,
  BorderSettings,
  GapSettings,
  RoundedSettings,
  WrapSettings
} from "../ui/settings";
import {noBorderClasses} from "../ui/props/appearanceValues";
import {noGapClasses, pillClasses, roundedClasses, sharpClasses, wrapClasses} from "../ui/props/layoutValues";
import React from "react";

function getBooleanClass<T extends Record<string, boolean | undefined>>(
  props: T,
  classes?: Record<keyof T, string>
): string {
  if (!classes) return "";
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key) && props[key]) {
      return classes[key] ?? "";
    }
  }
  return "";
}

export function componentBuilder(
  baseProps: BaseComponentProps,
  defaultTag: string,
  baseClasses?: string
) {
  const extraClasses: string[] = [];
  const {className, children, tag, ...other} = baseProps;
  const otherProps = {...other} as any as (typeof other) & Partial<ReverseProps & ItemsProps & GapProps & RowProps & ColProps & WrapProps>;
  const propsToRemove: string[] = []

  const registerKeys = (keys: string[]) => {
    keys.forEach((key) => propsToRemove.push(key));
  };

  const withBooleanProps = <T extends Record<string, string>>(
    propMap: Record<keyof T, string>,
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
    const newClass = getBooleanClass(propsSubset, propMap);
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

    withSizes: (sizeMap: Record<keyof SizeProps, string>) => withBooleanProps(sizeMap, {md: true}),
    withBreakpoints: (breakpointMap: Record<keyof BreakpointProps, string>) => withBooleanProps(breakpointMap),
    withReverse: (reverseMap: Record<keyof ReverseProps, string>) => withBooleanProps(reverseMap),
    withItems: (itemsMap: Record<keyof ItemsProps, string>, settings?: ItemsSettings) => withBooleanProps(itemsMap, settings),
    withHide: (hideMap: Record<keyof HideProps, string>) => withBooleanProps(hideMap),
    withPosition: (positionMap: Record<keyof PositionProps, string>) => withBooleanProps(positionMap),
    withFontWeight: (fontWeight: Record<keyof FontWeightProps, string>, settings: FontWeightSettings) => withBooleanProps(fontWeight, settings),
    withFontStyle: (fontStyle: Record<keyof FontStyleProps, string>, settings: FontStyleSettings) => withBooleanProps(fontStyle, settings),
    withFontFamily: (fontFamily: Record<keyof FontFamilyProps, string>, settings: FontFamilySettings) => withBooleanProps(fontFamily, settings),
    withTextDecoration: (textDecoration: Record<keyof TextDecorationProps, string>, settings: TextDecorationSettings) => withBooleanProps(textDecoration, settings),
    withTextTransform: (textTransform: Record<keyof TextTransformProps, string>, settings: TextTransformSettings) => withBooleanProps(textTransform, settings),
    withTextAlign: (textAlign: Record<keyof TextAlignProps, string>, settings: TextAlignSettings) => withBooleanProps(textAlign, settings),
    withTextAppearance: (appearance: Record<keyof TextAppearanceProps & CommonAppearanceProps, string>, settings: TextAppearanceSettings) => withBooleanProps(appearance, settings),
    withGaps: (gapMap: Record<keyof GapProps, string>, settings: GapSettings) => withBooleanProps(gapMap, settings),
    withNoGap: (noGapMap: Record<keyof NoGapProps, string> = noGapClasses) => withBooleanProps(noGapMap),
    withJustifyContent: (justifyContent: Record<keyof JustifyProps, string>, settings: JustifySettings) => withBooleanProps(justifyContent, settings),
    withAppearance: (appearance: Record<keyof CommonAppearanceProps, string>, settings: CommonAppearanceSettings) => withBooleanProps(appearance, settings),
    withStackDirection: (directionMap: Record<keyof StackDirectionProps, string>, settings: StackDirectionSettings) => withBooleanProps(directionMap, settings),
    withWrap: (wrapMap: Record<keyof WrapProps, string> = wrapClasses, settings?: WrapSettings) => withBooleanProps(wrapMap, settings),
    // Border
    withBorderColor: (borderMap: Record<keyof BorderAppearanceProps, string>, settings: BorderSettings) => withBooleanProps(borderMap, settings),
    withNoBorder: (noBorderMap: Record<keyof NoBorderProps, string> = noBorderClasses) => withBooleanProps(noBorderMap),
    // Border Radius
    withRounded: (roundedMap: Record<keyof RoundedProps, string> = roundedClasses, settings?: RoundedSettings) => withBooleanProps(roundedMap, settings),
    withPill: (pillMap: Record<keyof PillProps, string> = pillClasses) => withBooleanProps(pillMap),
    withSharp: (sharpMap: Record<keyof SharpProps, string> = sharpClasses) => withBooleanProps(sharpMap),

    withTypography: (settings: TypographySettings) => builder
      .withFontFamily(fontFamilyClasses, settings?.fontFamily ?? {})
      .withFontStyle(fontStyleClasses, settings?.fontStyle ?? {})
      .withFontWeight(fontWeightClasses, settings?.fontWeight ?? {})
      .withTextDecoration(textDecorationClasses, settings?.textDecoration ?? {})
      .withTextTransform(textTransformClasses, settings?.textTransform ?? {})
      .withTextAlign(textAlignClasses, settings?.textAlign ?? {})
      .withTextAppearance(textAppearanceClasses, settings?.textAppearance ?? {}),

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
