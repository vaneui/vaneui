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
  NoPaddingProps,
  RoundedProps,
  PillProps,
  SharpProps,
  WrapProps, ButtonStyleProps
} from "../ui/props/props";
import {
  fontFamilyClasses,
  fontStyleClasses,
  fontWeightClasses,
  textAlignClasses,
  textAppearanceClasses,
  textDecorationClasses,
  textTransformClasses,
  textSizeClasses
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
import {noBorderClasses, noShadowClasses} from "../ui/props/appearanceValues";
import {
  hideClasses,
  itemsClasses, justifyClasses,
  noGapClasses,
  noPaddingClasses,
  pillClasses, positionClasses,
  roundedClasses,
  sharpClasses,
  wrapClasses,
  shadowClasses,
  hoverShadowClasses,
  pxClasses,
  pyClasses,
  paddingClasses,
  commonGaps
} from "../ui/props/layoutValues";
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

/**
 * ComponentBuilder class for building React components with chainable methods
 */
class ComponentBuilder {
  private readonly otherProps: any;
  private readonly baseProps: BaseComponentProps;
  private readonly defaultTag: string;
  private readonly baseClasses?: string;

  private propsToRemove: string[] = [];
  private extraClasses: string[] = [];

  constructor(baseProps: BaseComponentProps, defaultTag: string, baseClasses?: string) {
    this.baseProps = baseProps;
    this.defaultTag = defaultTag;
    this.baseClasses = baseClasses;

    const {className, children, tag, ...other} = baseProps;
    this.otherProps = {...other} as any as (typeof other) & Partial<ReverseProps & ButtonStyleProps & ItemsProps & GapProps & RowProps & ColProps & WrapProps>;
  }

  registerKeys(keys: string[]): this {
    keys.forEach((key) => {
      if (this.propsToRemove.indexOf(key) === -1) this.propsToRemove.push(key);
    });
    return this;
  }

  private withBooleanProps<T extends Record<string, string>>(
    propMap: Record<keyof T, string>,
    settings?: { [key: string]: boolean }
  ): this {
    // Build a subset of props from otherProps for the keys in the map.
    const propsSubset: Partial<Record<keyof T, boolean>> = {} as Partial<Record<keyof T, boolean>>;
    const keys = Object.keys(propMap) as (keyof T)[];
    keys.forEach((key) => {
      if (key in this.otherProps) {
        propsSubset[key] = this.otherProps[key as keyof typeof this.otherProps];
      }
    });

    if (settings) {
      const settingsClass = getBooleanClass(settings || {}, propMap);
      this.extraClasses.push(settingsClass);
    }

    // Compute the class.
    const newClass = getBooleanClass(propsSubset, propMap);
    this.extraClasses.push(newClass);

    // Register all keys found in the map.
    this.registerKeys(keys as string[]);
    return this;
  }

  private finalize(): React.ReactElement {
    const {className, children, tag} = this.baseProps;
    const Tag = tag || this.defaultTag;
    const merged = twMerge(this.baseClasses, ...this.extraClasses, className);

    this.propsToRemove.forEach(key => delete this.otherProps[key as keyof typeof this.otherProps]);

    return (
      <Tag className={merged} {...this.otherProps}>
        {children}
      </Tag>
    );
  }

  withSizes(sizeMap: Record<keyof SizeProps, string>): this {
    return this.withBooleanProps(sizeMap, {md: true});
  }

  withGap(settings?: GapSettings): this {
    return this.withBooleanProps(commonGaps, settings || {md: true});
  }

  withShadow(settings?: { [key in keyof SizeProps]?: boolean }): this {
    return this.withBooleanProps(shadowClasses, settings || {md: true});
  }

  withHoverShadow(settings?: { [key in keyof SizeProps]?: boolean }): this {
    return this.withBooleanProps(hoverShadowClasses, settings || {md: true});
  }

  withPx(settings?: { [key in keyof SizeProps]?: boolean }): this {
    return this.withBooleanProps(pxClasses, settings || {md: true});
  }

  withPy(settings?: { [key in keyof SizeProps]?: boolean }): this {
    return this.withBooleanProps(pyClasses, settings || {md: true});
  }

  withPadding(settings?: { [key in keyof SizeProps]?: boolean }): this {
    return this.withBooleanProps(paddingClasses, settings || {md: true});
  }

  withBreakpoints(breakpointMap: Record<keyof BreakpointProps, string>): this {
    return this.withBooleanProps(breakpointMap);
  }

  withReverse(reverseMap: Record<keyof ReverseProps, string>): this {
    return this.withBooleanProps(reverseMap);
  }

  withItems(settings?: ItemsSettings): this {
    return this.withBooleanProps(itemsClasses, settings);
  }

  withHide(): this {
    return this.withBooleanProps(hideClasses);
  }

  withPosition(): this {
    return this.withBooleanProps(positionClasses);
  }

  withFontWeight(fontWeight: Record<keyof FontWeightProps, string>, settings: FontWeightSettings): this {
    return this.withBooleanProps(fontWeight, settings);
  }

  withFontStyle(fontStyle: Record<keyof FontStyleProps, string>, settings: FontStyleSettings): this {
    return this.withBooleanProps(fontStyle, settings);
  }

  withFontFamily(fontFamily: Record<keyof FontFamilyProps, string>, settings: FontFamilySettings): this {
    return this.withBooleanProps(fontFamily, settings);
  }

  withTextDecoration(textDecoration: Record<keyof TextDecorationProps, string>, settings: TextDecorationSettings): this {
    return this.withBooleanProps(textDecoration, settings);
  }

  withTextTransform(textTransform: Record<keyof TextTransformProps, string>, settings: TextTransformSettings): this {
    return this.withBooleanProps(textTransform, settings);
  }

  withTextAlign(textAlign: Record<keyof TextAlignProps, string>, settings: TextAlignSettings): this {
    return this.withBooleanProps(textAlign, settings);
  }

  withTextAppearance(appearance: Record<keyof TextAppearanceProps & CommonAppearanceProps, string>, settings: TextAppearanceSettings): this {
    return this.withBooleanProps(appearance, settings);
  }

  withGaps(gapMap: Record<keyof GapProps, string>, settings: GapSettings): this {
    return this.withBooleanProps(gapMap, settings);
  }

  withNoGap(): this {
    return this.withBooleanProps(noGapClasses);
  }

  withJustifyContent(): this {
    return this.withBooleanProps(justifyClasses);
  }

  withAppearance(appearance: Record<keyof CommonAppearanceProps, string>, settings: CommonAppearanceSettings): this {
    return this.withBooleanProps(appearance, settings);
  }

  withStackDirection(directionMap: Record<keyof StackDirectionProps, string>, settings: StackDirectionSettings): this {
    return this.withBooleanProps(directionMap, settings);
  }

  withWrap(settings?: WrapSettings): this {
    return this.withBooleanProps(wrapClasses, settings);
  }

  // Border
  withBorderColor(borderMap: Record<keyof BorderAppearanceProps, string>, settings: BorderSettings): this {
    return this.withBooleanProps(borderMap, settings);
  }

  withNoBorder(): this {
    return this.withBooleanProps(noBorderClasses);
  }

  withNoShadow(): this {
    return this.withBooleanProps(noShadowClasses);
  }

  withNoPadding(): this {
    return this.withBooleanProps(noPaddingClasses);
  }

  // Border Radius
  withRounded(rounded: Record<keyof RoundedProps, string>, settings?: RoundedSettings): this {
    return this.withBooleanProps(rounded, settings);
  }

  withPill(): this {
    return this.withBooleanProps(pillClasses);
  }

  withSharp(): this {
    return this.withBooleanProps(sharpClasses);
  }

  withTextSize(textSizeMap?: Record<keyof SizeProps, string>, settings?: { [key in keyof SizeProps]?: boolean }): this {
    return this.withBooleanProps(textSizeMap || textSizeClasses, settings || {md: true});
  }

  withTypography(settings: TypographySettings): this {
    return this
      .withFontFamily(fontFamilyClasses, settings?.fontFamily ?? {})
      .withFontStyle(fontStyleClasses, settings?.fontStyle ?? {})
      .withFontWeight(fontWeightClasses, settings?.fontWeight ?? {})
      .withTextDecoration(textDecorationClasses, settings?.textDecoration ?? {})
      .withTextTransform(textTransformClasses, settings?.textTransform ?? {})
      .withTextAlign(textAlignClasses, settings?.textAlign ?? {})
      .withTextAppearance(textAppearanceClasses, settings?.textAppearance ?? {});
  }

  build(): React.ReactElement {
    this.withHide();
    this.withPosition();
    return this.finalize();
  }
}

/**
 * Factory function that creates and returns a ComponentBuilder instance
 * This maintains backward compatibility with the existing code
 */
export function componentBuilder(
  baseProps: BaseComponentProps,
  defaultTag: string,
  baseClasses?: string
): ComponentBuilder {
  return new ComponentBuilder(baseProps, defaultTag, baseClasses);
}
