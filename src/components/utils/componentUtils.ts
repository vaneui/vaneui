import type { 
  ButtonPropsStructure,
  BadgePropsStructure,
  ChipPropsStructure,
  TypographyPropsStructure,
  LayoutPropsStructure,
  CardPropsStructure 
} from '../ui/props';
import { 
  ComponentKeys,
  ComponentCategoryKey
} from '../ui/props';

/**
 * Pick the first truthy key from props using a ComponentKeys category name.
 * This function looks up the keys array internally using the category name.
 * Returns the specific key type for the given category.
 */
export function pickFirstTruthyKeyByCategory<T extends ComponentCategoryKey>(
  props: Record<string, any>,
  defaults: Record<string, any>,
  category: T
): typeof ComponentKeys[T][number] | undefined {
  const keys = ComponentKeys[category];
  
  const falsyKeys: string[] = [];

  for (const k of keys) {
    const p = props[k];
    if (p === true)
      return k as typeof ComponentKeys[T][number];
    if (p === false)
      falsyKeys.push(k);
  }

  for (const k of keys) {
    const d = defaults[k];
    if (d === true && !falsyKeys.includes(k))
      return k as typeof ComponentKeys[T][number];
  }

  return undefined;
}

/**
 * Extract keys for Button components
 */
export function extractButtonKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): ButtonPropsStructure {
  return {
    size: pickFirstTruthyKeyByCategory(props, defaults, 'size') || 'md',
    appearance: pickFirstTruthyKeyByCategory(props, defaults, 'appearance') || 'default',
    variant: pickFirstTruthyKeyByCategory(props, defaults, 'variant'),
    shape: pickFirstTruthyKeyByCategory(props, defaults, 'shape'),
    shadow: pickFirstTruthyKeyByCategory(props, defaults, 'shadow'),
    border: pickFirstTruthyKeyByCategory(props, defaults, 'border'),
    ring: pickFirstTruthyKeyByCategory(props, defaults, 'ring'),
    padding: pickFirstTruthyKeyByCategory(props, defaults, 'padding'),
    gap: pickFirstTruthyKeyByCategory(props, defaults, 'gap'),
    fontFamily: pickFirstTruthyKeyByCategory(props, defaults, 'fontFamily'),
    fontWeight: pickFirstTruthyKeyByCategory(props, defaults, 'fontWeight'),
    fontStyle: pickFirstTruthyKeyByCategory(props, defaults, 'fontStyle'),
    textDecoration: pickFirstTruthyKeyByCategory(props, defaults, 'textDecoration'),
    textTransform: pickFirstTruthyKeyByCategory(props, defaults, 'textTransform'),
    textAlign: pickFirstTruthyKeyByCategory(props, defaults, 'textAlign'),
    display: pickFirstTruthyKeyByCategory(props, defaults, 'display'),
    position: pickFirstTruthyKeyByCategory(props, defaults, 'position'),
    items: pickFirstTruthyKeyByCategory(props, defaults, 'items'),
    justify: pickFirstTruthyKeyByCategory(props, defaults, 'justify'),
    hide: pickFirstTruthyKeyByCategory(props, defaults, 'hide'),
    overflow: pickFirstTruthyKeyByCategory(props, defaults, 'overflow'),
  };
}

/**
 * Extract keys for Badge components
 */
export function extractBadgeKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): BadgePropsStructure {
  // Badge uses same extraction as Button
  return extractButtonKeys(props, defaults);
}

/**
 * Extract keys for Chip components
 */
export function extractChipKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): ChipPropsStructure {
  // Chip uses same extraction as Button
  return extractButtonKeys(props, defaults);
}

/**
 * Extract keys for Typography components
 */
export function extractTypographyKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): TypographyPropsStructure {
  return {
    size: pickFirstTruthyKeyByCategory(props, defaults, 'size') || 'md',
    appearance: pickFirstTruthyKeyByCategory(props, defaults, 'appearance') || 'default',
    transparent: pickFirstTruthyKeyByCategory(props, defaults, 'transparent'),
    link: pickFirstTruthyKeyByCategory(props, defaults, 'link'),
    fontFamily: pickFirstTruthyKeyByCategory(props, defaults, 'fontFamily'),
    fontWeight: pickFirstTruthyKeyByCategory(props, defaults, 'fontWeight'),
    fontStyle: pickFirstTruthyKeyByCategory(props, defaults, 'fontStyle'),
    textDecoration: pickFirstTruthyKeyByCategory(props, defaults, 'textDecoration'),
    textTransform: pickFirstTruthyKeyByCategory(props, defaults, 'textTransform'),
    textAlign: pickFirstTruthyKeyByCategory(props, defaults, 'textAlign'),
    display: pickFirstTruthyKeyByCategory(props, defaults, 'display'),
    position: pickFirstTruthyKeyByCategory(props, defaults, 'position'),
    items: pickFirstTruthyKeyByCategory(props, defaults, 'items'),
    justify: pickFirstTruthyKeyByCategory(props, defaults, 'justify'),
    hide: pickFirstTruthyKeyByCategory(props, defaults, 'hide'),
    overflow: pickFirstTruthyKeyByCategory(props, defaults, 'overflow'),
    padding: pickFirstTruthyKeyByCategory(props, defaults, 'padding'),
  };
}

