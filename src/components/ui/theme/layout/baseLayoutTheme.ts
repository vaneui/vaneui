import { BaseTheme } from "../common/baseTheme";
import { Mode } from "../../props/mode";
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
  //reverse: Partial<Record<DirectionReverseKey, string>>;
  //direction: Partial<Record<DirectionKey, string>>;
  items: Partial<Record<ItemsKey, string>>;
  justify: Partial<Record<JustifyKey, string>>;
  wrap: Partial<Record<WrapKey, string>>;
  //breakpoint: Partial<Record<BreakpointKey, string>>;
  //radius?: Partial<Record<SizeKey, string>>;

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
    //TODO: fix it
    //this.reverse = {reverse: ""};

    //this.direction = directionClasses;
    this.items = itemsClasses;
    this.justify = justifyClasses;
    this.wrap = wrapClasses;
    //this.breakpoint = rowToColumnBreakpointClasses;
    //this.radius = radius;
  }

  /**
   * Get layout-related CSS classes based on props
   * @param props Component props
   * @param mode Current mode (base, hover, active)
   * @returns CSS classes as a string
   */
  getClasses(props: Record<string, any>, mode: Mode = 'base'): string {
    // Use SIZE_KEYS instead of SHAPE_KEYS to ensure size is of type SizeKey
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    const hide = pickFirstKeyOptional(props, HIDE_KEYS);
    const position = pickFirstKeyOptional(props, POSITION_KEYS);
    //const reverse = pickFirstKeyOptional(props, DIRECTION_REVERSE_KEYS);
    //const direction = pickFirstKeyOptional(props, DIRECTION_KEYS);
    const items = pickFirstKeyOptional(props, ITEMS_KEYS);
    const justify = pickFirstKeyOptional(props, JUSTIFY_KEYS);
    const wrap = pickFirstKeyOptional(props, WRAP_KEYS);
    //const breakpoint = pickFirstKeyOptional(props, BREAKPOINT_KEYS);
    const noBorder = props.noBorder ?? false;
    const noShadow = props.noShadow ?? false;
    const noRing = props.noRing ?? false;
    const shape = props.shape ?? 'rounded';

    const classes = [
      // Layout classes
      hide ? this.hide[hide] || '' : '',
      position ? this.position[position] || '' : '',
      //reverse ? this.reverse[reverse] || '' : '',
      //direction ? this.direction[direction] || '' : '',
      items ? this.items[items] || '' : '',
      justify ? this.justify[justify] || '' : '',
      wrap ? this.wrap[wrap] || '' : '',
      //breakpoint ? this.breakpoint[breakpoint] || '' : '',

      // Border, shadow, ring classes based on mode
      noBorder ? this.flags.noBorder[mode] || '' : this.border[mode] || '',
      noShadow ? this.flags.noShadow[mode] || '' : this.shadow[mode]?.[size] || '',
      noRing ? this.flags.noRing[mode] || '' : this.ring[mode] || '',

      // Shape/radius classes
      //shape === 'rounded' && this.radius ? this.radius[size] || '' : '',
      shape === 'pill' ? 'rounded-full' : '',
      shape === 'sharp' ? 'rounded-none' : ''
    ];

    return classes.filter(Boolean).join(' ');
  }

  /**
   * Create a new BaseLayoutTheme with default values
   */
  static createBaseLayoutTheme(): BaseLayoutTheme {
    return new BaseLayoutTheme();
  }
}
