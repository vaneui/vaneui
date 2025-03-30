import { twMerge } from "tailwind-merge";
import {
  BaseComponentProps,
  ItemsProps,
  CommonAppearanceProps,
  ReverseProps,
  ColProps,
  RowProps,
  SizeProps,
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
  TypographySettings,
  BorderSettings,
  SizeSettings
} from "../ui/settings/settings";
import { borderAppearanceClasses, noBorderClasses, noShadowClasses } from "../ui/props/appearanceValues";
import {
  hideClasses,
  noGapClasses,
  noPaddingClasses,
  pillClasses, positionClasses,
  roundedClasses,
  sharpClasses,
  shadowClasses,
  hoverShadowClasses,
  pxClasses,
  pyClasses,
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
    this.otherProps = {...other} as any as (typeof other) & Partial<ReverseProps & ButtonStyleProps & ItemsProps & SizeProps & RowProps & ColProps & WrapProps>;
  }

  registerKeys(keys: string[]): this {
    keys.forEach((key) => {
      if (this.propsToRemove.indexOf(key) === -1) this.propsToRemove.push(key);
    });
    return this;
  }

  withClasses<T extends Record<string, string>>(
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

  withShadow(settings?: SizeSettings, noShadow?: boolean): this {
    return this
      .withClasses(shadowClasses, settings || {md: true})
      .withClasses(noShadowClasses, noShadow ? {noShadow} : undefined);
  }

  withHoverShadow(settings?: SizeSettings): this {
    return this.withClasses(hoverShadowClasses, settings || {md: true});
  }

  withPadding(px: Record<keyof SizeProps, string> = pxClasses,
              py: Record<keyof SizeProps, string> = pyClasses,
              settings?: SizeSettings): this {
    return this
      .withClasses(px, settings || {md: true})
      .withClasses(py, settings || {md: true})
      .withClasses(noPaddingClasses);
  }

  withGaps(gapMap?: Record<keyof SizeProps, string>, settings?: SizeSettings): this {
    return this
      .withClasses(gapMap || commonGaps, settings || {md: true})
      .withClasses(noGapClasses);
  }

  withAppearance(appearance: Record<keyof CommonAppearanceProps, string>, settings: CommonAppearanceSettings): this {
    return this.withClasses(appearance, settings);
  }

  withTypography(
    textSizeMap?: Record<keyof SizeProps, string>,
    settings?: Partial<TypographySettings>
  ): this {
    return this
      .withClasses(fontFamilyClasses, settings?.fontFamily ?? {})
      .withClasses(fontStyleClasses, settings?.fontStyle ?? {})
      .withClasses(fontWeightClasses, settings?.fontWeight ?? {})
      .withClasses(textDecorationClasses, settings?.textDecoration ?? {})
      .withClasses(textTransformClasses, settings?.textTransform ?? {})
      .withClasses(textAlignClasses, settings?.textAlign ?? {})
      .withClasses(textAppearanceClasses, settings?.textAppearance ?? {})
      .withClasses(textSizeMap || textSizeClasses, settings?.textSize ?? {md: true});
  }

  withBorder(
    borderColorMap: Record<keyof CommonAppearanceProps, string> = borderAppearanceClasses,
    roundedMap: Record<keyof SizeProps, string> = roundedClasses,
    settings?: BorderSettings,
    noBorder?: boolean
  ): this {
    return !settings ? this : this
      .withClasses(borderColorMap, settings.color)
      .withClasses(roundedMap, settings.radius.rounded)
      .withClasses(pillClasses, settings?.radius?.pill ? {pill: settings.radius.pill} : undefined)
      .withClasses(sharpClasses, settings?.radius?.sharp ? {sharp: settings.radius.sharp} : undefined)
      .withClasses(noBorderClasses, noBorder ? {noBorder} : undefined);
  }

  build(): React.ReactElement {
    return this
      .withClasses(hideClasses)
      .withClasses(positionClasses)
      .finalize();
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
