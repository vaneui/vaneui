import { BaseTheme } from "../baseTheme";
import { Mode } from "../../props/mode";
import { 
  STYLE_KEYS, 
  StyleKey, 
  TEXT_APPEARANCE_KEYS, 
  TextAppearanceKey 
} from "../../props/propKeys";
import { pickFirstKey } from "../../../utils/componentUtils";
import { VariantAppearance } from "../commonTypes";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  borderAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses,
  filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses,
  filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses,
  ringAppearanceClasses,
} from "../../classes/appearanceClasses";
import {
  filledTextAppearanceClasses,
  textAppearanceClasses
} from "../../classes/typographyClasses";

/**
 * Base appearance variant class
 */
export class AppearanceTheme extends BaseTheme {
  background: Partial<Record<Mode, string>>;
  textColor: Partial<Record<Mode, string>>;
  borderColor: Partial<Record<Mode, string>>;
  ringColor: Partial<Record<Mode, string>>;

  constructor(
    background: Partial<Record<Mode, string>> = {},
    textColor: Partial<Record<Mode, string>> = {},
    borderColor: Partial<Record<Mode, string>> = {},
    ringColor: Partial<Record<Mode, string>> = {}
  ) {
    super();
    this.background = background;
    this.textColor = textColor;
    this.borderColor = borderColor;
    this.ringColor = ringColor;
  }

  getClasses(props: Record<string, any>, mode: Mode = 'base'): string {
    const classes = [
      this.background[mode] || '',
      this.textColor[mode] || '',
      this.borderColor[mode] || '',
      this.ringColor[mode] || ''
    ];

    return classes.filter(Boolean).join(' ');
  }

  /**
   * Helper function that creates a VariantAppearanceTheme with the given appearance classes
   * @param bgBase Background base class
   * @param bgHover Background hover class
   * @param bgActive Background active class
   * @param textBase Text color base class
   * @param borderBase Border color base class
   * @param ringBase Ring color base class
   * @returns A new VariantAppearanceTheme instance
   */
  static createAppearanceTheme(
    bgBase: string,
    bgHover: string,
    bgActive: string,
    textBase: string,
    borderBase: string,
    ringBase: string
  ): AppearanceTheme {
    return new AppearanceTheme(
      { base: bgBase, hover: bgHover, active: bgActive },
      { base: textBase, hover: '', active: '' },
      { base: borderBase, hover: '', active: '' },
      { base: ringBase, hover: '', active: '' }
    );
  }
}
