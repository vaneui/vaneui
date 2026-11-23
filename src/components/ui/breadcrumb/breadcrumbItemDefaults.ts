import type { BreadcrumbItemProps } from "./BreadcrumbItemProps";

/** Default props for a trail item: one line, a keyboard focus ring on links */
export const breadcrumbItemDefaults: Partial<BreadcrumbItemProps> = {
  focusVisible: true,
  transition: true,
  whitespaceNowrap: true,
};
