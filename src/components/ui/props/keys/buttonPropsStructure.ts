import type {
  ShapeKey,
  BorderKey,
  ShadowKey,
  RingKey,
  GapKey,
  PaddingKey,
  VariantKey
} from '../keys';
import { UIElementPropsStructure } from './uiElementPropsStructure';

/**
 * Button props structure - matches BUTTON_KEYS
 */
export interface ButtonPropsStructure extends UIElementPropsStructure {
  shape?: ShapeKey;
  border?: BorderKey;
  shadow?: ShadowKey;
  ring?: RingKey;
  gap?: GapKey;
  padding?: PaddingKey;
  variant?: VariantKey;
}