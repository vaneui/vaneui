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
 * Base layout props structure shared across components
 */
export interface BaseLayoutPropsStructure extends BasePropsStructure {
  size?: SizeKey;
  display?: DisplayKey;
  position?: PositionKey;
  items?: ItemsKey;
  justify?: JustifyKey;
  hide?: HideKey;
  overflow?: OverflowKey;
}

/**
 * Typography component props structure - matches TYPOGRAPHY_KEYS
 */
export interface TypographyPropsStructure extends BaseLayoutPropsStructure {
  appearance?: AppearanceKey;
  fontFamily?: FontFamilyKey;
  fontWeight?: FontWeightKey;
  fontStyle?: FontStyleKey;
  textDecoration?: TextDecorationKey;
  textTransform?: TextTransformKey;
  textAlign?: TextAlignKey;
}