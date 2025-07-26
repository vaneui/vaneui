import type { 
  ButtonPropsStructure,
  BadgePropsStructure,
  ChipPropsStructure,
  TypographyPropsStructure,
  LayoutPropsStructure,
  CardPropsStructure 
} from '../ui/props';
import {
  SIZE_KEYS,
  APPEARANCE_KEYS,
  UI_ELEMENT_APPEARANCE_KEYS,
  VARIANT_KEYS,
  SHAPE_KEYS,
  SHADOW_KEYS,
  BORDER_KEYS,
  RING_KEYS,
  PADDING_KEYS,
  GAP_KEYS,
  FONT_FAMILY_KEYS,
  FONT_WEIGHT_KEYS,
  FONT_STYLE_KEYS,
  TEXT_DECORATION_KEYS,
  TEXT_TRANSFORM_KEYS,
  TEXT_ALIGN_KEYS,
  DISPLAY_KEYS,
  POSITION_KEYS,
  ITEMS_KEYS,
  JUSTIFY_KEYS,
  HIDE_KEYS,
  OVERFLOW_KEYS,
  FLEX_DIRECTION_KEYS,
  WRAP_KEYS,
  BREAKPOINT_KEYS,
  DIRECTION_REVERSE_KEYS
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
 * Extract keys for Button components
 */
export function extractButtonKeys(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>
): ButtonPropsStructure {
  return {
    size: pickFirstTruthyKey(props, defaults, SIZE_KEYS) || 'md',
    appearance: pickFirstTruthyKey(props, defaults, UI_ELEMENT_APPEARANCE_KEYS) || 'default',
    variant: pickFirstTruthyKey(props, defaults, VARIANT_KEYS),
    shape: pickFirstTruthyKey(props, defaults, SHAPE_KEYS),
    shadow: pickFirstTruthyKey(props, defaults, SHADOW_KEYS),
    border: pickFirstTruthyKey(props, defaults, BORDER_KEYS),
    ring: pickFirstTruthyKey(props, defaults, RING_KEYS),
    padding: pickFirstTruthyKey(props, defaults, PADDING_KEYS),
    gap: pickFirstTruthyKey(props, defaults, GAP_KEYS),
    fontFamily: pickFirstTruthyKey(props, defaults, FONT_FAMILY_KEYS),
    fontWeight: pickFirstTruthyKey(props, defaults, FONT_WEIGHT_KEYS),
    fontStyle: pickFirstTruthyKey(props, defaults, FONT_STYLE_KEYS),
    textDecoration: pickFirstTruthyKey(props, defaults, TEXT_DECORATION_KEYS),
    textTransform: pickFirstTruthyKey(props, defaults, TEXT_TRANSFORM_KEYS),
    textAlign: pickFirstTruthyKey(props, defaults, TEXT_ALIGN_KEYS),
    display: pickFirstTruthyKey(props, defaults, DISPLAY_KEYS),
    position: pickFirstTruthyKey(props, defaults, POSITION_KEYS),
    items: pickFirstTruthyKey(props, defaults, ITEMS_KEYS),
    justify: pickFirstTruthyKey(props, defaults, JUSTIFY_KEYS),
    hide: pickFirstTruthyKey(props, defaults, HIDE_KEYS),
    overflow: pickFirstTruthyKey(props, defaults, OVERFLOW_KEYS),
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
    size: pickFirstTruthyKey(props, defaults, SIZE_KEYS) || 'md',
    appearance: pickFirstTruthyKey(props, defaults, APPEARANCE_KEYS) || 'default',
    fontFamily: pickFirstTruthyKey(props, defaults, FONT_FAMILY_KEYS),
    fontWeight: pickFirstTruthyKey(props, defaults, FONT_WEIGHT_KEYS),
    fontStyle: pickFirstTruthyKey(props, defaults, FONT_STYLE_KEYS),
    textDecoration: pickFirstTruthyKey(props, defaults, TEXT_DECORATION_KEYS),
    textTransform: pickFirstTruthyKey(props, defaults, TEXT_TRANSFORM_KEYS),
    textAlign: pickFirstTruthyKey(props, defaults, TEXT_ALIGN_KEYS),
    display: pickFirstTruthyKey(props, defaults, DISPLAY_KEYS),
    position: pickFirstTruthyKey(props, defaults, POSITION_KEYS),
    items: pickFirstTruthyKey(props, defaults, ITEMS_KEYS),
    justify: pickFirstTruthyKey(props, defaults, JUSTIFY_KEYS),
    hide: pickFirstTruthyKey(props, defaults, HIDE_KEYS),
    overflow: pickFirstTruthyKey(props, defaults, OVERFLOW_KEYS),
    padding: pickFirstTruthyKey(props, defaults, PADDING_KEYS),
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
    gap: pickFirstTruthyKey(props, defaults, GAP_KEYS),
    shape: pickFirstTruthyKey(props, defaults, SHAPE_KEYS),
    border: pickFirstTruthyKey(props, defaults, BORDER_KEYS),
    ring: pickFirstTruthyKey(props, defaults, RING_KEYS),
    shadow: pickFirstTruthyKey(props, defaults, SHADOW_KEYS),
    padding: pickFirstTruthyKey(props, defaults, PADDING_KEYS),
    flexDirection: pickFirstTruthyKey(props, defaults, FLEX_DIRECTION_KEYS),
    wrap: pickFirstTruthyKey(props, defaults, WRAP_KEYS),
    breakpoint: pickFirstTruthyKey(props, defaults, BREAKPOINT_KEYS),
    reverse: pickFirstTruthyKey(props, defaults, DIRECTION_REVERSE_KEYS),
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
    size: pickFirstTruthyKey(props, defaults, SIZE_KEYS) || 'md',
    appearance: pickFirstTruthyKey(props, defaults, APPEARANCE_KEYS) || 'default',
    gap: pickFirstTruthyKey(props, defaults, GAP_KEYS),
    padding: pickFirstTruthyKey(props, defaults, PADDING_KEYS),
    flexDirection: pickFirstTruthyKey(props, defaults, FLEX_DIRECTION_KEYS),
    wrap: pickFirstTruthyKey(props, defaults, WRAP_KEYS),
    items: pickFirstTruthyKey(props, defaults, ITEMS_KEYS),
    justify: pickFirstTruthyKey(props, defaults, JUSTIFY_KEYS),
    display: pickFirstTruthyKey(props, defaults, DISPLAY_KEYS),
    position: pickFirstTruthyKey(props, defaults, POSITION_KEYS),
    hide: pickFirstTruthyKey(props, defaults, HIDE_KEYS),
    overflow: pickFirstTruthyKey(props, defaults, OVERFLOW_KEYS),
    breakpoint: pickFirstTruthyKey(props, defaults, BREAKPOINT_KEYS),
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
    padding: pickFirstTruthyKey(props, defaults, PADDING_KEYS),
  };
}
