import { BaseTheme } from "./baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";

export class ModeTheme extends BaseTheme {
  constructor(private classes: Partial<Record<Mode, string>> = {}) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    return MODE_KEYS.map(mode => this.classes[mode] || '');
  }
}
