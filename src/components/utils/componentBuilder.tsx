import { twMerge } from "tailwind-merge";
import {
  BaseComponentProps,
  ItemsProps,
  CommonAppearanceProps,
  ReverseProps,
  ColProps,
  RowProps,
  SizeProps,
  WrapProps, ButtonStyleProps, TextAppearanceProps
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
  SizeSettings,
  ShadowSettings, GapSettings
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

  withShadow(classes: Record<keyof SizeProps, string> = shadowClasses, settings: ShadowSettings = new ShadowSettings()): this {
    return this
      .withClasses(classes, settings.size)
      .withClasses(noShadowClasses, {noShadow: settings.noShadow});
  }

  withPadding(px: Record<keyof SizeProps, string> = pxClasses,
              py: Record<keyof SizeProps, string> = pyClasses,
              settings?: SizeSettings): this {
    return this
      .withClasses(px, settings || {md: true})
      .withClasses(py, settings || {md: true})
      .withClasses(noPaddingClasses);
  }

  withGaps(gapClasses: Record<keyof SizeProps, string> = commonGaps, settings: GapSettings = new GapSettings()): this {
    return this
      .withClasses(gapClasses, settings.size)
      .withClasses(noGapClasses, {noGap: settings.noGap});
  }

  withAppearance(appearance: Record<keyof CommonAppearanceProps, string>, settings: CommonAppearanceSettings): this {
    return this.withClasses(appearance, settings);
  }

  withTypography(
    textSize?: Record<keyof SizeProps, string>,
    textAppearance?: Record<keyof TextAppearanceProps, string>,
    settings: Partial<TypographySettings> = new TypographySettings()
  ): this {
    return this
      .withClasses(fontFamilyClasses, settings.fontFamily)
      .withClasses(fontStyleClasses, settings.fontStyle)
      .withClasses(fontWeightClasses, settings.fontWeight)
      .withClasses(textDecorationClasses, settings.textDecoration)
      .withClasses(textTransformClasses, settings.textTransform)
      .withClasses(textAlignClasses, settings.textAlign)
      .withClasses(textAppearance || textAppearanceClasses, settings.textAppearance)
      .withClasses(textSize || textSizeClasses, settings.textSize);
  }

  withBorder(
    borderColorMap: Record<keyof CommonAppearanceProps, string> = borderAppearanceClasses,
    roundedMap: Record<keyof SizeProps, string> = roundedClasses,
    settings: BorderSettings = new BorderSettings()
  ): this {
    return this
      .withClasses(borderColorMap, settings.color)
      .withClasses(roundedMap, settings.radius.rounded)
      .withClasses(pillClasses, {pill: settings.radius.pill})
      .withClasses(sharpClasses, {sharp: settings.radius.sharp})
      .withClasses(noBorderClasses, {noBorder: settings.noBorder});
  }

  with(action: (b: ComponentBuilder) => ComponentBuilder): this {
    action(this);
    return this;
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
