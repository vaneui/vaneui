import type { ShowProps } from './showProps';
import type { SkeletonProps } from './skeletonProps';

/**
 * Hide props for responsive element visibility. They also carry `show` and `skeleton`, which
 * every category list that takes `hide` takes as well (LAYOUT_CORE and the explicit lists).
 */

export interface HideProps extends ShowProps, SkeletonProps {
  /** Hide element on mobile devices and below (max-mobile: 48rem) */
  mobileHide?: boolean;
  /** Hide element on tablet devices and below (max-tablet: 64rem) */
  tabletHide?: boolean;
  /** Hide element on desktop devices and below (max-desktop: 80rem) */
  desktopHide?: boolean;
}
