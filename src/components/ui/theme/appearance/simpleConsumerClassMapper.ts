import { BaseClassMapper } from "../common/BaseClassMapper";
import type { AppearanceCategoryKey, CategoryProps } from "../../props";

// Emits consumer classes referencing CSS variables (--bg-color etc.) — the variables themselves
// are set by data-appearance/data-variant CSS rules, so the same classes work for any appearance.
export class SimpleConsumerClassMapper extends BaseClassMapper {
  base: string;
  hover: string;
  active: string;
  focusVisible: string;
  readonly category: AppearanceCategoryKey;
  // emit classes even without an appearance prop (for cascade-based inheritance)
  readonly alwaysOutput: boolean;

  constructor(
    config: {
      base?: string;
      hover?: string;
      active?: string;
      focusVisible?: string;
      alwaysOutput?: boolean;
    },
    category: AppearanceCategoryKey
  ) {
    super();
    this.base = config.base || '';
    this.hover = config.hover || '';
    this.active = config.active || '';
    this.focusVisible = config.focusVisible || '';
    this.category = category;
    this.alwaysOutput = config.alwaysOutput || false;
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (this.category === 'border') {
      if ((extractedKeys.border as string) === 'noBorder') {
        return [];
      }
      const hasBorderProps = extractedKeys.border !== undefined && (extractedKeys.border as string) !== 'noBorder';
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

    if (this.category === 'bg' && extractedKeys.transparent === 'transparent') {
      return [];
    }

    if (!this.alwaysOutput && !extractedKeys?.appearance) {
      return [];
    }

    const classes: string[] = [];

    if (this.base) {
      classes.push(this.base);
    }

    if (this.hover) {
      classes.push(this.hover);
    }

    if (this.active) {
      classes.push(this.active);
    }

    if (this.focusVisible) {
      classes.push(this.focusVisible);
    }

    return classes;
  }
}
