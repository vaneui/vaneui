import type {
  AppearanceKey,
  FontFamilyKey,
  FontWeightKey,
  FontStyleKey,
  TextDecorationKey,
  TextTransformKey,
  TextAlignKey
} from '../keys';
import { BaseLayoutPropsStructure } from './typographyPropsStructure';

/**
 * UI Element props structure - matches UI_ELEMENT_KEYS
 * Used by Button, Badge, Chip components
 */
export interface UIElementPropsStructure extends BaseLayoutPropsStructure {
  appearance?: AppearanceKey;
  fontFamily?: FontFamilyKey;
  fontWeight?: FontWeightKey;
  fontStyle?: FontStyleKey;
  textDecoration?: TextDecorationKey;
  textTransform?: TextTransformKey;
  textAlign?: TextAlignKey;
}