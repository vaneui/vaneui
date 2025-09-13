/** Inline display - flows with text */
export const INLINE = 'inline' as const;
/** Block display - takes full width, new line */
export const BLOCK = 'block' as const;
/** Inline-block display - inline but with block properties */
export const INLINE_BLOCK = 'inlineBlock' as const;
/** Flex display - flexbox container */
export const FLEX = 'flex' as const;
/** Inline-flex display - inline flexbox container */
export const INLINE_FLEX = 'inlineFlex' as const;
/** Grid display - CSS grid container */
export const GRID = 'grid' as const;
/** Inline-grid display - inline grid container */
export const INLINE_GRID = 'inlineGrid' as const;
/** Contents display - element's box is removed, children display as if parent didn't exist */
export const CONTENTS = 'contents' as const;
/** Table display - behaves like table element */
export const TABLE = 'table' as const;
/** Table-cell display - behaves like td element */
export const TABLE_CELL = 'tableCell' as const;
/** Hidden display - element is not visible */
export const HIDDEN = 'hidden' as const;

/** All display property values */
export const DISPLAY_VALUES = [INLINE, BLOCK, INLINE_BLOCK, FLEX, INLINE_FLEX, GRID, INLINE_GRID, CONTENTS, TABLE, TABLE_CELL, HIDDEN] as const;