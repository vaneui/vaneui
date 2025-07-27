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
  SizeKey,
  AppearanceKey,
  VariantKey,
  ShapeKey,
  ShadowKey,
  BorderKey,
  RingKey,
  PaddingKey,
  GapKey,
  FontFamilyKey,
  FontWeightKey,
  FontStyleKey,
  TextDecorationKey,
  TextTransformKey,
  TextAlignKey,
  DisplayKey,
  PositionKey,
  ItemsKey,
  JustifyKey,
  HideKey,
  OverflowKey,
  FlexDirectionKey,
  WrapKey,
  BreakpointKey,
  DirectionReverseKey,
  TransparentKey,
  LinkKey
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
    size: pickFirstTruthyKey(props, defaults, ComponentKeys.size) || 'md',
    appearance: pickFirstTruthyKey(props, defaults, ComponentKeys.appearance) || 'default',
    variant: pickFirstTruthyKey(props, defaults, ComponentKeys.variant),
    shape: pickFirstTruthyKey(props, defaults, ComponentKeys.shape),
    shadow: pickFirstTruthyKey(props, defaults, ComponentKeys.shadow),
    border: pickFirstTruthyKey(props, defaults, ComponentKeys.border),
    ring: pickFirstTruthyKey(props, defaults, ComponentKeys.ring),
    padding: pickFirstTruthyKey(props, defaults, ComponentKeys.padding),
    gap: pickFirstTruthyKey(props, defaults, ComponentKeys.gap),
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
