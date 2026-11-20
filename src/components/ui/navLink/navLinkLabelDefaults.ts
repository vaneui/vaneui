import type { NavLinkLabelProps } from "./NavLinkLabelProps";

/** Default props for NavLink label sub-theme */
export const navLinkLabelDefaults: Partial<NavLinkLabelProps> = {
  truncate: true,
  // clip, not hidden: a hidden box can still be scrolled (by a text search or a selection drag),
  // and the label's trimmed text box leaves it a few pixels of room to scroll into
  overflowClip: true,
  // the label takes the free space, so a trailing Badge or icon sits at the row's end
  flex1: true,
};
