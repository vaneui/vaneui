import type { SkeletonProps } from "./SkeletonProps";

/** Default props for the Skeleton: a full-width placeholder, one line of text tall, with size-driven corners */
export const skeletonDefaults: Partial<SkeletonProps> = {
  md: true,
  rounded: true,
  block: true,
  wFull: true,
  skeleton: true,
};
