import type { NavLinkLabelProps } from "./NavLinkLabelProps";

/** Default props for NavLink label sub-theme */
export const navLinkLabelDefaults: Partial<NavLinkLabelProps> = {
  truncate: true,
  // the label takes the free space, so a trailing Badge or icon sits at the row's end
  flex1: true,
};
