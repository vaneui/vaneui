import { BaseClassMapper } from "../common";
import type { AppearanceCategoryKey, CategoryProps } from "../../props";

/**
 * A simplified appearance theme that outputs consumer classes
 * referencing component-level CSS variables (like --bg-color, --text-color).
 *
 * Used for components that have CSS rules in vars.css that set these
 * variables based on data-appearance and data-variant attributes.
 *
 * Unlike AppearanceTheme which outputs different classes for each appearance,
 * this theme outputs the same consumer classes regardless of appearance,
 * since the CSS rules handle the appearance-specific logic.
 *
 * Properties are public to allow theme overrides via ThemeProvider.
 */
export class SimpleConsumerClassMapper extends BaseClassMapper {
  /** Base class applied to the element */
  base: string;
  /** Class applied on hover state */
  hover: string;
  /** Class applied on active state */
  active: string;
  /** Class applied on focus-visible state */
  focusVisible: string;
  /** The category this theme applies to (for conditional rendering) */
  readonly category: AppearanceCategoryKey;
  /** If true, always output consumer classes even without an appearance prop (for CSS inheritance from parent) */
  readonly alwaysOutput: boolean;

  constructor(
    config: {
      base: string;
      hover?: string;
      active?: string;
      focusVisible?: string;
      alwaysOutput?: boolean;
    },
    category: AppearanceCategoryKey
  ) {
    super();
    this.base = config.base;
    this.hover = config.hover || '';
    this.active = config.active || '';
    this.focusVisible = config.focusVisible || '';
    this.category = category;
    this.alwaysOutput = config.alwaysOutput || false;
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    // Handle conditional categories - only output if the feature is enabled
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

    // Handle transparent prop - don't output background classes if transparent is true
    if (this.category === 'bg' && extractedKeys.transparent === 'transparent') {
      return [];
    }

    // Only output classes if an appearance is set (unless alwaysOutput is true)
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
