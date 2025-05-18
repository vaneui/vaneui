import { BaseTheme } from "../common/baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";
import {
  DirectionKey,
  HideKey, ItemsKey, JustifyKey,
  PositionKey, DirectionReverseKey,
  SizeKey, WrapKey, BreakpointKey,
  HIDE_KEYS, POSITION_KEYS, DIRECTION_KEYS,
  ITEMS_KEYS, JUSTIFY_KEYS, WRAP_KEYS,
  BREAKPOINT_KEYS, DIRECTION_REVERSE_KEYS,
  SHAPE_KEYS, SIZE_KEYS
} from "../../props/propKeys";
import {
  activeShadowClasses,
  borderModeClasses, directionClasses,
  hideClasses,
  hoverShadowClasses, itemsClasses, justifyClasses,
  noBorderModeClasses,
  noRingModeClasses,
  noShadowModeClasses,
  positionClasses,
  ringModeClasses, rowToColumnBreakpointClasses,
  shadowClasses, wrapClasses
} from "../../classes/layoutClasses";
import { pickFirstKey, pickFirstKeyOptional } from "../../../utils/componentUtils";

/**
 * Base layout theme class for handling layout-related CSS classes
 */
export class BaseLayoutTheme extends BaseTheme {
  hide: Partial<Record<HideKey, string>>;
  position: Partial<Record<PositionKey, string>>;
  shadow: Partial<Record<Mode, Partial<Record<SizeKey, string>>>>;
  border: Partial<Record<Mode, string>>;
  ring: Partial<Record<Mode, string>>;
  flags: {
    noBorder: Partial<Record<Mode, string>>;
    noShadow: Partial<Record<Mode, string>>;
    noRing: Partial<Record<Mode, string>>;
  };
  items: Partial<Record<ItemsKey, string>>;
  justify: Partial<Record<JustifyKey, string>>;
  wrap: Partial<Record<WrapKey, string>>;

  constructor() {
    super();
    this.hide = hideClasses;
    this.position = positionClasses;
    this.shadow = {
      base: shadowClasses,
      hover: hoverShadowClasses,
      active: activeShadowClasses,
    };
    this.border = borderModeClasses;
    this.ring = ringModeClasses;
    this.flags = {
      noBorder: noBorderModeClasses,
      noRing: noRingModeClasses,
      noShadow: noShadowModeClasses,
    };
    this.items = itemsClasses;
    this.justify = justifyClasses;
    this.wrap = wrapClasses;
  }

  /**
   * Get layout-related CSS classes based on props
   * @param props Component props
   * @returns CSS classes as a string
   */
  getClasses(props: Record<string, any>): string {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    const hide = pickFirstKeyOptional(props, HIDE_KEYS);
    const position = pickFirstKeyOptional(props, POSITION_KEYS);
    const items = pickFirstKeyOptional(props, ITEMS_KEYS);
    const justify = pickFirstKeyOptional(props, JUSTIFY_KEYS);
    const wrap = pickFirstKeyOptional(props, WRAP_KEYS);
    const noBorder = props.noBorder ?? false;
    const noShadow = props.noShadow ?? false;
    const noRing = props.noRing ?? false;

    const classes = [
      hide ? this.hide[hide] || '' : '',
      position ? this.position[position] || '' : '',
      items ? this.items[items] || '' : '',
      justify ? this.justify[justify] || '' : '',
      wrap ? this.wrap[wrap] || '' : '',
    ];
    const modeClasses = MODE_KEYS.flatMap(mode => [
      noBorder ? this.flags.noBorder[mode] || '' : this.border[mode] || '',
      noShadow ? this.flags.noShadow[mode] || '' : this.shadow[mode]?.[size] || '',
      noRing ? this.flags.noRing[mode] || '' : this.ring[mode] || '',
    ]);

    return [...classes, ...modeClasses].filter(Boolean).join(' ');
  }

  /**
   * Create a new BaseLayoutTheme with default values
   */
  static createBaseLayoutTheme(): BaseLayoutTheme {
    return new BaseLayoutTheme();
  }
}
