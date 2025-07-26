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
    size: pickFirstTruthyKey(props, defaults, ComponentKeys.size as readonly SizeKey[]) || 'md',
    appearance: pickFirstTruthyKey(props, defaults, ComponentKeys.appearance as readonly AppearanceKey[]) || 'default',
    variant: pickFirstTruthyKey(props, defaults, ComponentKeys.variant as readonly VariantKey[]),
    shape: pickFirstTruthyKey(props, defaults, ComponentKeys.shape as readonly ShapeKey[]),
    shadow: pickFirstTruthyKey(props, defaults, ComponentKeys.shadow as readonly ShadowKey[]),
    border: pickFirstTruthyKey(props, defaults, ComponentKeys.border as readonly BorderKey[]),
    ring: pickFirstTruthyKey(props, defaults, ComponentKeys.ring as readonly RingKey[]),
    padding: pickFirstTruthyKey(props, defaults, ComponentKeys.padding as readonly PaddingKey[]),
    gap: pickFirstTruthyKey(props, defaults, ComponentKeys.gap as readonly GapKey[]),
    fontFamily: pickFirstTruthyKey(props, defaults, ComponentKeys.fontFamily as readonly FontFamilyKey[]),
    fontWeight: pickFirstTruthyKey(props, defaults, ComponentKeys.fontWeight as readonly FontWeightKey[]),
    fontStyle: pickFirstTruthyKey(props, defaults, ComponentKeys.fontStyle as readonly FontStyleKey[]),
    textDecoration: pickFirstTruthyKey(props, defaults, ComponentKeys.textDecoration as readonly TextDecorationKey[]),
    textTransform: pickFirstTruthyKey(props, defaults, ComponentKeys.textTransform as readonly TextTransformKey[]),
    textAlign: pickFirstTruthyKey(props, defaults, ComponentKeys.textAlign as readonly TextAlignKey[]),
    display: pickFirstTruthyKey(props, defaults, ComponentKeys.display as readonly DisplayKey[]),
    position: pickFirstTruthyKey(props, defaults, ComponentKeys.position as readonly PositionKey[]),
    items: pickFirstTruthyKey(props, defaults, ComponentKeys.items as readonly ItemsKey[]),
    justify: pickFirstTruthyKey(props, defaults, ComponentKeys.justify as readonly JustifyKey[]),
    hide: pickFirstTruthyKey(props, defaults, ComponentKeys.hide as readonly HideKey[]),
    overflow: pickFirstTruthyKey(props, defaults, ComponentKeys.overflow as readonly OverflowKey[]),
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
    size: pickFirstTruthyKey(props, defaults, ComponentKeys.size as readonly SizeKey[]) || 'md',
    appearance: pickFirstTruthyKey(props, defaults, ComponentKeys.appearance as readonly AppearanceKey[]) || 'default',
    transparent: pickFirstTruthyKey(props, defaults, ComponentKeys.transparent as readonly TransparentKey[]),
    link: pickFirstTruthyKey(props, defaults, ComponentKeys.link as readonly LinkKey[]),
    fontFamily: pickFirstTruthyKey(props, defaults, ComponentKeys.fontFamily as readonly FontFamilyKey[]),
    fontWeight: pickFirstTruthyKey(props, defaults, ComponentKeys.fontWeight as readonly FontWeightKey[]),
    fontStyle: pickFirstTruthyKey(props, defaults, ComponentKeys.fontStyle as readonly FontStyleKey[]),
    textDecoration: pickFirstTruthyKey(props, defaults, ComponentKeys.textDecoration as readonly TextDecorationKey[]),
    textTransform: pickFirstTruthyKey(props, defaults, ComponentKeys.textTransform as readonly TextTransformKey[]),
    textAlign: pickFirstTruthyKey(props, defaults, ComponentKeys.textAlign as readonly TextAlignKey[]),
    display: pickFirstTruthyKey(props, defaults, ComponentKeys.display as readonly DisplayKey[]),
    position: pickFirstTruthyKey(props, defaults, ComponentKeys.position as readonly PositionKey[]),
    items: pickFirstTruthyKey(props, defaults, ComponentKeys.items as readonly ItemsKey[]),
    justify: pickFirstTruthyKey(props, defaults, ComponentKeys.justify as readonly JustifyKey[]),
    hide: pickFirstTruthyKey(props, defaults, ComponentKeys.hide as readonly HideKey[]),
    overflow: pickFirstTruthyKey(props, defaults, ComponentKeys.overflow as readonly OverflowKey[]),
    padding: pickFirstTruthyKey(props, defaults, ComponentKeys.padding as readonly PaddingKey[]),
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
    gap: pickFirstTruthyKey(props, defaults, ComponentKeys.gap as readonly GapKey[]),
    shape: pickFirstTruthyKey(props, defaults, ComponentKeys.shape as readonly ShapeKey[]),
    border: pickFirstTruthyKey(props, defaults, ComponentKeys.border as readonly BorderKey[]),
    ring: pickFirstTruthyKey(props, defaults, ComponentKeys.ring as readonly RingKey[]),
    shadow: pickFirstTruthyKey(props, defaults, ComponentKeys.shadow as readonly ShadowKey[]),
    padding: pickFirstTruthyKey(props, defaults, ComponentKeys.padding as readonly PaddingKey[]),
    flexDirection: pickFirstTruthyKey(props, defaults, ComponentKeys.flexDirection as readonly FlexDirectionKey[]),
    wrap: pickFirstTruthyKey(props, defaults, ComponentKeys.wrap as readonly WrapKey[]),
    breakpoint: pickFirstTruthyKey(props, defaults, ComponentKeys.breakpoint as readonly BreakpointKey[]),
    reverse: pickFirstTruthyKey(props, defaults, ComponentKeys.directionReverse as readonly DirectionReverseKey[]),
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
    size: pickFirstTruthyKey(props, defaults, ComponentKeys.size as readonly SizeKey[]) || 'md',
    appearance: pickFirstTruthyKey(props, defaults, ComponentKeys.appearance as readonly AppearanceKey[]) || 'default',
    transparent: pickFirstTruthyKey(props, defaults, ComponentKeys.transparent as readonly TransparentKey[]),
    gap: pickFirstTruthyKey(props, defaults, ComponentKeys.gap as readonly GapKey[]),
    padding: pickFirstTruthyKey(props, defaults, ComponentKeys.padding as readonly PaddingKey[]),
    flexDirection: pickFirstTruthyKey(props, defaults, ComponentKeys.flexDirection as readonly FlexDirectionKey[]),
    wrap: pickFirstTruthyKey(props, defaults, ComponentKeys.wrap as readonly WrapKey[]),
    items: pickFirstTruthyKey(props, defaults, ComponentKeys.items as readonly ItemsKey[]),
    justify: pickFirstTruthyKey(props, defaults, ComponentKeys.justify as readonly JustifyKey[]),
    display: pickFirstTruthyKey(props, defaults, ComponentKeys.display as readonly DisplayKey[]),
    position: pickFirstTruthyKey(props, defaults, ComponentKeys.position as readonly PositionKey[]),
    hide: pickFirstTruthyKey(props, defaults, ComponentKeys.hide as readonly HideKey[]),
    overflow: pickFirstTruthyKey(props, defaults, ComponentKeys.overflow as readonly OverflowKey[]),
    breakpoint: pickFirstTruthyKey(props, defaults, ComponentKeys.breakpoint as readonly BreakpointKey[]),
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
    padding: pickFirstTruthyKey(props, defaults, ComponentKeys.padding as readonly PaddingKey[]),
  };
}
