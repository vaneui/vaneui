import { BaseTheme } from "./baseTheme";

import { MODE_KEYS, ModeKey } from "../../props/keys";

export class ModeTheme extends BaseTheme {
  constructor(private classes: Partial<Record<ModeKey, string>> = {}) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    return MODE_KEYS.map(mode => this.classes[mode] || '');
  }
}
