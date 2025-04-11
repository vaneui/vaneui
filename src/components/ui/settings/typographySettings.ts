import {
  FontFamilyProps,
  FontStyleProps,
  FontWeightProps,
  TextAlignProps,
  TextAppearanceProps,
  TextDecorationProps,
  TextTransformProps
} from "../props/props";
import { SizeSettings } from "./sizeSettings";
import { deepMerge } from "../../utils/deepMerge";

export class TypographySettings {
  fontFamily: { [key in keyof FontFamilyProps]: boolean } = {};
  fontWeight: { [key in keyof FontWeightProps]: boolean } = {};
  fontStyle: { [key in keyof FontStyleProps]: boolean } = {};
  textAppearance: { [key in keyof TextAppearanceProps]: boolean } = {default: true};
  textDecoration: { [key in keyof TextDecorationProps]: boolean } = {};
  textTransform: { [key in keyof TextTransformProps]: boolean } = {};
  textAlign: { [key in keyof TextAlignProps]: boolean } = {};
  size: SizeSettings = new SizeSettings;

  constructor(init: Partial<TypographySettings> = {}) {
    const merged = deepMerge(this, init);
    Object.assign(this, merged);
  }

}
