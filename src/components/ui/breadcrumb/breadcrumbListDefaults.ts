import type { BreadcrumbListProps } from "./BreadcrumbPartProps";

/** Default props for the trail list: one row that wraps between items */
export const breadcrumbListDefaults: Partial<BreadcrumbListProps> = {
  flex: true,
  flexWrap: true,
  itemsCenter: true,
  gap: true,
};
