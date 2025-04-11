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
} from "../ui/classes/typographyClasses";
import { CommonAppearanceSettings } from "../ui/settings/commonAppearanceSettings";
import { TypographySettings } from "../ui/settings/typographySettings";
import { BorderSettings } from "../ui/settings/borderSettings";
import { SizeSettings } from "../ui/settings/sizeSettings";
import { ShadowSettings } from "../ui/settings/shadowSettings";
import { GapSettings } from "../ui/settings/gapSettings";
import { borderAppearanceClasses } from "../ui/classes/appearanceClasses";
import {
  hideClasses,
  pillClasses, positionClasses,
  roundedClasses,
  sharpClasses,
  shadowClasses,
  noShadowClasses, noBorderModeClasses, borderModeClasses, noRingModeClasses, ringModeClasses
} from "../ui/classes/layoutClasses";
import {
  noGapClasses,
  noPaddingClasses,
  pxClasses,
  pyClasses,
  commonGaps
} from "../ui/classes/spacingClasses";
import React from "react";
import { Mode } from "../ui/settings/mode";
import { BorderType } from "../ui/settings/borderType";

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
export class ComponentBuilder {
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

  withClass(prop: string, className: string = "", condition: boolean | undefined): this {
    if(condition != undefined && condition){
      this.extraClasses.push(className);
    }
    this.registerKeys([prop])
    return this;
  }

  withClasses<T extends Record<string, string>>(
    propMap?: Record<keyof T, string>,
    settings?: { [key: string]: boolean }
  ): this {
    if(propMap === undefined)
      return this;

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
      if (settingsClass !== "") {
        this.extraClasses.push(settingsClass);
      }
    }

    // Compute the class.
    const newClass = getBooleanClass(propsSubset, propMap);
    if (newClass !== "") {
      this.extraClasses.push(newClass);
    }

    // Register all keys found in the map.
    this.registerKeys(keys as string[]);
    return this;
  }

  private finalize(): React.ReactElement {
    const {className, children, tag} = this.baseProps;
    const Tag = tag || this.defaultTag;
    console.log("twMerge", this.baseClasses, this.extraClasses, className)
    const merged = twMerge(this.baseClasses, ...this.extraClasses, className);

    this.propsToRemove.forEach(key => delete this.otherProps[key as keyof typeof this.otherProps]);

    return (
      <Tag className={merged} {...this.otherProps}>
        {children}
      </Tag>
    );
  }

  withShadow(classes?: Record<keyof SizeProps, string>, settings?: Partial<ShadowSettings>): this {
    return this
      .withClasses(classes, settings?.noShadow ? {} : settings?.size)
      .withClasses(noShadowClasses, settings?.noShadow ? {noShadow: settings?.noShadow} : {});
  }

  withPadding(px?: Record<keyof SizeProps, string>,
              py?: Record<keyof SizeProps, string>,
              settings?: SizeSettings): this {
    return this
      .withClasses(px, settings || {md: true})
      .withClasses(py, settings || {md: true})
      .withClasses(noPaddingClasses);
  }

  withGaps(gapClasses?: Record<keyof SizeProps, string>, settings: Partial<GapSettings> = new GapSettings()): this {
    return this
      .withClasses(gapClasses, settings.size)
      .withClasses(noGapClasses, settings.noGap ? {noGap: settings.noGap} : {});
  }

  withAppearance(appearance?: Record<keyof CommonAppearanceProps, string>, settings?: CommonAppearanceSettings): this {
    return this.withClasses(appearance, settings);
  }

  withTypography(
    textSize?: Record<keyof SizeProps, string>,
    textAppearance?: Record<keyof TextAppearanceProps, string>,
    settings: Partial<TypographySettings> = new TypographySettings()
  ): this {
    if(!textSize && !textAppearance)
      return this;
    return this
      .withClasses(fontFamilyClasses, settings.fontFamily)
      .withClasses(fontStyleClasses, settings.fontStyle)
      .withClasses(fontWeightClasses, settings.fontWeight)
      .withClasses(textDecorationClasses, settings.textDecoration)
      .withClasses(textTransformClasses, settings.textTransform)
      .withClasses(textAlignClasses, settings.textAlign)
      .withClasses(textAppearance, settings.textAppearance)
      .withClasses(textSize, settings.size);
  }

  withBorder(
    borderColorMap?: Record<keyof CommonAppearanceProps, string>,
    roundedMap?: Record<keyof SizeProps, string>,
    settings?: Partial<BorderSettings>,
    mode: Mode = 'base',
    borderType: BorderType = 'border',
  ): this {
    const hasNoBorderSetting = settings?.noBorder !== undefined;
    const noBorder = hasNoBorderSetting && settings!.noBorder;
    return this
      .withClasses(borderColorMap, settings?.color)
      .withClasses(roundedMap, settings?.radius?.rounded)
      .withClasses(pillClasses, settings?.radius?.pill ? {pill: settings?.radius?.pill} : {})
      .withClasses(sharpClasses, settings?.radius?.sharp ? {sharp: settings?.radius?.sharp} : {})
      .withClass("noBorder", borderType === 'border' ? noBorderModeClasses[mode] : noRingModeClasses[mode], mode !== "base" && noBorder)
      .withClass("noBorder", borderType === 'border' ? borderModeClasses[mode] : ringModeClasses[mode], !noBorder)
      //.withClasses(noBorderModeClasses[mode], settings?.noBorder ? {noBorder: settings?.noBorder} : {});
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
