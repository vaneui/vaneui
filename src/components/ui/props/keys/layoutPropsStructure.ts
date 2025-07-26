import type {
  AppearanceKey,
  GapKey,
  PaddingKey,
  FlexDirectionKey,
  WrapKey,
  BreakpointKey
} from '../keys';
import { CommonLayoutPropsStructure } from './commonPropsStructure';

/**
 * Props structure for Layout components
 */
export interface LayoutPropsStructure extends CommonLayoutPropsStructure {
  appearance?: AppearanceKey;
  gap?: GapKey;
  padding?: PaddingKey;
  flexDirection?: FlexDirectionKey;
  wrap?: WrapKey;
  breakpoint?: BreakpointKey;
}