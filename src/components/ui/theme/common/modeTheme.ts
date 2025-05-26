import { BaseTheme } from "./baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";

export class ModeTheme implements BaseTheme {
  constructor(private classes: Partial<Record<Mode, string>> = {}) {
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    return MODE_KEYS.map(mode => this.classes[mode] || '');
  }
}
