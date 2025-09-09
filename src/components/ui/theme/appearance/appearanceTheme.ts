import { BaseTheme } from "../common/baseTheme";
import { AppearanceCategoryKey, CategoryProps, TransparentKey } from "../../props";
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
    if(this.category === 'border' && extractedKeys.border === 'noBorder')
    {
      return [];
    }
    if(this.category === 'ring' && extractedKeys.ring === 'noRing')
    {
      return [];
    }
    if(this.category === 'shadow' && extractedKeys.shadow === 'noShadow')
    {
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
        return ComponentKeys.mode.map(mode => modes[mode] || '');
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
          ComponentKeys.mode.map(modeKey => [
            modeKey,
            src[modeKey]?.[key] || ''
          ])
        ),
      ])
    ) as Record<AppearanceKey, Record<ModeKey, string>>;

    return new AppearanceTheme(config, category, src.base, ignoreTransparent);
  }
}
