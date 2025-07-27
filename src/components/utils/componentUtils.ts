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
  LinkKey,
  ModeKey
} from '../ui/props';

/**
 * Type mapping from ComponentCategoryKey to specific key types
 */
type CategoryKeyMap = {
  mode: ModeKey;
  size: SizeKey;
  variant: VariantKey;
  appearance: AppearanceKey;
  transparent: TransparentKey;
  link: LinkKey;
  fontFamily: FontFamilyKey;
  fontWeight: FontWeightKey;
  fontStyle: FontStyleKey;
  textDecoration: TextDecorationKey;
  textTransform: TextTransformKey;
  textAlign: TextAlignKey;
  border: BorderKey;
  shadow: ShadowKey;
  ring: RingKey;
  padding: PaddingKey;
  breakpoint: BreakpointKey;
  hide: HideKey;
  position: PositionKey;
  flexDirection: FlexDirectionKey;
  directionReverse: DirectionReverseKey;
  gap: GapKey;
  pill: string; // PILL_KEYS only has 'pill'
  sharp: string; // SHARP_KEYS only has 'sharp'  
  rounded: string; // ROUNDED_KEYS only has 'rounded'
  shape: ShapeKey;
  items: ItemsKey;
  justify: JustifyKey;
  wrap: WrapKey;
  display: DisplayKey;
  overflow: OverflowKey;
};


/**
 * Pick the first truthy key from props using a ComponentKeys category name.
 * This function looks up the keys array internally using the category name.
 * Returns the specific key type for the given category.
 */
export function pickFirstTruthyKeyByCategory<T extends ComponentCategoryKey>(
  props: Record<string, any>,
  defaults: Record<string, any>,
  category: T
): CategoryKeyMap[T] | undefined {
  const keys = ComponentKeys[category];
  
  const falsyKeys: string[] = [];

  for (const k of keys) {
    const p = props[k];
    if (p === true)
      return k as CategoryKeyMap[T];
    if (p === false)
      falsyKeys.push(k);
  }

  for (const k of keys) {
    const d = defaults[k];
    if (d === true && !falsyKeys.includes(k))
      return k as CategoryKeyMap[T];
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
