import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ComponentKeys, ModeKey, AppearanceKey } from "../../props";

export class AppearanceTheme extends BaseTheme implements Record<AppearanceKey, Record<ModeKey, string>> {
  default!: Record<ModeKey, string>;
  accent!: Record<ModeKey, string>;
  primary!: Record<ModeKey, string>;
  secondary!: Record<ModeKey, string>;
  tertiary!: Record<ModeKey, string>;
  success!: Record<ModeKey, string>;
  danger!: Record<ModeKey, string>;
  warning!: Record<ModeKey, string>;
  info!: Record<ModeKey, string>;
  link!: Record<ModeKey, string>;

  private readonly transparentClasses?: Record<string, string>;

  private constructor(
    config: Record<AppearanceKey, Record<ModeKey, string>>,
    transparentClasses?: Record<string, string>
  ) {
    super();
    Object.assign(this, config);
    this.transparentClasses = transparentClasses;
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    // Check for specific transparent styles first
    if (extractedKeys?.transparent) {
      const transparentClass = this.transparentClasses?.[extractedKeys.transparent] || '';
      return [transparentClass];
    }

    // Use appearance (now includes link as an appearance option)
    const pickedAppearanceKey = extractedKeys?.appearance;
    if (pickedAppearanceKey) {
      const modes = this[pickedAppearanceKey];
      if (modes) {
        return ComponentKeys.mode.map(mode => modes[mode] || '');
      }
    }

    return [];
  }

  static createTheme(
    src: Partial<Record<ModeKey, Partial<Record<AppearanceKey, string>>>> = {},
  ): AppearanceTheme {
    const config = Object.fromEntries(
      ComponentKeys.appearance.map(textKey => [
        textKey,
        Object.fromEntries(
          ComponentKeys.mode.map(modeKey => [
            modeKey,
            src[modeKey]?.[textKey] || ''
          ])
        ),
      ])
    ) as Record<AppearanceKey, Record<ModeKey, string>>;

    return new AppearanceTheme(config, src.base);
  }
}
