/**
 * Inherit props for controlling which visual properties cascade from a parent
 * typography ancestor. Each dimension (size, color, bg, border) can be toggled
 * independently. The `inherit` appearance keyword acts as a shorthand that
 * enables all four flags.
 *
 * Individual interfaces are in separate files for prop description generation.
 */

export type { InheritSizeProps } from './inheritSizeProps';
export type { InheritColorProps } from './inheritColorProps';
export type { InheritBgProps } from './inheritBgProps';
export type { InheritBorderProps } from './inheritBorderProps';

import type { InheritSizeProps } from './inheritSizeProps';
import type { InheritColorProps } from './inheritColorProps';
import type { InheritBgProps } from './inheritBgProps';
import type { InheritBorderProps } from './inheritBorderProps';

/**
 * Combined inherit props for backward compatibility.
 * Composes all four inherit dimensions.
 */
export interface InheritProps extends InheritSizeProps, InheritColorProps, InheritBgProps, InheritBorderProps {}
