import type {
  GapKey,
  ShapeKey,
  BorderKey,
  RingKey,
  PaddingKey,
  FlexDirectionKey,
  WrapKey,
  BreakpointKey,
  ShadowKey,
  DirectionReverseKey
} from '../keys';
import { TypographyPropsStructure } from './typographyPropsStructure';

/**
 * Props structure for Card components
 */
export interface CardPropsStructure extends TypographyPropsStructure {
  gap?: GapKey;
  shape?: ShapeKey;
  border?: BorderKey;
  ring?: RingKey;
  shadow?: ShadowKey;
  padding?: PaddingKey;
  flexDirection?: FlexDirectionKey;
  wrap?: WrapKey;
  breakpoint?: BreakpointKey;
  reverse?: DirectionReverseKey;
}