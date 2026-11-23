import { LAYOUT_CORE, SHAPE, WIDTH, HEIGHT, ASPECT, MARGIN } from "../props/categoryBuilders";

/** Categories for the Skeleton: a placeholder box for an area whose real component has no skeleton look of its own */
export const SKELETON_CATEGORIES = [
  ...LAYOUT_CORE,
  'shrink',
  ...SHAPE,
  ...WIDTH,
  ...HEIGHT,
  ...ASPECT,
  ...MARGIN,
] as const;
