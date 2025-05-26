import { BaseTheme } from "./baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";

export class ModeTheme extends BaseTheme {
  constructor(private classes: Partial<Record<Mode, string>> = {}) {
    super();
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    return MODE_KEYS.map(mode => this.classes[mode] || '');
  }
}