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
 * Badge props structure - matches BADGE_KEYS
 */
export interface BadgePropsStructure extends UIElementPropsStructure {
  shape?: ShapeKey;
  variant?: VariantKey;
  shadow?: ShadowKey;
  border?: BorderKey;
  ring?: RingKey;
  gap?: GapKey;
  padding?: PaddingKey;
}