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

export class TypographySettings {
  fontFamily: { [key in keyof FontFamilyProps]: boolean } = {};
  fontWeight: { [key in keyof FontWeightProps]: boolean } = {};
  fontStyle: { [key in keyof FontStyleProps]: boolean } = {};
  textAppearance: { [key in keyof TextAppearanceProps]: boolean } = {default: true};
  textDecoration: { [key in keyof TextDecorationProps]: boolean } = {};
  textTransform: { [key in keyof TextTransformProps]: boolean } = {};
  textAlign: { [key in keyof TextAlignProps]: boolean } = {};
  size: SizeSettings = {md: true};

  constructor(init: Partial<TypographySettings> = {}) {
    Object.assign(this, init);
  }
}