/**
 * Extract keys for Card components
 */
export function extractCardKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): CardPropsStructure {
  return {
    ...extractTypographyKeys(props, defaults),
    gap: pickFirstTruthyKeyByCategory(props, defaults, 'gap'),
    shape: pickFirstTruthyKeyByCategory(props, defaults, 'shape'),
    border: pickFirstTruthyKeyByCategory(props, defaults, 'border'),
    ring: pickFirstTruthyKeyByCategory(props, defaults, 'ring'),
    shadow: pickFirstTruthyKeyByCategory(props, defaults, 'shadow'),
    padding: pickFirstTruthyKeyByCategory(props, defaults, 'padding'),
    flexDirection: pickFirstTruthyKeyByCategory(props, defaults, 'flexDirection'),
    wrap: pickFirstTruthyKeyByCategory(props, defaults, 'wrap'),
    breakpoint: pickFirstTruthyKeyByCategory(props, defaults, 'breakpoint'),
    reverse: pickFirstTruthyKeyByCategory(props, defaults, 'directionReverse'),
  };
}

/**
 * Extract keys for Layout components
 */
export function extractLayoutKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): LayoutPropsStructure {
  return {
    size: pickFirstTruthyKeyByCategory(props, defaults, 'size') || 'md',
    appearance: pickFirstTruthyKeyByCategory(props, defaults, 'appearance') || 'default',
    transparent: pickFirstTruthyKeyByCategory(props, defaults, 'transparent'),
    gap: pickFirstTruthyKeyByCategory(props, defaults, 'gap'),
    padding: pickFirstTruthyKeyByCategory(props, defaults, 'padding'),
    flexDirection: pickFirstTruthyKeyByCategory(props, defaults, 'flexDirection'),
    wrap: pickFirstTruthyKeyByCategory(props, defaults, 'wrap'),
    items: pickFirstTruthyKeyByCategory(props, defaults, 'items'),
    justify: pickFirstTruthyKeyByCategory(props, defaults, 'justify'),
    display: pickFirstTruthyKeyByCategory(props, defaults, 'display'),
    position: pickFirstTruthyKeyByCategory(props, defaults, 'position'),
    hide: pickFirstTruthyKeyByCategory(props, defaults, 'hide'),
    overflow: pickFirstTruthyKeyByCategory(props, defaults, 'overflow'),
    breakpoint: pickFirstTruthyKeyByCategory(props, defaults, 'breakpoint'),
  };
}

/**
 * Extract keys for Divider components
 */
export function extractDividerKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): TypographyPropsStructure {
  return extractTypographyKeys(props, defaults);
}

/**
 * Extract keys for Container components
 */
export function extractContainerKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): LayoutPropsStructure {
  return extractLayoutKeys(props, defaults);
}

/**
 * Extract keys for Section components  
 */
export function extractSectionKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): CardPropsStructure {
  return extractCardKeys(props, defaults);
}

/**
 * Extract keys for Stack components
 */
export function extractStackKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): CardPropsStructure {
  return extractCardKeys(props, defaults);
}

/**
 * Extract keys for Row components
 */
export function extractRowKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): LayoutPropsStructure {
  return extractLayoutKeys(props, defaults);
}

/**
 * Extract keys for Col components
 */
export function extractColKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): LayoutPropsStructure {
  return extractLayoutKeys(props, defaults);
}

/**
 * Extract keys for Grid components
 */
export function extractGridKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): LayoutPropsStructure {
  return extractLayoutKeys(props, defaults);
}

/**
 * Extract keys for List components
 */
export function extractListKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): TypographyPropsStructure {
  return {
    ...extractTypographyKeys(props, defaults),
    padding: pickFirstTruthyKeyByCategory(props, defaults, 'padding'),
  };
}
