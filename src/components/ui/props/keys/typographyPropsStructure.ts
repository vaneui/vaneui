import type { PaddingKey } from '../keys';
import { CommonTypographyPropsStructure } from './commonPropsStructure';

/**
 * Props structure for Typography components
 */
export interface TypographyPropsStructure extends CommonTypographyPropsStructure {
  padding?: PaddingKey;
}