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
  ComponentCategoryKey,
} from '../ui/props';

/**
 * Pick the first truthy key from props, then from defaults, then undefined.
 */
export function pickFirstTruthyKey<P, K extends keyof P>(
  props: Partial<P>,
  defaults: Partial<P>,
  keys: readonly K[]
): K | undefined {

  let falsyKeys: K[] = [];

  for (const k of keys) {
    const p = props[k];
    if (p === true)
      return k;
    if (p === false)
      falsyKeys.push(k);
  }

  for (const k of keys) {
    const d = defaults[k];
    if (d === true && !falsyKeys.includes(k))
      return k;
  }

  return undefined;
}

/**
 * Pick the first truthy key from props using a ComponentKeys category name.
 * This function looks up the keys array internally using the category name.
 */
export function pickFirstTruthyKeyByCategory<P>(
  props: Partial<P>,
  defaults: Partial<P>,
  category: ComponentCategoryKey
): string | undefined {
  const keys = ComponentKeys[category];
  
  const falsyKeys: string[] = [];

  for (const k of keys) {
    const p = props[k as keyof P];
    if (p === true)
      return k;
    if (p === false)
      falsyKeys.push(k);
  }

  for (const k of keys) {
    const d = defaults[k as keyof P];
    if (d === true && !falsyKeys.includes(k))
      return k;
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
    size: pickFirstTruthyKeyByCategory(props, defaults, 'size') as any || 'md',
    appearance: pickFirstTruthyKeyByCategory(props, defaults, 'appearance') as any || 'default',
    variant: pickFirstTruthyKeyByCategory(props, defaults, 'variant') as any,
    shape: pickFirstTruthyKeyByCategory(props, defaults, 'shape') as any,
    shadow: pickFirstTruthyKeyByCategory(props, defaults, 'shadow') as any,
    border: pickFirstTruthyKeyByCategory(props, defaults, 'border') as any,
    ring: pickFirstTruthyKeyByCategory(props, defaults, 'ring') as any,
    padding: pickFirstTruthyKeyByCategory(props, defaults, 'padding') as any,
    gap: pickFirstTruthyKeyByCategory(props, defaults, 'gap') as any,
    fontFamily: pickFirstTruthyKeyByCategory(props, defaults, 'fontFamily') as any,
    fontWeight: pickFirstTruthyKeyByCategory(props, defaults, 'fontWeight') as any,
    fontStyle: pickFirstTruthyKeyByCategory(props, defaults, 'fontStyle') as any,
    textDecoration: pickFirstTruthyKeyByCategory(props, defaults, 'textDecoration') as any,
    textTransform: pickFirstTruthyKeyByCategory(props, defaults, 'textTransform') as any,
    textAlign: pickFirstTruthyKeyByCategory(props, defaults, 'textAlign') as any,
    display: pickFirstTruthyKeyByCategory(props, defaults, 'display') as any,
    position: pickFirstTruthyKeyByCategory(props, defaults, 'position') as any,
    items: pickFirstTruthyKeyByCategory(props, defaults, 'items') as any,
    justify: pickFirstTruthyKeyByCategory(props, defaults, 'justify') as any,
    hide: pickFirstTruthyKeyByCategory(props, defaults, 'hide') as any,
    overflow: pickFirstTruthyKeyByCategory(props, defaults, 'overflow') as any,
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
    size: pickFirstTruthyKey(props, defaults, ComponentKeys.size) || 'md',
    appearance: pickFirstTruthyKey(props, defaults, ComponentKeys.appearance) || 'default',
    transparent: pickFirstTruthyKey(props, defaults, ComponentKeys.transparent),
    link: pickFirstTruthyKey(props, defaults, ComponentKeys.link),
    fontFamily: pickFirstTruthyKey(props, defaults, ComponentKeys.fontFamily),
    fontWeight: pickFirstTruthyKey(props, defaults, ComponentKeys.fontWeight),
    fontStyle: pickFirstTruthyKey(props, defaults, ComponentKeys.fontStyle),
    textDecoration: pickFirstTruthyKey(props, defaults, ComponentKeys.textDecoration),
    textTransform: pickFirstTruthyKey(props, defaults, ComponentKeys.textTransform),
    textAlign: pickFirstTruthyKey(props, defaults, ComponentKeys.textAlign),
    display: pickFirstTruthyKey(props, defaults, ComponentKeys.display),
    position: pickFirstTruthyKey(props, defaults, ComponentKeys.position),
    items: pickFirstTruthyKey(props, defaults, ComponentKeys.items),
    justify: pickFirstTruthyKey(props, defaults, ComponentKeys.justify),
    hide: pickFirstTruthyKey(props, defaults, ComponentKeys.hide),
    overflow: pickFirstTruthyKey(props, defaults, ComponentKeys.overflow),
    padding: pickFirstTruthyKey(props, defaults, ComponentKeys.padding),
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
    gap: pickFirstTruthyKey(props, defaults, ComponentKeys.gap),
    shape: pickFirstTruthyKey(props, defaults, ComponentKeys.shape),
    border: pickFirstTruthyKey(props, defaults, ComponentKeys.border),
    ring: pickFirstTruthyKey(props, defaults, ComponentKeys.ring),
    shadow: pickFirstTruthyKey(props, defaults, ComponentKeys.shadow),
    padding: pickFirstTruthyKey(props, defaults, ComponentKeys.padding),
    flexDirection: pickFirstTruthyKey(props, defaults, ComponentKeys.flexDirection),
    wrap: pickFirstTruthyKey(props, defaults, ComponentKeys.wrap),
    breakpoint: pickFirstTruthyKey(props, defaults, ComponentKeys.breakpoint),
    reverse: pickFirstTruthyKey(props, defaults, ComponentKeys.directionReverse),
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
    size: pickFirstTruthyKey(props, defaults, ComponentKeys.size) || 'md',
    appearance: pickFirstTruthyKey(props, defaults, ComponentKeys.appearance) || 'default',
    transparent: pickFirstTruthyKey(props, defaults, ComponentKeys.transparent),
    gap: pickFirstTruthyKey(props, defaults, ComponentKeys.gap),
    padding: pickFirstTruthyKey(props, defaults, ComponentKeys.padding),
    flexDirection: pickFirstTruthyKey(props, defaults, ComponentKeys.flexDirection),
    wrap: pickFirstTruthyKey(props, defaults, ComponentKeys.wrap),
    items: pickFirstTruthyKey(props, defaults, ComponentKeys.items),
    justify: pickFirstTruthyKey(props, defaults, ComponentKeys.justify),
    display: pickFirstTruthyKey(props, defaults, ComponentKeys.display),
    position: pickFirstTruthyKey(props, defaults, ComponentKeys.position),
    hide: pickFirstTruthyKey(props, defaults, ComponentKeys.hide),
    overflow: pickFirstTruthyKey(props, defaults, ComponentKeys.overflow),
    breakpoint: pickFirstTruthyKey(props, defaults, ComponentKeys.breakpoint),
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
    padding: pickFirstTruthyKey(props, defaults, ComponentKeys.padding),
  };
}
