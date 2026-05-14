import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, WidthKey } from "../../props";

export class WidthClassMapper extends BaseClassMapper implements Record<WidthKey, string> {
  wFull: string = "w-full";
  wFit: string = "w-fit";
  wAuto: string = "w-auto";
  wScreen: string = "w-screen max-w-none";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const widthValue = extractedKeys?.width;

    if (widthValue && widthValue in this) {
      classes.push(this[widthValue as WidthKey]);
    }

    return classes;
  }
}
