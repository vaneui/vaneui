import type {
  AppearanceKey,
  TransparentKey,
  GapKey,
  PaddingKey,
  FlexDirectionKey,
  WrapKey,
  BreakpointKey
} from '../keys';
import { BaseLayoutPropsStructure } from './typographyPropsStructure';

/**
 * Layout component props structure
 * Used by layout components like Container, Row, Col, Grid
 */
export interface LayoutPropsStructure extends BaseLayoutPropsStructure {
  appearance?: AppearanceKey;
  transparent?: TransparentKey;
  gap?: GapKey;
  padding?: PaddingKey;
  flexDirection?: FlexDirectionKey;
  wrap?: WrapKey;
  breakpoint?: BreakpointKey;
}