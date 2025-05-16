import { BaseLayoutTheme } from "./baseLayoutTheme";
import {
  BREAKPOINT_KEYS, BreakpointKey,
  DIRECTION_KEYS,
  DIRECTION_REVERSE_KEYS,
  DirectionKey,
} from "../../props/propKeys";
import { Mode } from "../../props/mode";
import { pickFirstKeyOptional } from "../../../utils/componentUtils";
import { directionClasses, rowToColumnBreakpointClasses } from "../../classes/layoutClasses";

export class DirectionLayoutTheme extends BaseLayoutTheme {
  direction: Partial<Record<DirectionKey, string>>;
  breakpoint: Partial<Record<BreakpointKey, string>>;

  constructor() {
    super();
    this.direction = {
      column: "flex-col",
      row: "flex-row",
    };
    this.direction = directionClasses;
    this.breakpoint = rowToColumnBreakpointClasses;
  }

  getClasses(props: Record<string, any>, mode: Mode = 'base'): string {
    const baseClasses = super.getClasses(props);
    const reverse = pickFirstKeyOptional(props, DIRECTION_REVERSE_KEYS);
    const direction = pickFirstKeyOptional(props, DIRECTION_KEYS) ?? 'column';
    const breakpoint = pickFirstKeyOptional(props, BREAKPOINT_KEYS);

    const classes = [
      baseClasses,
      reverse ? (direction === 'row' ? 'flex-row-reverse' : direction === 'column' ? 'flex-col-reverse' : '') : '',
      reverse === undefined && direction ? this.direction[direction] || '' : '',
      breakpoint ? this.breakpoint[breakpoint] || '' : '',
    ];

    return classes.filter(Boolean).join(' ');
  }

  static createDirectionTheme(): DirectionLayoutTheme {
    return new DirectionLayoutTheme();
  }

}
