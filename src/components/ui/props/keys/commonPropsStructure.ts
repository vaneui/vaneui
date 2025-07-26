import type {
  SizeKey,
  AppearanceKey,
  DisplayKey,
  PositionKey,
  ItemsKey,
  JustifyKey,
  HideKey,
  OverflowKey,
  FontFamilyKey,
  FontWeightKey,
  FontStyleKey,
  TextDecorationKey,
  TextTransformKey,
  TextAlignKey,
  PaddingKey
} from '../keys';
import { BasePropsStructure } from './basePropsStructure';

/**
 * Common layout props structure shared across components
 */
export interface CommonLayoutPropsStructure extends BasePropsStructure {
  size?: SizeKey;
  display?: DisplayKey;
  position?: PositionKey;
  items?: ItemsKey;
  justify?: JustifyKey;
  hide?: HideKey;
  overflow?: OverflowKey;
}

/**
 * Common typography props structure shared across components
 */
export interface CommonTypographyPropsStructure extends CommonLayoutPropsStructure {
  appearance?: AppearanceKey;
  fontFamily?: FontFamilyKey;
  fontWeight?: FontWeightKey;
  fontStyle?: FontStyleKey;
  textDecoration?: TextDecorationKey;
  textTransform?: TextTransformKey;
  textAlign?: TextAlignKey;
}