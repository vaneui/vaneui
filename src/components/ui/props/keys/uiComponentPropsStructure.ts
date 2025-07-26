import type {
  UIElementAppearanceKey,
  VariantKey,
  ShapeKey,
  BorderKey,
  RingKey,
  PaddingKey,
  GapKey,
  ShadowKey
} from '../keys';
import { CommonTypographyPropsStructure } from './commonPropsStructure';

/**
 * Common props structure for UI Element components (Button, Badge, Chip)
 */
export interface UIComponentPropsStructure extends CommonTypographyPropsStructure {
  appearance?: UIElementAppearanceKey;
  variant?: VariantKey;
  shape?: ShapeKey;
  shadow?: ShadowKey;
  border?: BorderKey;
  ring?: RingKey;
  padding?: PaddingKey;
  gap?: GapKey;
}