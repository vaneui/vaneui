import type {
  ShapeKey,
  VariantKey,
  ShadowKey,
  BorderKey,
  RingKey,
  GapKey,
  PaddingKey
} from '../keys';
import { UIElementPropsStructure } from './uiElementPropsStructure';

/**
 * Chip props structure - matches CHIP_KEYS
 */
export interface ChipPropsStructure extends UIElementPropsStructure {
  shape?: ShapeKey;
  variant?: VariantKey;
  shadow?: ShadowKey;
  border?: BorderKey;
  ring?: RingKey;
  gap?: GapKey;
  padding?: PaddingKey;
}