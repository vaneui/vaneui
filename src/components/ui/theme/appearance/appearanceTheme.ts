import { BaseTheme } from "../common/baseTheme";
import { AppearanceCategoryKey, CategoryProps, TransparentKey } from "../../props";
import { ComponentKeys, ModeKey, AppearanceKey } from "../../props";
import { ModeKeys } from "../../props/mode";

export class AppearanceTheme extends BaseTheme implements Record<AppearanceKey, Record<ModeKey, string>> {
  /** Primary appearance - uses primary/gray color variables for main neutral styling */
  primary!: Record<ModeKey, string>;
  /** Brand appearance - uses brand/blue color variables for brand styling */
  brand!: Record<ModeKey, string>;
  /** Accent appearance - uses accent/rose color variables for brand secondary styling */
  accent!: Record<ModeKey, string>;
  /** Secondary appearance - uses secondary/gray color variables for muted styling */
  secondary!: Record<ModeKey, string>;
  /** Tertiary appearance - uses tertiary/gray color variables for subtle styling */
  tertiary!: Record<ModeKey, string>;
  /** Success appearance - uses success/emerald color variables for positive states */
  success!: Record<ModeKey, string>;
  /** Danger appearance - uses danger/red color variables for error/destructive states */
  danger!: Record<ModeKey, string>;
  /** Warning appearance - uses warning/amber color variables for caution states */
  warning!: Record<ModeKey, string>;
  /** Info appearance - uses info/cyan color variables for informational states */
  info!: Record<ModeKey, string>;
  /** Link appearance - uses link/blue color variables for hyperlinks and navigation */
  link!: Record<ModeKey, string>;

  private readonly transparentClasses?: Record<string, string>;
  private readonly category: AppearanceCategoryKey;
  private readonly ignoreTransparent: boolean;

  private constructor(
    config: Record<AppearanceKey, Record<ModeKey, string>>,
    category: AppearanceCategoryKey,
    transparentClasses?: Record<string, string>,
    ignoreTransparent: boolean = false
  ) {
    super();
    Object.assign(this, config);
    this.category = category;
    this.transparentClasses = transparentClasses;
    this.ignoreTransparent = ignoreTransparent;
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (this.category === 'border') {
      // If noBorder is selected from the border category, don't apply appearance colors
      if ((extractedKeys.border as string) === 'noBorder') {
        return [];
      }

      // Only apply appearance colors if any border prop is set (and not noBorder)
      const hasBorderProps = extractedKeys.border !== undefined && (extractedKeys.border as string) !== 'noBorder';

      // If no border props are set, don't apply appearance colors
      if (!hasBorderProps) {
        return [];
      }
    }
    if (this.category === 'ring' && (extractedKeys.ring === 'noRing' || extractedKeys.ring === undefined)) {
      return [];
    }
    if (this.category === 'shadow' && (extractedKeys.shadow === 'noShadow' || extractedKeys.shadow === undefined)) {
      return [];
    }
    if (this.category === 'focusVisible' && (extractedKeys.focusVisible === 'noFocusVisible' || extractedKeys.focusVisible === undefined)) {
      return [];
    }

    // Check for specific transparent styles first
    if (extractedKeys?.transparent && !this.ignoreTransparent) {
      const transparentClass = this.transparentClasses?.[extractedKeys.transparent] || '';
      return [transparentClass];
    }

    // Use appearance (now includes link as an appearance option)
    const pickedAppearanceKey = extractedKeys?.appearance;
    if (pickedAppearanceKey) {
      const modes = this[pickedAppearanceKey];
      if (modes) {
        return ModeKeys.mode.map(mode => modes[mode] || '');
      }
    }

    return [];
  }

  static createTheme(
    src: Partial<Record<ModeKey, Partial<Record<AppearanceKey | TransparentKey, string>>>> = {},
    category: AppearanceCategoryKey,
    ignoreTransparent: boolean = false
  ): AppearanceTheme {
    const config = Object.fromEntries(
      ComponentKeys.appearance.map(key => [
        key,
        Object.fromEntries(
          ModeKeys.mode.map(modeKey => [
            modeKey,
            src[modeKey]?.[key] || ''
          ])
        ),
      ])
    ) as Record<AppearanceKey, Record<ModeKey, string>>;

    return new AppearanceTheme(config, category, src.base, ignoreTransparent);
  }
}
